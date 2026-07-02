<template>
  <div class="all-specimens-page">
    <!-- NAVBAR -->
    <AppNavbar
      active-page="browse"
      :search-value="searchQuery"
      search-placeholder="Search specimens, minerals, fossils..."
      @go-home="$emit('go-home')"
      @go-about="$emit('go-about')"
      @go-research="$emit('go-research')"
      @go-contact="$emit('go-contact')"
      @update:searchValue="setSearchQuery"
    />

    <!-- HERO BANNER -->
    <section class="browse-hero">
      <div class="browse-hero-inner">
        <div class="browse-hero-content">
          <h1>All Specimens</h1>
          <p>Explore our complete collection of geological, paleontological, mineral, and gemstone specimens.</p>
        </div>
      </div>
    </section>

    <!-- BREADCRUMB -->
    <div class="page-breadcrumb">
      <div class="app-breadcrumb__trail">
        <span class="app-breadcrumb__item">
          <button type="button" class="app-breadcrumb__link" @click="$emit('go-home')">Home</button>
          <span class="app-breadcrumb__sep">›</span>
        </span>
        <span class="app-breadcrumb__item is-current">All Specimens</span>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="main-layout">
      <div
        v-if="mobileFiltersOpen"
        class="filter-backdrop"
        @click="mobileFiltersOpen = false"
      ></div>

      <!-- SIDEBAR FILTERS -->
      <aside :class="['sidebar', { 'is-open': mobileFiltersOpen }]">
        <div class="sidebar-header">
          <span class="filter-title">FILTERS</span>
          <button class="sidebar-close" type="button" aria-label="Close filters" @click="mobileFiltersOpen = false">✕</button>
          <button class="clear-btn" @click="clearFilters">Clear All</button>
        </div>

        <!-- CATEGORY -->
        <div class="filter-group">
          <div class="filter-group-title" @click="toggleSection('category')">
            CATEGORY <span>{{ sections.category ? '∧' : '∨' }}</span>
          </div>
          <div v-if="sections.category" class="filter-options">
            <label v-for="cat in categoryOptions" :key="cat.name" class="checkbox-label">
              <input type="checkbox" v-model="selectedCategories" :value="cat.name" @change="applyFilters" />
              <span class="cb-icon">{{ cat.icon }}</span>
              {{ cat.name }}
              <span class="cb-count">({{ cat.count }})</span>
            </label>
          </div>
        </div>

        <!-- SUBCATEGORY -->
        <div class="filter-group">
          <div class="filter-group-title">SUBCATEGORY</div>
          <select class="filter-select" v-model="selectedSubcategory" @change="applyFilters">
            <option>All Subcategories</option>
            <option v-for="sub in subcategoryOptions" :key="sub">{{ sub }}</option>
          </select>
        </div>

        <!-- ORIGIN -->
        <div class="filter-group">
          <div class="filter-group-title">ORIGIN</div>
          <select class="filter-select" v-model="selectedOrigin" @change="applyFilters">
            <option>All Origins</option>
            <option>Australia</option>
            <option>Brazil</option>
            <option>Canada</option>
            <option>China</option>
            <option>Colombia</option>
            <option>Czech Republic</option>
            <option>Iceland</option>
            <option>Indonesia</option>
            <option>Mexico</option>
            <option>Morocco</option>
            <option>Myanmar</option>
            <option>Pakistan</option>
            <option>Peru</option>
            <option>Sri Lanka</option>
            <option>UK</option>
            <option>USA</option>
          </select>
        </div>

        <!-- ROCK TYPE -->
        <div class="filter-group">
          <div class="filter-group-title">ROCK TYPE / GROUP</div>
          <select class="filter-select" v-model="selectedRockType" @change="applyFilters">
            <option>All Types</option>
            <option>Igneous</option>
            <option>Sedimentary</option>
            <option>Metamorphic</option>
            <option>Mineral</option>
            <option>Gemstone</option>
          </select>
        </div>

        <!-- TIME PERIOD -->
        <div class="filter-group">
          <div class="filter-group-title">TIME PERIOD (PALEO)</div>
          <select class="filter-select" v-model="selectedPeriod" @change="applyFilters">
            <option>All Periods</option>
            <option>Cambrian</option>
            <option>Devonian</option>
            <option>Jurassic</option>
            <option>Cretaceous</option>
            <option>Permian</option>
          </select>
        </div>

        <!-- COLOR -->
        <div class="filter-group">
          <div class="filter-group-title">COLOR</div>
          <div class="color-swatches">
            <div v-for="c in colorOptions" :key="c.value"
              class="swatch"
              :style="{ background: c.hex }"
              :class="{ active: selectedColor === c.value }"
              @click="toggleColor(c.value)"
              :title="c.label"
            ></div>
          </div>
        </div>

        <!-- CROSS SECTION -->
        <div class="filter-group">
          <div class="filter-group-title">HAS CROSS SECTION</div>
          <select class="filter-select" v-model="selectedCrossSection" @change="applyFilters">
            <option>All</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        <button class="apply-btn" @click="applyFilters">≡ Apply Filters</button>
        <button class="reset-btn" @click="clearFilters">↺ Reset Filters</button>

        <!-- HELP BOX -->
        <div class="help-box">
          <div class="help-title">Need Help Finding the Right Specimen?</div>
          <p>Contact our team for assistance with your search or research needs.</p>
          <button class="adv-search-btn" @click="$emit('go-contact')">✉ Contact Our Team</button>
        </div>
      </aside>

      <!-- RESULTS -->
      <div class="results-area">
        <!-- RESULTS HEADER -->
        <div class="results-header">
          <div class="results-count">
            <strong>{{ filteredSpecimens.length.toLocaleString() }} Specimens Found</strong>
          </div>
          <div class="results-controls">
            <button class="mobile-filter-btn" type="button" @click="mobileFiltersOpen = true">Filters</button>
            <span class="sort-label">Sort by</span>
            <select class="sort-select" v-model="sortBy" @change="applyFilters">
              <option>Newest Added</option>
              <option>Name A-Z</option>
              <option>Name Z-A</option>
              <option>Category</option>
            </select>
            <div class="view-toggle">
              <button :class="['toggle-btn', viewMode === 'grid' ? 'active' : '']" @click="viewMode = 'grid'">⊞</button>
              <button :class="['toggle-btn', viewMode === 'list' ? 'active' : '']" @click="viewMode = 'list'">☰</button>
            </div>
          </div>
        </div>

        <!-- GRID VIEW -->
        <div v-if="viewMode === 'grid'" class="specimens-grid">
          <button
            class="specimen-card"
            v-for="sp in paginatedSpecimens"
            :key="sp.id"
            @click="$emit('open-specimen', sp.id)"
          >
            <div class="spec-img-wrap">
              <span class="spec-badge" :class="'badge-' + sp.category.toLowerCase()">{{ sp.category.toUpperCase() }}</span>
              <img :src="sp.img" :alt="sp.name" loading="lazy" />
            </div>
            <div class="spec-info">
              <div class="spec-name">{{ sp.name }}</div>
              <div class="text-primary spec-id">{{ sp.id }}</div>
              <div class="spec-origin">📍 {{ sp.origin }}</div>
            </div>
          </button>
        </div>

        <!-- LIST VIEW -->
        <div v-else class="specimens-list">
          <button class="list-item" v-for="sp in paginatedSpecimens" :key="sp.id" @click="$emit('open-specimen', sp.id)">
            <img :src="sp.img" :alt="sp.name" class="list-img" loading="lazy" />
            <div class="list-info">
              <span class="spec-badge" :class="'badge-' + sp.category.toLowerCase()">{{ sp.category.toUpperCase() }}</span>
              <div class="spec-name">{{ sp.name }}</div>
              <div class="spec-id">{{ sp.id }}</div>
              <div class="spec-origin">📍 {{ sp.origin }}</div>
            </div>
          </button>
        </div>

        <!-- PAGINATION -->
        <div class="pagination">
          <div class="pagination-controls">
            <button class="page-btn" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">‹</button>
            <template v-for="p in paginationPages" :key="p">
              <button
                v-if="p !== '...'"
                class="page-btn"
                :class="{ active: p === currentPage }"
                @click="changePage(p)"
              >{{ p }}</button>
              <span v-else class="page-ellipsis">...</span>
            </template>
            <button class="page-btn" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">›</button>
          </div>
          <span class="showing-text">Showing {{ showingFrom }}–{{ showingTo }} of {{ filteredSpecimens.length }} specimens</span>
        </div>

        <!-- TRUST STRIP -->
        <div class="trust-strip">
          <div class="trust-item" v-for="t in trustItems" :key="t.title">
            <div class="trust-icon">{{ t.icon }}</div>
            <div class="trust-body">
              <div class="trust-title">{{ t.title }}</div>
              <div class="trust-desc">{{ t.desc }}</div>
              <a href="#" class="trust-link">{{ t.link }} →</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="logo">
            <div class="logo-icon">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke="#3d4b64" stroke-width="2.5" fill="none"/>
                <polygon points="18,8 28,13 28,23 18,28 8,23 8,13" stroke="#3d4b64" stroke-width="1.5" fill="rgba(61,75,100,0.15)"/>
                <circle cx="18" cy="18" r="4" fill="#3d4b64"/>
              </svg>
            </div>
            <div class="logo-text">
              <span class="logo-name">PALEO RESEARCH GROUP</span>
              <span class="logo-sub">Educational Database</span>
            </div>
          </div>
          <p>A comprehensive database of geological, paleontological, mineral, and gemstone specimens for education and research.</p>
          <div class="social-links"><a href="#">📘</a><a href="#">📸</a><a href="#">▶</a><a href="#">✉</a></div>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">QUICK LINKS</div>
          <a href="#">Home</a><a href="#">Browse</a><a href="#">Categories</a><a href="#">About Us</a><a href="#">How It Works</a>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">CATEGORIES</div>
          <a href="#">Geology</a><a href="#">Paleontology</a><a href="#">Mineral</a><a href="#">Gemstones</a>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">RESOURCES</div>
          <a href="#">Glossary</a><a href="#">Rock Identifier</a><a href="#">Learning Materials</a><a href="#">Data Guidelines</a>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">CONTACT</div>
          <p>📍 Faculty of Science, Kasetsart University<br/>Bang Khen, Bangkok 10900, Thailand</p>
          <p>✉ info@paleoresearchgroup.org</p>
          <p>📞 +66 123 456 789</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2024 Paleo Research Group. All rights reserved.</span>
        <div><a href="#">Privacy Policy</a><a href="#">Terms of Use</a></div>
      </div>
    </footer>

  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import { allSpecimens } from './data/specimens'

const PER_PAGE = 12

export default {
  name: 'AllSpecimens',
  components: { AppNavbar },
  props: {
    initialCategory: {
      type: String,
      default: '',
    },
    initialSearch: {
      type: String,
      default: '',
    },
  },
  emits: ['go-home', 'go-about', 'go-research', 'go-contact', 'open-specimen'],
  data() {
    return {
      searchQuery: '',
      selectedCategories: [],
      selectedSubcategory: 'All Subcategories',
      selectedOrigin: 'All Origins',
      selectedRockType: 'All Types',
      selectedPeriod: 'All Periods',
      selectedColor: null,
      selectedCrossSection: 'All',
      sortBy: 'Newest Added',
      viewMode: 'grid',
      currentPage: 1,
      mobileFiltersOpen: false,
      filteredSpecimens: [...allSpecimens],
      sections: { category: true },
      categoryOptions: [
        { name: 'Geology', icon: '⛰️', count: allSpecimens.filter((item) => item.category === 'Geology').length },
        { name: 'Paleontology', icon: '🦕', count: allSpecimens.filter((item) => item.category === 'Paleontology').length },
        { name: 'Mineral', icon: '💎', count: allSpecimens.filter((item) => item.category === 'Mineral').length },
        { name: 'Petrology', icon: '🪨', count: allSpecimens.filter((item) => item.category === 'Petrology').length },
        { name: 'Gemology', icon: '💍', count: allSpecimens.filter((item) => item.category === 'Gemology').length },
        { name: 'Astronomy', icon: '🌠', count: allSpecimens.filter((item) => item.category === 'Astronomy').length },
        { name: 'Pedology', icon: '🌱', count: allSpecimens.filter((item) => item.category === 'Pedology').length },
        { name: 'Other', icon: '📚', count: allSpecimens.filter((item) => item.category === 'Other').length },
        { name: 'Gemstones', icon: '💠', count: allSpecimens.filter((item) => item.category === 'Gemstones').length },
      ],
      colorOptions: [
        { value: 'red', label: 'Red', hex: '#e53e3e' },
        { value: 'orange', label: 'Orange', hex: '#ed8936' },
        { value: 'yellow', label: 'Yellow', hex: '#ecc94b' },
        { value: 'olive', label: 'Olive', hex: '#515031' },
        { value: 'gold', label: 'Gold', hex: '#beab6d' },
        { value: 'blue', label: 'Blue', hex: '#3182ce' },
        { value: 'purple', label: 'Purple', hex: '#805ad5' },
        { value: 'gray', label: 'Gray', hex: '#e2e8f0' },
        { value: 'black', label: 'Black', hex: '#1a202c' },
      ],
      trustItems: [
        { icon: '📖', title: 'A Reliable Educational Resource', desc: 'All specimens are verified and documented by experts for educational purposes.', link: 'Learn more about our data' },
        { icon: '🛡️', title: 'Trusted by Educators', desc: 'Used in classrooms and research institutions worldwide.', link: 'See how educators use Paleo Research Group' },
        { icon: '👥', title: 'For Students and Researchers', desc: 'Access high-quality images and detailed information for your learning and research.', link: 'Explore learning resources' },
      ]
    }
  },
  computed: {
    subcategoryOptions() {
      return [...new Set(allSpecimens.map((item) => item.subcategory))].sort()
    },
    totalPages() {
      return Math.ceil(this.filteredSpecimens.length / PER_PAGE)
    },
    paginatedSpecimens() {
      const start = (this.currentPage - 1) * PER_PAGE
      return this.filteredSpecimens.slice(start, start + PER_PAGE)
    },
    showingFrom() { return (this.currentPage - 1) * PER_PAGE + 1 },
    showingTo() { return Math.min(this.currentPage * PER_PAGE, this.filteredSpecimens.length) },
    paginationPages() {
      const total = this.totalPages
      const current = this.currentPage
      const pages = []
      if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i)
      } else {
        pages.push(1)
        if (current > 3) pages.push('...')
        for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
        if (current < total - 2) pages.push('...')
        pages.push(total)
      }
      return pages
    }
  },
  watch: {
    initialCategory: {
      immediate: true,
      handler() {
        this.applyInitialFilters()
      },
    },
    initialSearch: {
      immediate: true,
      handler() {
        this.applyInitialFilters()
      },
    },
  },
  methods: {
    applyInitialFilters() {
      this.searchQuery = this.initialSearch || ''
      this.selectedCategories = this.initialCategory ? [this.initialCategory] : []
      this.selectedSubcategory = 'All Subcategories'
      this.selectedOrigin = 'All Origins'
      this.selectedRockType = 'All Types'
      this.selectedPeriod = 'All Periods'
      this.selectedColor = null
      this.selectedCrossSection = 'All'
      this.sortBy = 'Newest Added'
      this.applyFilters()
    },
    setSearchQuery(value) {
      this.searchQuery = value
      this.applyFilters()
    },
    toggleSection(key) { this.sections[key] = !this.sections[key] },
    toggleColor(val) {
      this.selectedColor = this.selectedColor === val ? null : val
      this.applyFilters()
    },
    applyFilters() {
      let result = [...allSpecimens]
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase()
        result = result.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.origin.toLowerCase().includes(q))
      }
      if (this.selectedCategories.length > 0) {
        result = result.filter(s => this.selectedCategories.includes(s.category))
      }
      if (this.selectedSubcategory !== 'All Subcategories') {
        result = result.filter(s => s.subcategory === this.selectedSubcategory)
      }
      if (this.selectedOrigin !== 'All Origins') {
        result = result.filter(s => s.origin === this.selectedOrigin)
      }
      if (this.selectedRockType !== 'All Types') {
        const type = this.selectedRockType
        result = result.filter(s => {
          if (type === 'Mineral') return s.category === 'Mineral'
          if (type === 'Gemstone') return s.category === 'Gemstones'
          return s.subcategory.includes(type)
        })
      }
      if (this.selectedPeriod !== 'All Periods') {
        result = result.filter(s => s.period === this.selectedPeriod)
      }
      if (this.selectedColor) {
        result = result.filter(s => s.color === this.selectedColor)
      }
      if (this.selectedCrossSection !== 'All') {
        const wants = this.selectedCrossSection === 'Yes'
        result = result.filter(s => s.hasCrossSection === wants)
      }
      if (this.sortBy === 'Name A-Z') result.sort((a, b) => a.name.localeCompare(b.name))
      else if (this.sortBy === 'Name Z-A') result.sort((a, b) => b.name.localeCompare(a.name))
      else if (this.sortBy === 'Category') result.sort((a, b) => a.category.localeCompare(b.category))
      this.filteredSpecimens = result
      this.currentPage = 1
      this.mobileFiltersOpen = false
    },
    clearFilters() {
      this.searchQuery = ''
      this.selectedCategories = []
      this.selectedSubcategory = 'All Subcategories'
      this.selectedOrigin = 'All Origins'
      this.selectedRockType = 'All Types'
      this.selectedPeriod = 'All Periods'
      this.selectedColor = null
      this.selectedCrossSection = 'All'
      this.sortBy = 'Newest Added'
      this.filteredSpecimens = [...allSpecimens]
      this.currentPage = 1
      this.mobileFiltersOpen = false
    },
    changePage(p) {
      if (p < 1 || p > this.totalPages) return
      this.currentPage = p
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.all-specimens-page {
  font-family: 'PT Serif', serif;
  color: #1a1a1a;
  background: #fff;
  min-height: 100vh;
}

/* HERO BANNER */
.browse-hero {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 52%, var(--color-accent) 100%);
  padding: 52px 24px;
  position: relative;
  overflow: hidden;
  min-height: 200px;
}
.browse-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: url('https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1400&q=60') center/cover;
  opacity: 0.25;
}
.browse-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.browse-hero-content { position: relative; z-index: 1; width: 100%; }
.browse-hero-content h1 { font-family: 'PT Serif', serif; font-weight: 900; font-size: 3rem; color: #fff; margin-bottom: 10px; }
.browse-hero-content p { color: rgba(255,255,255,0.85); font-size: 1rem; max-width: 480px; line-height: 1.6; }

/* BREADCRUMB */
.page-breadcrumb {
  max-width: 1280px;
  margin: 16px auto 0;
  padding: 0 24px;
}

/* MAIN LAYOUT */
.main-layout {
  max-width: 1280px; margin: 24px auto 0; padding: 0 24px 60px;
  display: flex; gap: 28px; align-items: flex-start;
  position: relative;
}

/* SIDEBAR */
.sidebar { flex: 0 0 218px; }
.sidebar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.sidebar-close { display: none; }
.filter-title { font-family: 'PT Serif', serif; font-weight: 800; font-size: 0.9rem; letter-spacing: 0.5px; }
.clear-btn { font-size: 0.75rem; color: var(--color-primary); background: none; border: none; cursor: pointer; font-weight: 600; }

.filter-group { margin-bottom: 18px; border-bottom: 1px solid #f0f0f0; padding-bottom: 16px; }
.filter-group-title {
  font-family: 'PT Serif', serif; font-weight: 800; font-size: 0.75rem;
  letter-spacing: 0.8px; color: #555; margin-bottom: 10px; cursor: pointer;
  display: flex; justify-content: space-between;
}
.filter-options { display: flex; flex-direction: column; gap: 8px; }
.checkbox-label {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.82rem; cursor: pointer; color: #444;
}
.checkbox-label input { accent-color: var(--color-primary); width: 14px; height: 14px; }
.cb-icon { font-size: 0.9rem; }
.cb-count { color: #aaa; font-size: 0.75rem; margin-left: auto; }

.filter-select {
  width: 100%; border: 1px solid #ddd; border-radius: 6px;
  padding: 8px 10px; font-size: 0.82rem; outline: none;
  background: #fff; color: #444; cursor: pointer;
}

.color-swatches { display: flex; flex-wrap: wrap; gap: 8px; }
.swatch {
  width: 24px; height: 24px; border-radius: 50%; cursor: pointer;
  border: 2px solid transparent; transition: transform 0.15s, border-color 0.15s;
}
.swatch:hover, .swatch.active { transform: scale(1.2); border-color: #1a1a1a; }

.apply-btn {
  width: 100%; background: var(--color-primary); color: #fff; border: none;
  border-radius: 8px; padding: 11px; font-family: 'PT Serif', serif;
  font-weight: 700; font-size: 0.88rem; letter-spacing: 0.5px; cursor: pointer;
  margin-bottom: 8px; transition: background 0.2s;
}
.apply-btn:hover { background: var(--color-primary-dark); }
.reset-btn {
  width: 100%; background: #fff; color: #555; border: 1.5px solid #ddd;
  border-radius: 8px; padding: 10px; font-family: 'PT Serif', serif;
  font-weight: 700; font-size: 0.88rem; letter-spacing: 0.5px; cursor: pointer;
  margin-bottom: 20px;
}

.help-box { background: #f7f9f8; border-radius: 10px; padding: 18px; }
.help-title { font-weight: 700; font-size: 0.88rem; margin-bottom: 8px; line-height: 1.4; }
.help-box p { font-size: 0.78rem; color: #777; margin-bottom: 12px; line-height: 1.5; }
.adv-search-btn {
  width: 100%; background: #fff; border: 1.5px solid #ddd; border-radius: 6px;
  padding: 9px; font-size: 0.8rem; cursor: pointer; transition: border-color 0.2s;
}
.adv-search-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }

/* RESULTS */
.results-area { flex: 1; min-width: 0; }
.results-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px; flex-wrap: wrap; gap: 12px;
}
.results-count { font-family: 'PT Serif', serif; font-weight: 800; font-size: 1.25rem; }
.results-controls { display: flex; align-items: center; gap: 10px; }
.mobile-filter-btn { display: none; }
.sort-label { font-size: 0.82rem; color: #888; }
.sort-select { border: 1px solid #ddd; border-radius: 6px; padding: 7px 12px; font-size: 0.82rem; outline: none; }
.view-toggle { display: flex; border: 1px solid #ddd; border-radius: 6px; overflow: hidden; }
.toggle-btn { background: #fff; border: none; padding: 7px 12px; cursor: pointer; font-size: 1rem; color: #888; }
.toggle-btn.active { background: var(--color-primary); color: #fff; }

/* GRID */
.specimens-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
}
.specimen-card {
  border: 1px solid #e8e8e8; border-radius: 10px; overflow: hidden;
  cursor: pointer; transition: box-shadow 0.2s, transform 0.2s;
  background: #fff;
  padding: 0;
  text-align: left;
  color: inherit;
  appearance: none;
  -webkit-appearance: none;
}
.specimen-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.1); transform: translateY(-2px); }
.spec-img-wrap { position: relative; height: 170px; overflow: hidden; background: #f5f5f5; }
.spec-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.specimen-card:hover .spec-img-wrap img { transform: scale(1.04); }
.spec-badge {
  position: absolute; top: 8px; left: 8px;
  padding: 3px 8px; border-radius: 4px;
  font-size: 0.58rem; font-weight: 800; letter-spacing: 0.3px; color: #fff;
  font-family: 'PT Serif', serif;
}
.badge-geology { background: #444; }
.badge-paleontology { background: #c0892a; }
.badge-mineral { background: var(--color-primary); }
.badge-petrology { background: #6a4d2f; }
.badge-gemology { background: #9d4f88; }
.badge-astronomy { background: #385b8a; }
.badge-pedology { background: #8b6a35; }
.badge-other { background: #59667a; }
.badge-gemstones { background: #7c3aed; }
.spec-info { padding: 12px 14px; }
.spec-name { font-weight: 700; font-size: 0.9rem; margin-bottom: 2px; }
.spec-id { font-size: 0.72rem; color: #4f5c55; font-weight: 600; margin-bottom: 4px; }
.spec-origin { font-size: 0.75rem; color: #666; }

/* LIST */
.specimens-list { display: flex; flex-direction: column; gap: 10px; }
.list-item {
  display: flex; align-items: center; gap: 16px;
  border: 1px solid #e8e8e8; border-radius: 10px; overflow: hidden;
  cursor: pointer; transition: box-shadow 0.2s;
  background: #fff;
  width: 100%;
  padding: 0;
  text-align: left;
  color: inherit;
  appearance: none;
  -webkit-appearance: none;
}
.list-item:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.08); }
.list-img { width: 90px; height: 90px; object-fit: cover; flex-shrink: 0; }
.list-info { padding: 12px 0; display: flex; flex-direction: column; gap: 4px; }

/* PAGINATION */
.pagination {
  display: flex; flex-direction: column; align-items: center; gap: 12px; margin-top: 36px;
}
.pagination-controls {
  display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: wrap;
}
.page-btn {
  width: 36px; height: 36px; border: 1.5px solid #ddd; background: #fff;
  border-radius: 6px; font-size: 0.85rem; cursor: pointer; transition: all 0.15s;
  display: flex; align-items: center; justify-content: center;
  font-family: 'PT Serif', serif; font-weight: 700;
}
.page-btn:hover:not(:disabled) { border-color: var(--color-primary); color: var(--color-primary); }
.page-btn.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.page-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.page-ellipsis { font-size: 0.85rem; color: #aaa; padding: 0 4px; }
.showing-text { font-size: 0.78rem; color: #888; text-align: center; }

/* TRUST STRIP */
.trust-strip {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px;
  background: #f7f9f8; border-radius: 12px; padding: 28px;
}
.trust-item { display: flex; align-items: flex-start; gap: 16px; }
.trust-icon { font-size: 2rem; flex-shrink: 0; background: var(--color-primary); width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.trust-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 4px; }
.trust-desc { font-size: 0.78rem; color: #666; line-height: 1.5; margin-bottom: 6px; }
.trust-link { font-size: 0.78rem; color: var(--color-primary); text-decoration: none; font-weight: 600; }

/* FOOTER */
.footer { background: #111; color: #aaa; padding: 52px 0 0; margin-top: 60px; }
.footer-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px 40px; display: flex; gap: 40px; }
.footer-brand { flex: 0 0 220px; }
.footer-brand .logo-name { color: #fff; }
.footer-brand .logo-sub { color: #888; }
.footer-brand p { font-size: 0.78rem; color: #888; margin-top: 12px; line-height: 1.6; }
.social-links { display: flex; gap: 10px; margin-top: 14px; font-size: 1.1rem; }
.social-links a { color: #888; text-decoration: none; }
.footer-col { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.footer-col-title { font-family: 'PT Serif', serif; font-weight: 800; font-size: 0.85rem; color: #fff; letter-spacing: 0.5px; margin-bottom: 4px; }
.footer-col a { color: #888; text-decoration: none; font-size: 0.78rem; }
.footer-col a:hover { color: var(--color-secondary); }
.footer-col p { font-size: 0.75rem; color: #777; line-height: 1.6; }
.footer-bottom {
  border-top: 1px solid #222; padding: 18px 24px;
  max-width: 1280px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.73rem; color: #666;
}
.footer-bottom div { display: flex; gap: 20px; }
.footer-bottom a { color: #666; text-decoration: none; }

@media (max-width: 1100px) {
  .main-layout {
    flex-direction: column;
    gap: 20px;
  }

  .sidebar {
    flex-basis: auto;
    width: 100%;
  }

  .specimens-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .trust-strip {
    grid-template-columns: 1fr;
  }

  .footer-inner {
    flex-wrap: wrap;
  }
}

@media (max-width: 860px) {
  .browse-hero {
    min-height: 180px;
    padding: 40px 20px;
  }

  .browse-hero-content h1 {
    font-size: 2.4rem;
  }

  .page-breadcrumb,
  .main-layout,
  .footer-inner,
  .footer-bottom {
    padding-left: 20px;
    padding-right: 20px;
  }

  .specimens-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .results-header {
    align-items: stretch;
  }

  .results-controls {
    flex-wrap: wrap;
  }

  .mobile-filter-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: #fff;
    color: var(--color-primary);
    font-family: 'PT Serif', serif;
    font-weight: 700;
    letter-spacing: 0.4px;
    cursor: pointer;
  }

  .filter-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(17, 17, 17, 0.35);
    z-index: 109;
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 110;
    width: min(360px, 92vw);
    padding: 24px 20px 28px;
    overflow-y: auto;
    background: #fff;
    box-shadow: -12px 0 32px rgba(0, 0, 0, 0.18);
    transform: translateX(100%);
    transition: transform 0.24s ease;
  }

  .sidebar.is-open {
    transform: translateX(0);
  }

  .sidebar-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    margin-left: auto;
    border: 1px solid #ddd;
    border-radius: 999px;
    background: #fff;
    color: #555;
    cursor: pointer;
  }

  .sidebar-header {
    gap: 8px;
    position: sticky;
    top: 0;
    background: #fff;
    padding-bottom: 12px;
    z-index: 1;
  }

  .clear-btn {
    order: 3;
    margin-left: 0;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

@media (max-width: 640px) {
  .browse-hero {
    padding: 32px 16px;
  }

  .browse-hero-content h1 {
    font-size: 2rem;
  }

  .browse-hero-content p {
    font-size: 0.92rem;
  }

  .page-breadcrumb,
  .main-layout,
  .footer-inner,
  .footer-bottom {
    padding-left: 16px;
    padding-right: 16px;
  }

  .results-count {
    font-size: 1.1rem;
  }

  .results-controls {
    width: 100%;
  }

  .sort-select {
    flex: 1;
    min-width: 150px;
  }

  .view-toggle {
    margin-left: auto;
  }

  .specimens-grid {
    grid-template-columns: 1fr;
  }

  .spec-img-wrap {
    height: 210px;
  }

  .list-item {
    align-items: flex-start;
    padding: 12px;
  }

  .list-img {
    width: 76px;
    height: 76px;
    border-radius: 8px;
  }

  .list-info {
    padding: 0;
  }

  .trust-strip {
    padding: 20px;
  }

  .trust-item {
    gap: 12px;
  }

  .footer-inner {
    display: grid;
    gap: 28px;
  }
}
</style>
