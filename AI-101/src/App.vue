<template>
  <div id="app">
    <!-- ROUTE: ALL SPECIMENS PAGE -->
    <AllSpecimens
      v-if="currentPage === 'specimens'"
      :initial-category="specimenFilter.category"
      :initial-search="specimenFilter.search"
      @go-home="goHome"
      @go-about="goToAbout"
      @go-research="goToResearch"
      @go-contact="goToContact"
      @open-specimen="openSpecimen"
    />

    <SpecimenDetail
      v-else-if="currentPage === 'detail' && selectedSpecimenId"
      :specimen-id="selectedSpecimenId"
      @go-home="goHome"
      @go-about="goToAbout"
      @go-research="goToResearch"
      @go-contact="goToContact"
      @back-to-specimens="goToSpecimens"
      @open-specimen="openSpecimen"
    />

    <AboutUs
      v-else-if="currentPage === 'about'"
      @go-home="goHome"
      @go-browse="goToSpecimens"
      @go-research="goToResearch"
      @go-contact="goToContact"
    />

    <ResearchPublications
      v-else-if="currentPage === 'research'"
      @go-home="goHome"
      @go-browse="goToSpecimens"
      @go-about="goToAbout"
      @go-contact="goToContact"
    />

    <ContactUs
      v-else-if="currentPage === 'contact'"
      @go-home="goHome"
      @go-browse="goToSpecimens"
      @go-about="goToAbout"
      @go-research="goToResearch"
    />

    <!-- HOME PAGE -->
    <template v-else>
      <div class="home-page">
        <AppNavbar
          active-page="home"
          variant="home"
          search-placeholder="Search specimens..."
          @go-home="goHome"
          @go-browse="goToSpecimens"
          @go-about="goToAbout"
          @go-research="goToResearch"
          @go-contact="goToContact"
        />
        <section class="home-hero">
          <div class="home-hero__slides">
            <div
              v-for="(img, i) in heroImages"
              :key="i"
              class="home-hero__slide"
              :class="{ 'is-active': i === heroIndex }"
              :style="{ backgroundImage: `url('${img}')` }"
            ></div>
          </div>
          <div class="home-hero__overlay"></div>
          <div class="home-hero__inner">
            <div class="home-hero__content">
              <p class="home-eyebrow">Geoscience Knowledge Platform</p>
              <h1>Discovering Earth’s Hidden Histories</h1>
              <p class="home-hero__text">
                A curated academic platform for geological, paleontological, mineral, and gemstone collections
                designed for teaching, field reference, and research communication.
              </p>
              <div class="home-hero__actions">
                <button type="button" class="home-btn home-btn--primary" @click="goToSpecimens">Explore Collection</button>
                <button type="button" class="home-btn home-btn--ghost" @click="goToResearch">Current Research</button>
              </div>
            </div>
          </div>
        </section>

        <section class="home-band">
          <div class="home-band__inner">
            <article class="home-intro-card">
              <p class="home-section-kicker">Who We Are</p>
              <h2>An academic collection built for discovery and learning.</h2>
              <p>
                Paleo Research Group connects researchers, educators, and students with specimen records, imagery, and structured
                context for Earth science education.
              </p>
              <button type="button" class="home-link-btn" @click="goToAbout">Learn More About Us</button>
            </article>

            <div class="home-pillars">
              <article v-for="pillar in homePillars" :key="pillar.title" class="home-pillar">
                <div class="home-pillar__icon">{{ pillar.icon }}</div>
                <h3>{{ pillar.title }}</h3>
                <p>{{ pillar.text }}</p>
              </article>
            </div>

            <article class="home-mission-card">
              <p class="home-section-kicker">Our Goals</p>
              <ul>
                <li v-for="item in homeMission" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>
        </section>

        <section class="home-research-grid">
          <div class="home-topics-panel">
            <div class="home-panel-head home-panel-head--dark">
              <div>
                <p class="home-section-kicker">Research Topics</p>
                <h2>Explore by theme</h2>
              </div>
              <button type="button" class="home-link-btn home-link-btn--light" @click="goToSpecimens">View All Topics</button>
            </div>
            <div class="home-topic-grid">
              <button type="button" v-for="topic in homeTopics" :key="topic.name" class="home-topic-card" @click="goToSpecimens(topic.filter)">
                <img :src="topic.image" :alt="topic.name" />
                <div class="home-topic-card__overlay">
                  <h3>{{ topic.name }}</h3>
                  <p>{{ topic.desc }}</p>
                </div>
              </button>
            </div>
          </div>

          <div class="home-projects-panel">
            <div class="home-panel-head">
              <div>
                <p class="home-section-kicker">Current Research Projects</p>
                <h2>Active collections & studies</h2>
              </div>
              <button type="button" class="home-link-btn" @click="goToResearch">View All Projects</button>
            </div>
            <div class="home-project-grid">
              <article v-for="project in homeProjects" :key="project.id" class="home-project-card">
                <div class="home-project-card__image">
                  <img :src="project.img" :alt="project.name" />
                  <span class="home-project-card__progress">{{ project.progress }}</span>
                </div>
                <div class="home-project-card__body">
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.summary }}</p>
                  <div class="home-project-card__tags">
                    <span v-for="tag in project.tags" :key="`${project.id}-${tag}`">{{ tag }}</span>
                  </div>
                  <button type="button" class="home-link-btn" @click="openSpecimen(project.id)">Learn More</button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section class="home-insights">
          <div class="home-news-panel">
            <div class="home-panel-head">
              <div>
                <p class="home-section-kicker">Latest Discoveries & News</p>
                <h2>Recent updates</h2>
              </div>
              <button type="button" class="home-link-btn" @click="goToResearch">View All News</button>
            </div>
            <div class="home-news-grid">
              <article v-for="item in homeNews" :key="item.title" class="home-news-card">
                <img :src="item.image" :alt="item.title" />
                <div class="home-news-card__body">
                  <span>{{ item.date }}</span>
                  <h3>{{ item.title }}</h3>
                  <button type="button" class="home-link-btn" @click="goToResearch">Read More</button>
                </div>
              </article>
            </div>
          </div>

          <div class="home-numbers-panel">
            <p class="home-section-kicker">By The Numbers</p>
            <h2>Impact at a glance</h2>
            <div class="home-numbers-grid">
              <article v-for="item in homeNumbers" :key="item.label" class="home-number-card">
                <div class="home-number-card__icon">{{ item.icon }}</div>
                <strong>{{ item.value }}</strong>
                <span>{{ item.label }}</span>
              </article>
            </div>
          </div>
        </section>

        <section class="home-cta">
          <div class="home-cta__overlay"></div>
          <div class="home-cta__inner">
            <div class="home-cta__header">
              <p class="home-section-kicker home-section-kicker--light">Get Involved</p>
              <h2>Support discovery. Expand access. Build the archive.</h2>
            </div>
            <div class="home-cta__grid">
              <article v-for="item in homeInvolvement" :key="item.title" class="home-cta-card">
                <div class="home-cta-card__icon">{{ item.icon }}</div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
                <button type="button" class="home-btn home-btn--soft">{{ item.action }}</button>
              </article>
            </div>
          </div>
        </section>

        <footer id="home-contact" class="home-footer">
          <div class="home-footer__inner">
            <div class="home-footer__brand">
              <div class="home-brand home-brand--footer">
                <span class="home-brand__mark">◔</span>
                <span class="home-brand__copy">
                  <strong>PALEO RESEARCH GROUP</strong>
                  <small>Educational Database</small>
                </span>
              </div>
              <p>Advancing Earth science education through accessible collections, visual records, and research-ready metadata.</p>
            </div>
            <div class="home-footer__links">
              <div>
                <h3>Explore</h3>
                <a href="#" @click.prevent="goToResearch">Research</a>
                <a href="#" @click.prevent="goToSpecimens">Database</a>
                <a href="#" @click.prevent="goToAbout">About</a>
              </div>
              <div>
                <h3>Resources</h3>
                <a href="#" @click.prevent="goToSpecimens">Specimen Data</a>
                <a href="#" @click.prevent="goToResearch">Publications</a>
                <a href="#" @click.prevent="goToAbout">Mission</a>
              </div>
              <div>
                <h3>Contact</h3>
                <p>Faculty of Science, Kasetsart University</p>
                <p>info@paleoresearchgroup.org</p>
                <p>+66 123 456 789</p>
              </div>
            </div>
          </div>
          <div class="home-footer__bottom">
            <span>© 2024 Paleo Research Group. All rights reserved.</span>
            <div>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
            </div>
          </div>
        </footer>
      </div>
    </template>
  </div>
</template>

<script>
import AllSpecimens from './AllSpecimens.vue'
import SpecimenDetail from './SpecimenDetail.vue'
import AboutUs from './AboutUs.vue'
import ResearchPublications from './ResearchPublications.vue'
import ContactUs from './ContactUs.vue'
import AppNavbar from './components/AppNavbar.vue'
import { featuredSpecimens } from './data/specimens'
import { researchPublications } from './data/researchPublications'
import heroTrexSkull from './assets/Trex-Skull.webp'
import heroRockStrata from './assets/images (1).jpeg'
import heroTrilobite from './assets/images.jpeg'

export default {
  name: 'App',
  components: { AllSpecimens, SpecimenDetail, AboutUs, ResearchPublications, ContactUs, AppNavbar },
  data() {
    const categories = [
      {
        name: 'Geology',
        desc: 'Igneous, sedimentary, metamorphic, and structural reference specimens.',
        image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80',
        filter: { category: 'Geology', search: '' },
      },
      {
        name: 'Paleontology',
        desc: 'Fossils, preserved life forms, and paleoenvironment teaching materials.',
        image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&q=80',
        filter: { category: 'Paleontology', search: '' },
      },
      {
        name: 'Mineral',
        desc: 'Crystal systems, mineral groups, and hand-sample study collections.',
        image: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=1200&q=80',
        filter: { category: 'Mineral', search: '' },
      },
      {
        name: 'Petrology',
        desc: 'Rock textures, thin-section analogs, and igneous-metamorphic references.',
        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80',
        filter: { category: 'Petrology', search: '' },
      },
      {
        name: 'Gemology',
        desc: 'Gem-grade specimens focused on clarity, color, and optical properties.',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80',
        filter: { category: 'Gemology', search: '' },
      },
      {
        name: 'Astronomy',
        desc: 'Meteorite-inspired references and space-related natural history materials.',
        image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80',
        filter: { category: 'Astronomy', search: '' },
      },
      {
        name: 'Pedology',
        desc: 'Soil, sediment, and surface-process references for Earth system learning.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80',
        filter: { category: 'Pedology', search: '' },
      },
      {
        name: 'Other',
        desc: 'Cross-disciplinary materials and archive items beyond the main collections.',
        image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200&q=80',
        filter: { category: 'Other', search: '' },
      },
    ]

    const homeProjects = featuredSpecimens.slice(0, 3).map((item, index) => ({
      ...item,
      title: [
        'Theropod Diversity in Southeast Asia',
        'Marine Ecosystem Reference Series',
        'Fossil Microstructure Analysis',
      ][index] ?? item.name,
      summary: [
        'Investigating specimen diversity, distribution patterns, and comparative field records across the region.',
        'Linking preserved records with paleoenvironment interpretation and teaching visualizations.',
        'Documenting fine structures and surface patterns with image-first teaching material.',
      ][index] ?? item.origin,
      progress: ['75%', '60%', '40%'][index] ?? '50%',
      tags: [
        ['Dinosaurs', 'Evolution'],
        ['Paleoecology', 'Marine'],
        ['Fossils', 'Imaging'],
      ][index] ?? [item.badge],
    }))

    return {
      currentPage: 'home',
      selectedSpecimenId: null,
      heroIndex: 0,
      heroTimer: null,
      heroImages: [heroTrexSkull, heroRockStrata, heroTrilobite],
      specimenFilter: {
        category: '',
        search: '',
      },
      categories,
      specimens: featuredSpecimens,
      featuredResearch: researchPublications.filter((item) => item.featured).slice(0, 3),
      homePillars: [
        { icon: '⟡', title: 'Paleontology', text: 'Studying fossil records to uncover diversity, chronology, and ancient life systems.' },
        { icon: '✦', title: 'Mineralogy', text: 'Examining crystal habits, composition, and material properties through curated specimens.' },
        { icon: '◌', title: 'Paleoecology', text: 'Reconstructing past environments through integrated specimen interpretation and context.' },
      ],
      homeMission: [
        'To reconstruct the paleoenvironment through the study of stratigraphy',
        'To study paleoclimate changes through geochemical analysis',
        'To study paleobiodiversity through the study of fossils',
        'To evaluate the management of related natural resources, such as petroleum or fossils',
      ],
      homeTopics: categories.slice(1, 5),
      homeProjects,
      homeNews: [
        {
          date: 'May 12, 2024',
          title: 'New Amphibian Fossil Species Identified in Northern Thailand',
          image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=900&q=80',
        },
        {
          date: 'Apr 28, 2024',
          title: 'Field Expedition 2024: Discoveries in the Gobi Desert',
          image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=900&q=80',
        },
        {
          date: 'Apr 15, 2024',
          title: 'New Research Paper on Dinosaur Growth Rates Published',
          image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=900&q=80',
        },
      ],
      homeNumbers: [
        { icon: '◫', value: '125+', label: 'Published Papers' },
        { icon: '◎', value: '30+', label: 'Active Researchers' },
        { icon: '△', value: '15', label: 'Research Programs' },
        { icon: '◔', value: '50,000+', label: 'Cataloged Specimens' },
      ],
      homeInvolvement: [
        { icon: '◉', title: 'Join Research', text: 'Work with datasets, specimen records, and field documentation.', action: 'Learn More' },
        { icon: '✧', title: 'Volunteer', text: 'Support indexing, content curation, and educational materials.', action: 'Get Involved' },
        { icon: '◇', title: 'Collaborate', text: 'Partner with the platform for teaching, exhibitions, and projects.', action: 'Contact Us' },
        { icon: '♡', title: 'Support', text: 'Help expand the archive and maintain open educational access.', action: 'Donate Now' },
      ],
    }
  },
  mounted() {
    // Rotate the home hero background every 45s.
    this.heroTimer = setInterval(() => {
      this.heroIndex = (this.heroIndex + 1) % this.heroImages.length
    }, 45000)
  },
  beforeUnmount() {
    if (this.heroTimer) clearInterval(this.heroTimer)
  },
  methods: {
    goHome() {
      this.currentPage = 'home'
      this.selectedSpecimenId = null
      this.specimenFilter = { category: '', search: '' }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    goToSpecimens(filter = null) {
      this.specimenFilter = {
        category: filter?.category ?? '',
        search: filter?.search ?? '',
      }
      this.currentPage = 'specimens'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    goToAbout() {
      this.currentPage = 'about'
      this.selectedSpecimenId = null
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    goToResearch() {
      this.currentPage = 'research'
      this.selectedSpecimenId = null
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    goToContact() {
      this.currentPage = 'contact'
      this.selectedSpecimenId = null
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    openSpecimen(id) {
      this.selectedSpecimenId = id
      this.currentPage = 'detail'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
/* Fonts & tokens come from the central design system (style.css) */

* { box-sizing: border-box; margin: 0; padding: 0; }

#app {
  font-family: 'PT Serif', serif;
  color: #1a1a1a;
  background: #fff;
}

.home-page {
  background: #f6f0e6;
  color: #2b3240;
}

.home-hero {
  position: relative;
  padding-top: 84px;
  min-height: 780px;
  color: #fff;
  overflow: hidden;
  background: #1b1e17;
}

.home-hero__slides {
  position: absolute;
  inset: 0;
}

.home-hero__slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.4s ease;
}

.home-hero__slide.is-active {
  opacity: 1;
}

.home-hero__overlay,
.home-cta__overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(var(--color-secondary-rgb), 0.18), transparent 26%),
    radial-gradient(circle at bottom right, rgba(var(--color-primary-rgb), 0.22), transparent 28%);
}

.home-hero__overlay {
  background:
    linear-gradient(90deg, rgba(var(--color-accent-rgb), 0.92) 0%, rgba(var(--color-accent-rgb), 0.58) 42%, rgba(var(--color-accent-rgb), 0.2) 100%),
    radial-gradient(circle at top left, rgba(var(--color-secondary-rgb), 0.18), transparent 26%),
    radial-gradient(circle at bottom right, rgba(var(--color-primary-rgb), 0.22), transparent 28%);
}

.home-hero__inner,
.home-band__inner,
.home-research-grid,
.home-insights,
.home-cta__inner,
.home-footer__inner,
.home-footer__bottom {
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
}

.home-hero__inner,
.home-cta__inner {
  position: relative;
  z-index: 1;
}

.home-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-top: 28px;
}

.home-brand {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.home-brand__mark {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 1px solid rgba(var(--color-secondary-rgb), 0.62);
  color: var(--color-secondary);
  font-size: 1.8rem;
  line-height: 1;
}

.home-brand__copy strong,
.home-brand__copy small {
  display: block;
}

.home-brand__copy strong {
  font-size: 1.7rem;
  letter-spacing: 0.06em;
}

.home-brand__copy small {
  margin-top: 2px;
  font-family: 'PT Serif', serif;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.74);
}

.home-nav__links,
.home-nav__tools,
.home-hero__actions,
.home-panel-head,
.home-project-card__tags,
.home-news-grid,
.home-footer__bottom div {
  display: flex;
  align-items: center;
}

.home-nav__links {
  gap: 30px;
}

.home-nav__links a,
.home-footer__links a,
.home-footer__bottom a {
  color: inherit;
  text-decoration: none;
}

.home-nav__links a {
  font-family: 'PT Serif', serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.88);
}

.home-nav__icon {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
}

.home-hero__content {
  width: min(620px, 100%);
  padding: 140px 0 160px;
}

.home-eyebrow,
.home-section-kicker {
  margin: 0 0 14px;
  font-family: 'PT Serif', serif;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.home-eyebrow,
.home-section-kicker--light {
  color: rgba(var(--color-secondary-rgb), 0.92);
}

.home-hero__content h1,
.home-intro-card h2,
.home-panel-head h2,
.home-news-panel h2,
.home-numbers-panel h2,
.home-cta__header h2 {
  margin: 0;
  font-size: clamp(3rem, 5.6vw, 4.6rem);
  line-height: 0.94;
}

.home-hero__text {
  width: min(34rem, 100%);
  margin: 24px 0 0;
  font-family: 'PT Serif', serif;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.82);
}

.home-hero__actions {
  gap: 16px;
  margin-top: 34px;
  flex-wrap: wrap;
}

.home-btn {
  min-height: 54px;
  padding: 0 24px;
  border-radius: 6px;
  font-family: 'PT Serif', serif;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
}

.home-btn--primary,
.home-btn--soft {
  border: 0;
  background: var(--color-secondary);
  color: #2f2b1e;
}

.home-btn--ghost {
  border: 1px solid rgba(255, 255, 255, 0.32);
  background: transparent;
  color: #fff;
}

.home-btn--soft {
  min-height: 46px;
  padding-inline: 18px;
  font-size: 0.74rem;
}

.home-band {
  background: linear-gradient(180deg, #f8f3eb 0%, #f2ebde 100%);
}

.home-band__inner {
  display: grid;
  grid-template-columns: 1.1fr 1.35fr 1.2fr;
  gap: 0;
  border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.12);
}

.home-intro-card,
.home-mission-card,
.home-pillar {
  padding: 34px 28px;
}

.home-intro-card,
.home-mission-card,
.home-pillar:not(:last-child) {
  border-right: 1px solid rgba(var(--color-primary-rgb), 0.12);
}

.home-intro-card h2,
.home-panel-head h2,
.home-news-panel h2,
.home-numbers-panel h2,
.home-cta__header h2 {
  font-size: 1.7rem;
  line-height: 1.08;
}

.home-intro-card p,
.home-pillar p,
.home-mission-card li,
.home-project-card__body p,
.home-news-card__body span,
.home-news-card__body h3,
.home-number-card span,
.home-cta-card p,
.home-footer__brand p,
.home-footer__links p {
  font-family: 'PT Serif', serif;
}

.home-intro-card p,
.home-pillar p,
.home-project-card__body p,
.home-cta-card p,
.home-footer__brand p,
.home-footer__links p {
  margin: 16px 0 0;
  font-size: 0.9rem;
  line-height: 1.8;
  color: #5f6877;
}

.home-link-btn {
  margin-top: 22px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-primary);
  font-family: 'PT Serif', serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
}

.home-link-btn--light {
  color: rgba(var(--color-secondary-rgb), 0.95);
}

.home-pillars {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.home-pillar {
  text-align: center;
}

.home-pillar__icon,
.home-number-card__icon,
.home-cta-card__icon {
  color: var(--color-secondary);
  font-size: 2.2rem;
  line-height: 1;
}

.home-pillar h3,
.home-project-card__body h3,
.home-news-card__body h3,
.home-cta-card h3,
.home-footer__links h3 {
  margin: 18px 0 0;
  font-size: 0.98rem;
  line-height: 1.14;
}

.home-mission-card ul {
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 18px;
}

.home-mission-card li {
  position: relative;
  padding-left: 26px;
  font-size: 0.94rem;
  line-height: 1.82;
  color: #4c5563;
}

.home-mission-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--color-secondary);
  font-size: 1.2rem;
}

.home-research-grid,
.home-insights {
  display: grid;
  grid-template-columns: 1.05fr 1.35fr;
}

.home-topics-panel {
  background: linear-gradient(180deg, #242821 0%, #181a15 100%);
  color: #fff;
}

.home-projects-panel,
.home-news-panel,
.home-numbers-panel {
  background: linear-gradient(180deg, #faf5ee 0%, #f4ede1 100%);
}

.home-panel-head {
  justify-content: space-between;
  gap: 16px;
  padding: 28px;
}

.home-panel-head--dark h2,
.home-panel-head--dark .home-section-kicker {
  color: #fff;
}

.home-topic-grid,
.home-project-grid,
.home-numbers-grid {
  display: grid;
}

.home-topic-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 0 28px 28px;
}

.home-topic-card {
  position: relative;
  min-height: 248px;
  overflow: hidden;
  border: 1px solid rgba(var(--color-secondary-rgb), 0.18);
  border-radius: 12px;
  padding: 0;
  background: #181a15;
  color: inherit;
  cursor: pointer;
}

.home-topic-card img,
.home-project-card__image img,
.home-news-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.home-topic-card__overlay {
  position: absolute;
  inset: 0;
  padding: 22px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.08) 0%, rgba(var(--color-accent-rgb), 0.88) 100%);
}

.home-topic-card__overlay h3 {
  margin: 0;
  font-size: 0.96rem;
}

.home-topic-card__overlay p {
  margin: 10px 0 0;
  font-size: 0.76rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
}

.home-project-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  padding: 0 28px 28px;
}

.home-project-card {
  overflow: hidden;
  border: 1px solid rgba(var(--color-primary-rgb), 0.14);
  border-radius: 12px;
  background: #fffdf8;
}

.home-project-card__image {
  position: relative;
  height: 230px;
}

.home-project-card__progress {
  position: absolute;
  right: 14px;
  bottom: 14px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(var(--color-accent-rgb), 0.78);
  border: 2px solid rgba(var(--color-secondary-rgb), 0.82);
  color: #fff;
  font-size: 0.82rem;
  font-weight: 700;
}

.home-project-card__body {
  padding: 20px;
}

.home-project-card__body h3 {
  margin: 0;
}

.home-project-card__body p {
  min-height: 68px;
  font-size: 0.84rem;
  line-height: 1.65;
}

.home-project-card__tags {
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.home-project-card__tags span {
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(var(--color-secondary-rgb), 0.2);
  color: #5c573f;
  font-family: 'PT Serif', serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.home-project-card .home-link-btn {
  margin-top: 18px;
}

.home-news-panel {
  padding: 0 28px 28px;
  border-right: 1px solid rgba(var(--color-primary-rgb), 0.12);
}

.home-news-grid {
  align-items: stretch;
  gap: 16px;
}

.home-news-card {
  flex: 1;
  overflow: hidden;
  border: 1px solid rgba(var(--color-primary-rgb), 0.12);
  border-radius: 12px;
  background: #fffdf9;
}

.home-news-card img {
  height: 170px;
}

.home-news-card__body {
  padding: 18px;
}

.home-news-card__body span {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8b8391;
}

.home-news-card__body h3 {
  min-height: 72px;
}

.home-news-card__body .home-link-btn {
  margin-top: 14px;
}

.home-numbers-panel {
  padding: 28px;
}

.home-numbers-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.home-number-card {
  padding: 22px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.12);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.74);
  text-align: center;
}

.home-number-card strong {
  display: block;
  margin-top: 16px;
  font-size: 2rem;
  line-height: 1;
  color: var(--color-accent);
}

.home-number-card span {
  display: block;
  margin-top: 10px;
  font-size: 0.82rem;
  line-height: 1.6;
  color: #646d7f;
  text-transform: uppercase;
}

.home-cta {
  position: relative;
  color: #fff;
  background:
    linear-gradient(0deg, rgba(var(--color-accent-rgb), 0.8), rgba(var(--color-accent-rgb), 0.8)),
    url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80') center / cover;
}

.home-cta__inner {
  position: relative;
  z-index: 1;
  padding: 40px 0 44px;
}

.home-cta__header {
  text-align: center;
}

.home-cta__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
}

.home-cta-card {
  padding: 26px 22px 28px;
  border-left: 1px solid rgba(var(--color-secondary-rgb), 0.18);
  text-align: center;
}

.home-cta-card:first-child {
  border-left: 0;
}

.home-cta-card p {
  color: rgba(255, 255, 255, 0.78);
}

.home-footer {
  background: linear-gradient(180deg, #141610 0%, #0f100d 100%);
  color: rgba(255, 255, 255, 0.88);
}

.home-footer__inner {
  display: grid;
  grid-template-columns: 1.1fr 1.4fr;
  gap: 40px;
  padding: 34px 0 26px;
}

.home-brand--footer {
  cursor: default;
}

.home-footer__links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.home-footer__links h3 {
  margin: 0 0 12px;
  font-size: 0.92rem;
}

.home-footer__links a,
.home-footer__links p,
.home-footer__brand p,
.home-footer__bottom {
  color: rgba(255, 255, 255, 0.72);
}

.home-footer__links a,
.home-footer__links p {
  display: block;
  margin: 0 0 8px;
  font-size: 0.84rem;
  line-height: 1.7;
}

.home-footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 16px 0 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.76rem;
}

.home-footer__bottom div {
  gap: 18px;
}

@media (max-width: 1180px) {
  .home-band__inner,
  .home-research-grid,
  .home-insights,
  .home-footer__inner {
    grid-template-columns: 1fr;
  }

  .home-project-grid,
  .home-cta__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-news-panel {
    border-right: 0;
    border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.12);
  }
}

@media (max-width: 920px) {
  .home-hero {
    min-height: 680px;
  }

  .home-hero__inner,
  .home-band__inner,
  .home-research-grid,
  .home-insights,
  .home-cta__inner,
  .home-footer__inner,
  .home-footer__bottom {
    width: min(100%, calc(100% - 28px));
  }

  .home-nav {
    flex-wrap: wrap;
  }

  .home-nav__links {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 16px 22px;
  }

  .home-band__inner,
  .home-pillars,
  .home-topic-grid,
  .home-project-grid,
  .home-news-grid,
  .home-numbers-grid,
  .home-cta__grid,
  .home-footer__links {
    grid-template-columns: 1fr;
  }

  .home-intro-card,
  .home-mission-card,
  .home-pillar,
  .home-pillar:not(:last-child) {
    border-right: 0;
  }

  .home-pillar {
    border-top: 1px solid rgba(var(--color-primary-rgb), 0.12);
  }

  .home-project-card__body p,
  .home-news-card__body h3 {
    min-height: 0;
  }

  .home-cta-card {
    border-left: 0;
    border-top: 1px solid rgba(var(--color-secondary-rgb), 0.18);
  }

  .home-cta-card:first-child {
    border-top: 0;
  }
}

@media (max-width: 640px) {
  .home-hero__inner,
  .home-band__inner,
  .home-research-grid,
  .home-insights,
  .home-cta__inner,
  .home-footer__inner,
  .home-footer__bottom {
    width: min(100%, calc(100% - 20px));
  }

  .home-brand__copy strong {
    font-size: 1.3rem;
  }

  .home-hero__content {
    padding: 90px 0 110px;
  }

  .home-hero__content h1 {
    font-size: 2.35rem;
  }

  .home-hero__text {
    font-size: 0.92rem;
  }

  .home-btn,
  .home-btn--soft,
  .home-nav__icon {
    width: 100%;
  }

  .home-hero__actions,
  .home-footer__bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .home-nav__tools {
    width: 100%;
  }

  .home-intro-card,
  .home-mission-card,
  .home-pillar,
  .home-panel-head,
  .home-news-panel,
  .home-numbers-panel,
  .home-project-card__body,
  .home-cta-card {
    padding-left: 18px;
    padding-right: 18px;
  }
}
</style>
