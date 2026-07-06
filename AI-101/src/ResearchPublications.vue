<template>
  <div class="research-page">
    <AppNavbar
      active-page="research"
      :search-value="searchQuery"
      search-placeholder="Search research, tags, or researcher..."
      @go-home="$emit('go-home')"
      @go-browse="$emit('go-browse')"
      @go-about="$emit('go-about')"
      @go-contact="$emit('go-contact')"
      @go-research="scrollToTop"
      @update:searchValue="setSearchQuery"
    />

    <section class="research-hero" :style="{ '--hero-bg': `url('${heroBg}')` }">
      <div class="research-hero__inner">
        <div class="research-hero__copy">
          <p class="eyebrow">Team Research Archive</p>
          <h1>Research & Publications</h1>
          <p>
            A curated list of papers, reports, and academic outputs from the Paleo Research Group team. Filter by research tags
            or by researcher to explore the work more efficiently.
          </p>
        </div>
        <div class="research-hero__stats">
          <article class="hero-stat">
            <span>Total Records</span>
            <strong>{{ filteredPublications.length }}</strong>
          </article>
          <article class="hero-stat">
            <span>Researchers</span>
            <strong>{{ researcherOptions.length }}</strong>
          </article>
          <article class="hero-stat hero-stat--accent">
            <span>Featured Works</span>
            <strong>{{ featuredCount }}</strong>
          </article>
        </div>
      </div>
    </section>

    <div class="page-breadcrumb">
      <div class="app-breadcrumb__trail">
        <span class="app-breadcrumb__item">
          <button type="button" class="app-breadcrumb__link" @click="$emit('go-home')">Home</button>
          <span class="app-breadcrumb__sep">›</span>
        </span>
        <span class="app-breadcrumb__item is-current">Research & Publications</span>
      </div>
    </div>

    <div class="main-layout">
      <div v-if="mobileFiltersOpen" class="filter-backdrop" @click="mobileFiltersOpen = false"></div>

      <aside :class="['sidebar', { 'is-open': mobileFiltersOpen }]">
        <div class="sidebar-header">
          <span class="filter-title">FILTERS</span>
          <button class="sidebar-close" type="button" aria-label="Close filters" @click="mobileFiltersOpen = false">✕</button>
          <button class="clear-btn" type="button" @click="clearFilters">Clear All</button>
        </div>

        <div class="filter-group">
          <div class="filter-group-title">RESEARCHER</div>
          <div class="filter-options">
            <label v-for="researcher in researcherOptions" :key="researcher.name" class="checkbox-label">
              <input type="checkbox" :value="researcher.name" v-model="selectedResearchers" @change="applyFilters" />
              <span>{{ researcher.name }}</span>
              <span class="cb-count">({{ researcher.count }})</span>
            </label>
          </div>
        </div>

        <div class="filter-group">
          <div class="filter-group-title">RESEARCH TAG</div>
          <select class="filter-select" v-model="selectedTag" @change="applyFilters">
            <option>All Tags</option>
            <option v-for="tag in tagOptions" :key="tag.name" :value="tag.name">
              {{ tag.name }} ({{ tag.count }})
            </option>
          </select>
        </div>

        <div class="filter-group">
          <div class="filter-group-title">YEAR</div>
          <select class="filter-select" v-model="selectedYear" @change="applyFilters">
            <option>All Years</option>
            <option v-for="year in yearOptions" :key="year">{{ year }}</option>
          </select>
        </div>

        <button class="apply-btn" type="button" @click="applyFilters">Apply Filters</button>
        <button class="reset-btn" type="button" @click="clearFilters">Reset Filters</button>

        <div class="help-box">
          <div class="help-title">Need a curated reading list?</div>
          <p>Use the filters to focus on one researcher, one topic, or one publication type.</p>
        </div>
      </aside>

      <section class="results-area">
        <div class="results-header">
          <div class="results-count">
            <strong>{{ filteredPublications.length }} Publications Found</strong>
            <p>List layout focused on readability, tag scanning, and quick access to external links.</p>
          </div>
          <div class="results-controls">
            <button class="mobile-filter-btn" type="button" @click="mobileFiltersOpen = true">Filters</button>
            <span class="sort-label">Sort by</span>
            <select class="sort-select" v-model="sortBy" @change="applyFilters">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Title A-Z</option>
              <option>Researcher A-Z</option>
            </select>
          </div>
        </div>

        <div class="active-filters" v-if="hasActiveFilters">
          <span v-for="name in selectedResearchers" :key="`researcher-${name}`" class="active-filter">
            {{ name }}
            <button type="button" @click="removeResearcher(name)">✕</button>
          </span>
          <span v-if="selectedTag !== 'All Tags'" class="active-filter">
            {{ selectedTag }}
            <button type="button" @click="selectedTag = 'All Tags'; applyFilters()">✕</button>
          </span>
          <span v-if="selectedYear !== 'All Years'" class="active-filter">
            {{ selectedYear }}
            <button type="button" @click="selectedYear = 'All Years'; applyFilters()">✕</button>
          </span>
        </div>

        <div class="publication-list">
          <article v-for="paper in paginatedPublications" :key="paper.id" class="publication-card">
            <div class="publication-accent"></div>
            <div class="publication-body">
              <div class="publication-topline">
                <span :class="['type-badge', paper.featured ? 'is-featured' : '']">{{ paper.type }}</span>
                <span class="pub-year">{{ paper.year }}</span>
                <span v-if="paper.featured" class="featured-flag">Featured</span>
              </div>

              <h2>{{ paper.title }}</h2>

              <div class="pub-meta">
                <span class="pub-author">{{ paper.researcher }}</span>
                <span>with {{ paper.coAuthors.join(', ') }}</span>
              </div>

              <p class="pub-summary">{{ paper.summary }}</p>

              <div class="pub-bottom">
                <div class="pub-context">
                  <p class="pub-venue">{{ paper.venue }}</p>
                  <div class="pub-tags">
                    <span v-for="tag in paper.tags" :key="`${paper.id}-${tag}`">{{ tag }}</span>
                  </div>
                </div>
                <div class="pub-actions">
                  <span class="pub-id">{{ paper.id }}</span>
                  <a :href="paper.link" target="_blank" rel="noreferrer">Open Link ↗</a>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div class="pagination" v-if="totalPages > 1">
          <div class="pagination-controls">
            <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">‹</button>
            <template v-for="page in paginationPages" :key="page">
              <button
                v-if="page !== '...'"
                class="page-btn"
                :class="{ active: page === currentPage }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
              <span v-else class="page-ellipsis">...</span>
            </template>
            <button class="page-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">›</button>
          </div>
          <span class="showing-text">Showing {{ showingFrom }}–{{ showingTo }} of {{ filteredPublications.length }} publications</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import { researchPublications } from './data/researchPublications'
import heroBg from './assets/images (1).jpeg'

const PER_PAGE = 6

export default {
  name: 'ResearchPublications',
  components: { AppNavbar },
  emits: ['go-home', 'go-browse', 'go-about', 'go-contact'],
  data() {
    const researcherCounts = new Map()
    const tagCounts = new Map()
    const yearSet = new Set()

    researchPublications.forEach((paper) => {
      researcherCounts.set(paper.researcher, (researcherCounts.get(paper.researcher) || 0) + 1)
      paper.tags.forEach((tag) => tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1))
      yearSet.add(paper.year)
    })

    return {
      heroBg,
      searchQuery: '',
      selectedResearchers: [],
      selectedTag: 'All Tags',
      selectedYear: 'All Years',
      sortBy: 'Newest First',
      currentPage: 1,
      mobileFiltersOpen: false,
      filteredPublications: [...researchPublications],
      researcherOptions: [...researcherCounts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name)),
      tagOptions: [...tagCounts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name)),
      yearOptions: [...yearSet].sort((a, b) => b - a),
    }
  },
  computed: {
    featuredCount() {
      return researchPublications.filter((paper) => paper.featured).length
    },
    totalPages() {
      return Math.ceil(this.filteredPublications.length / PER_PAGE)
    },
    paginatedPublications() {
      const start = (this.currentPage - 1) * PER_PAGE
      return this.filteredPublications.slice(start, start + PER_PAGE)
    },
    showingFrom() {
      return this.filteredPublications.length === 0 ? 0 : (this.currentPage - 1) * PER_PAGE + 1
    },
    showingTo() {
      return Math.min(this.currentPage * PER_PAGE, this.filteredPublications.length)
    },
    paginationPages() {
      const total = this.totalPages
      const current = this.currentPage
      const pages = []

      if (total <= 7) {
        for (let i = 1; i <= total; i += 1) pages.push(i)
      } else {
        pages.push(1)
        if (current > 3) pages.push('...')
        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i += 1) pages.push(i)
        if (current < total - 2) pages.push('...')
        pages.push(total)
      }

      return pages
    },
    hasActiveFilters() {
      return (
        this.selectedResearchers.length > 0 ||
        this.selectedTag !== 'All Tags' ||
        this.selectedYear !== 'All Years'
      )
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    setSearchQuery(value) {
      this.searchQuery = value
      this.applyFilters()
    },
    removeResearcher(name) {
      this.selectedResearchers = this.selectedResearchers.filter((item) => item !== name)
      this.applyFilters()
    },
    applyFilters() {
      let result = [...researchPublications]

      if (this.searchQuery.trim()) {
        const query = this.searchQuery.trim().toLowerCase()
        result = result.filter((paper) => {
          const haystack = [
            paper.title,
            paper.researcher,
            paper.venue,
            paper.summary,
            paper.id,
            ...paper.tags,
            ...paper.coAuthors,
          ]
            .join(' ')
            .toLowerCase()
          return haystack.includes(query)
        })
      }

      if (this.selectedResearchers.length > 0) {
        result = result.filter((paper) => this.selectedResearchers.includes(paper.researcher))
      }

      if (this.selectedTag !== 'All Tags') {
        result = result.filter((paper) => paper.tags.includes(this.selectedTag))
      }

      if (this.selectedYear !== 'All Years') {
        result = result.filter((paper) => String(paper.year) === String(this.selectedYear))
      }

      if (this.sortBy === 'Oldest First') result.sort((a, b) => a.year - b.year)
      else if (this.sortBy === 'Title A-Z') result.sort((a, b) => a.title.localeCompare(b.title))
      else if (this.sortBy === 'Researcher A-Z') result.sort((a, b) => a.researcher.localeCompare(b.researcher))
      else result.sort((a, b) => b.year - a.year)

      this.filteredPublications = result
      this.currentPage = 1
      this.mobileFiltersOpen = false
    },
    clearFilters() {
      this.searchQuery = ''
      this.selectedResearchers = []
      this.selectedTag = 'All Tags'
      this.selectedYear = 'All Years'
      this.sortBy = 'Newest First'
      this.filteredPublications = [...researchPublications].sort((a, b) => b.year - a.year)
      this.currentPage = 1
      this.mobileFiltersOpen = false
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return
      this.currentPage = page
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
  mounted() {
    this.clearFilters()
  },
}
</script>

<style scoped>
/* Fonts & tokens come from the central design system (style.css) */

* { box-sizing: border-box; margin: 0; padding: 0; }

.research-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(var(--color-primary-rgb), 0.12), transparent 28%),
    radial-gradient(circle at top left, rgba(var(--color-secondary-rgb), 0.12), transparent 24%),
    linear-gradient(180deg, #faf8f2 0%, #f6f1e7 100%);
  color: #253040;
  font-family: 'PT Serif', serif;
}

.research-hero {
  position: relative;
  overflow: hidden;
  padding: 52px 24px;
  min-height: 200px;
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 52%, var(--color-accent) 100%);
}

.research-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--hero-bg) center/cover;
  opacity: 0.25;
}

.research-hero__inner,
.page-breadcrumb,
.main-layout {
  max-width: 1280px;
  margin: 0 auto;
}

.research-hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
  gap: 26px;
  align-items: end;
}

.eyebrow {
  margin-bottom: 10px;
  font-family: 'PT Serif', serif;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.research-hero__copy h1 {
  margin: 0 0 12px;
  font-size: 3.1rem;
  line-height: 0.96;
  color: #fff;
}

.research-hero__copy p:last-child {
  max-width: 52rem;
  font-family: 'PT Serif', serif;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.8;
}

.research-hero__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.hero-stat {
  padding: 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(var(--color-secondary-rgb), 0.16);
}

.hero-stat span,
.hero-stat strong,
.results-count p,
.checkbox-label,
.tag-chip,
.filter-select,
.help-box p,
.pub-meta,
.pub-summary,
.pub-venue,
.pub-tags span,
.pub-actions,
.active-filter,
.showing-text {
  font-family: 'PT Serif', serif;
}

.hero-stat span {
  display: block;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.8rem;
}

.hero-stat strong {
  display: block;
  margin-top: 12px;
  color: #fff;
  font-size: 2.2rem;
  line-height: 1;
}

.hero-stat--accent {
  background: linear-gradient(135deg, rgba(var(--color-secondary-rgb), 0.34), rgba(var(--color-primary-rgb), 0.18));
}

.page-breadcrumb {
  padding: 18px 24px 0;
}

.main-layout {
  display: flex;
  gap: 28px;
  align-items: flex-start;
  padding: 24px 24px 60px;
  position: relative;
}

.sidebar {
  flex: 0 0 270px;
  position: sticky;
  top: 88px;
  padding: 22px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(var(--color-primary-rgb), 0.12);
  box-shadow: 0 18px 34px rgba(var(--color-primary-rgb), 0.08);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.sidebar-close,
.mobile-filter-btn {
  display: none;
}

.filter-title {
  font-size: 0.88rem;
  letter-spacing: 0.08em;
}

.clear-btn {
  border: 0;
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  font-family: 'PT Serif', serif;
  font-size: 0.8rem;
  font-weight: 700;
}

.filter-group {
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(var(--color-accent-rgb), 0.12);
}

.filter-group-title {
  margin-bottom: 12px;
  color: #5c6778;
  font-size: 0.78rem;
  letter-spacing: 0.09em;
}

.filter-options {
  display: grid;
  gap: 10px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #344155;
  font-size: 0.9rem;
  cursor: pointer;
}

.checkbox-label input {
  accent-color: var(--color-primary);
}

.cb-count {
  margin-left: auto;
  color: #8a8790;
  font-size: 0.78rem;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-chip {
  border: 1px solid rgba(var(--color-primary-rgb), 0.14);
  border-radius: 999px;
  padding: 8px 12px;
  background: #fff;
  color: var(--color-primary);
  font-size: 0.84rem;
  cursor: pointer;
}

.tag-chip span {
  margin-left: 6px;
  color: #7b877f;
}

.tag-chip.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.tag-chip.active span {
  color: rgba(255, 255, 255, 0.76);
}

.filter-select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(var(--color-accent-rgb), 0.16);
  background: #fff;
  color: #344155;
}

.apply-btn,
.reset-btn {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  font-family: 'PT Serif', serif;
  font-weight: 700;
  cursor: pointer;
}

.apply-btn {
  border: 0;
  color: #fff;
  background: var(--color-primary);
  margin-bottom: 8px;
}

.reset-btn {
  border: 1px solid rgba(var(--color-accent-rgb), 0.16);
  background: #fff;
  color: #445065;
}

.help-box {
  margin-top: 18px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(var(--color-primary-rgb), 0.06);
}

.help-title {
  margin-bottom: 8px;
  color: var(--color-accent);
  font-size: 0.98rem;
}

.help-box p {
  color: #687286;
  line-height: 1.65;
  font-size: 0.88rem;
}

.results-area {
  flex: 1;
  min-width: 0;
}

.results-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.results-count strong {
  display: block;
  font-size: 1.4rem;
  color: #243044;
}

.results-count p {
  margin-top: 6px;
  color: #6d7483;
  line-height: 1.6;
}

.results-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-label {
  color: #757d8f;
  font-size: 0.82rem;
}

.sort-select {
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid rgba(var(--color-accent-rgb), 0.16);
  background: #fff;
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.active-filter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(var(--color-primary-rgb), 0.08);
  color: var(--color-primary);
  font-size: 0.84rem;
}

.active-filter button {
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.publication-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.publication-card {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr);
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid rgba(var(--color-accent-rgb), 0.14);
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 18px 34px rgba(43, 54, 41, 0.06);
}

.publication-accent {
  background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-accent) 100%);
}

.publication-body {
  padding: 22px 24px;
}

.publication-topline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.type-badge,
.featured-flag,
.pub-year,
.pub-id {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  font-family: 'PT Serif', serif;
  font-size: 0.78rem;
}

.type-badge {
  background: rgba(var(--color-primary-rgb), 0.08);
  color: var(--color-primary);
}

.type-badge.is-featured {
  background: rgba(var(--color-secondary-rgb), 0.24);
  color: #6f5c22;
}

.pub-year,
.pub-id {
  background: rgba(var(--color-secondary-rgb), 0.18);
  color: #5e6270;
}

.featured-flag {
  background: var(--color-accent);
  color: #fff;
}

.publication-body h2 {
  margin: 0;
  font-size: 1.62rem;
  line-height: 1.16;
  color: #253041;
}

.pub-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
  color: #667083;
  font-size: 0.92rem;
}

.pub-author {
  color: var(--color-primary);
  font-weight: 700;
}

.pub-summary {
  margin-top: 14px;
  color: #666f80;
  font-size: 0.96rem;
  line-height: 1.82;
}

.pub-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-top: 18px;
}

.pub-venue {
  color: #334155;
  font-size: 0.92rem;
  font-weight: 700;
}

.pub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.pub-tags span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(var(--color-primary-rgb), 0.08);
  color: #5b6474;
  font-size: 0.8rem;
}

.pub-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
}

.pub-actions a {
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 700;
}

.pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.page-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(var(--color-accent-rgb), 0.16);
  background: #fff;
  cursor: pointer;
  font-family: 'PT Serif', serif;
}

.page-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-ellipsis {
  color: #8b8b93;
}

.showing-text {
  color: #72798a;
  font-size: 0.84rem;
}

@media (max-width: 1100px) {
  .research-hero__inner {
    grid-template-columns: 1fr;
  }

  .main-layout {
    flex-direction: column;
  }

  .sidebar {
    position: static;
    width: 100%;
  }
}

@media (max-width: 860px) {
  .research-hero,
  .page-breadcrumb,
  .main-layout {
    padding-left: 20px;
    padding-right: 20px;
  }

  .sidebar {
    position: fixed;
    top: 74px;
    left: 16px;
    right: 16px;
    bottom: 16px;
    z-index: 120;
    overflow: auto;
    transform: translateY(16px);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .sidebar.is-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .sidebar-close,
  .mobile-filter-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .sidebar-close {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    border: 1px solid rgba(var(--color-accent-rgb), 0.16);
    background: #fff;
    cursor: pointer;
  }

  .mobile-filter-btn {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(var(--color-accent-rgb), 0.16);
    background: #fff;
    cursor: pointer;
  }

  .filter-backdrop {
    position: fixed;
    inset: 0;
    z-index: 110;
    background: rgba(var(--color-accent-rgb), 0.4);
  }

  .results-header {
    flex-direction: column;
  }

  .results-controls {
    width: 100%;
    flex-wrap: wrap;
  }

  .sort-select {
    flex: 1;
  }

  .pub-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .pub-actions {
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .research-hero__stats {
    grid-template-columns: 1fr;
  }

  .research-hero__copy h1 {
    font-size: 2.35rem;
  }

  .publication-body {
    padding: 18px;
  }

  .publication-body h2 {
    font-size: 1.3rem;
  }
}
</style>
