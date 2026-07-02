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
@import url('https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

#app {
  font-family: 'PT Serif', serif;
  color: #1a1a1a;
  background: #fff;
}

/* NAVBAR */
.navbar {
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 6px rgba(0,0,0,0.06);
}
.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 32px;
  height: 64px;
}
.logo { display: flex; align-items: center; gap: 10px; }
.logo-text { display: flex; flex-direction: column; }
.logo-name { font-family: 'PT Serif', serif; font-weight: 800; font-size: 1.15rem; letter-spacing: 1px; color: #1a1a1a; line-height: 1; }
.logo-sub { font-size: 0.62rem; color: #888; letter-spacing: 0.3px; }
.nav-links { display: flex; list-style: none; gap: 4px; flex: 1; justify-content: center; }
.nav-links li a {
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.5px;
  color: #444;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 4px;
  transition: color 0.2s;
}
.nav-links li a.active, .nav-links li a:hover { color: var(--color-primary); border-bottom: 2px solid var(--color-primary); }
.nav-right { display: flex; align-items: center; gap: 12px; margin-left: auto; }
.search-box { display: flex; border: 1px solid #ddd; border-radius: 24px; overflow: hidden; }
.search-box input { border: none; outline: none; padding: 6px 14px; font-size: 0.82rem; width: 180px; }
.search-box button { border: none; background: #fff; padding: 6px 12px; cursor: pointer; }
.avatar { width: 34px; height: 34px; border-radius: 50%; background: #eee; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; cursor: pointer; }

/* HERO */
.hero {
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 24px 0;
  display: flex;
  align-items: center;
  gap: 40px;
  min-height: 500px;
  position: relative;
}
.hero-content { flex: 0 0 480px; }
.hero-title {
  font-family: 'PT Serif', serif;
  font-weight: 900;
  font-size: 4.2rem;
  line-height: 1.0;
  margin-bottom: 20px;
  letter-spacing: -1px;
}
.hero-title .black { color: #1a1a1a; }
.hero-title .green { color: var(--color-primary); }
.hero-desc { font-size: 1rem; color: #555; line-height: 1.6; margin-bottom: 28px; max-width: 380px; }
.hero-btns { display: flex; gap: 12px; }
.btn-primary {
  background: var(--color-primary);
  color: #fff;
  border: none;
  padding: 13px 24px;
  border-radius: 6px;
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background: var(--color-primary-dark); }
.btn-outline {
  background: transparent;
  color: #1a1a1a;
  border: 1.5px solid #ccc;
  padding: 13px 24px;
  border-radius: 6px;
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  cursor: pointer;
}
.hero-image {
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 400px;
}
.hero-img-bg {
  position: absolute;
  right: 0; top: -20px;
  width: 520px; height: 420px;
  background: var(--color-primary);
  border-radius: 50% 0 0 50% / 60% 0 0 60%;
  z-index: 0;
  opacity: 0.12;
}
.hero-crystals {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 540px;
  object-fit: contain;
  border-radius: 12px;
}

/* STATS BAR */
.stats-bar {
  max-width: 1280px;
  margin: 32px auto 0;
  padding: 0 24px;
  display: flex;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.stat {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px 28px;
  border-right: 1px solid #eee;
}
.stat:last-child { border-right: none; }
.stat-icon { font-size: 1.6rem; }
.stat-num { font-family: 'PT Serif', serif; font-weight: 800; font-size: 1.5rem; color: #1a1a1a; }
.stat-label { font-size: 0.82rem; color: #888; }

/* CATEGORIES */
.categories {
  max-width: 1280px;
  margin: 52px auto 0;
  padding: 0 24px;
  display: grid;
  gap: 20px;
}
.cat-left h2 { font-family: 'PT Serif', serif; font-weight: 800; font-size: 1.5rem; line-height: 1.2; margin-bottom: 10px; }
.cat-left p { font-size: 0.85rem; color: #666; }
.cat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
.cat-card {
  position: relative;
  min-height: 220px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.12);
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  text-align: left;
  color: inherit;
  background: rgba(var(--color-primary-rgb), 0.1);
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}
.cat-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-primary);
  box-shadow: 0 10px 26px rgba(var(--color-primary-rgb), 0.12);
}
.cat-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.22s ease, transform 0.22s ease;
}
.cat-card:hover .cat-image {
  opacity: 0.24;
  transform: scale(1.03);
}
.cat-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 20px;
  background: linear-gradient(180deg, rgba(10, 16, 10, 0.05) 0%, rgba(10, 16, 10, 0.82) 100%);
}
.cat-name {
  position: relative;
  z-index: 1;
  font-family: 'PT Serif', serif;
  font-weight: 800;
  font-size: 1.25rem;
  color: #fff;
}
.cat-desc {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  margin-top: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.82rem;
  line-height: 1.5;
  transition: max-height 0.22s ease, opacity 0.22s ease, margin-top 0.22s ease;
}
.cat-card:hover .cat-desc {
  max-height: 72px;
  opacity: 1;
  margin-top: 10px;
}

/* FEATURED SPECIMENS */
.featured {
  max-width: 1280px;
  margin: 52px auto 0;
  padding: 0 24px;
}
.featured-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.featured-header h2 { font-family: 'PT Serif', serif; font-weight: 800; font-size: 1.4rem; }
.featured-subtext {
  margin-top: 6px;
  font-size: 0.84rem;
  color: #697386;
  line-height: 1.5;
}
.view-all-link { font-size: 0.85rem; color: var(--color-primary); text-decoration: none; font-weight: 600; }
.specimens-grid {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(260px, 1fr);
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
}
.specimen-card {
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s;
  padding: 0;
  text-align: left;
  color: inherit;
  appearance: none;
  -webkit-appearance: none;
}
.specimen-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
.spec-img-wrap { position: relative; height: 160px; overflow: hidden; background: #f5f5f5; }
.spec-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.spec-badge {
  position: absolute; top: 8px; left: 8px;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: #fff;
}
.badge-geo { background: #444; }
.badge-paleo { background: var(--color-secondary); }
.badge-min { background: var(--color-primary); }
.badge-gem { background: #7c3aed; }
.spec-info { padding: 12px; }
.spec-name { font-weight: 700; font-size: 0.9rem; margin-bottom: 2px; }
.spec-id { font-size: 0.72rem; color: #aaa; margin-bottom: 4px; }
.spec-origin { font-size: 0.75rem; color: #666; }

.featured-research {
  margin-top: 40px;
}

.research-home-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.research-home-card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 20px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.12);
  border-radius: 16px;
  background: linear-gradient(180deg, rgba(var(--color-primary-rgb), 0.08), rgba(255, 255, 255, 0.98));
  box-shadow: 0 12px 28px rgba(var(--color-primary-rgb), 0.06);
}

.research-home-top,
.research-home-actions,
.research-home-links,
.research-home-tags {
  display: flex;
  align-items: center;
}

.research-home-top {
  justify-content: space-between;
  gap: 10px;
}

.research-home-type,
.research-home-year,
.research-home-id,
.research-home-tags span {
  font-size: 0.75rem;
  font-weight: 700;
}

.research-home-type {
  color: var(--color-primary);
  background: rgba(var(--color-primary-rgb), 0.09);
  padding: 6px 10px;
  border-radius: 999px;
}

.research-home-year,
.research-home-id {
  color: #7a8090;
}

.research-home-card h3 {
  margin: 14px 0 8px;
  font-family: 'PT Serif', serif;
  font-size: 1.16rem;
  line-height: 1.35;
  color: #273142;
}

.research-home-author {
  font-size: 0.84rem;
  font-weight: 700;
  color: #5d6270;
}

.research-home-summary {
  margin-top: 10px;
  font-size: 0.84rem;
  line-height: 1.65;
  color: #677182;
}

.research-home-tags {
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.research-home-tags span {
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(var(--color-primary-rgb), 0.08);
  color: #5d6270;
}

.research-home-actions {
  justify-content: space-between;
  gap: 14px;
  margin-top: auto;
  padding-top: 18px;
}

.research-home-links {
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.research-home-links a {
  font-size: 0.82rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 700;
}

.research-home-btn {
  border: 1px solid rgba(var(--color-primary-rgb), 0.14);
  background: #fff;
  color: #334155;
  border-radius: 999px;
  padding: 8px 12px;
  font-family: 'PT Serif', serif;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
}

/* FIND SECTION */
.find-section {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  margin: 52px 0 0;
  padding: 40px 0;
}
.find-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: flex-start;
  gap: 40px;
}
.find-left { flex: 0 0 240px; color: #fff; }
.find-left h2 { font-family: 'PT Serif', serif; font-weight: 900; font-size: 1.8rem; margin-bottom: 8px; }
.find-left p { font-size: 0.88rem; opacity: 0.85; line-height: 1.5; }
.find-right { flex: 1; }
.find-search {
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 12px 18px;
  gap: 10px;
  margin-bottom: 12px;
}
.find-search input { border: none; outline: none; flex: 1; font-size: 0.9rem; }
.find-filters { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.find-filters select {
  border: 1.5px solid rgba(255,255,255,0.4);
  background: rgba(255,255,255,0.1);
  color: #fff;
  border-radius: 6px;
  padding: 9px 14px;
  font-size: 0.82rem;
  outline: none;
  cursor: pointer;
}
.search-btn {
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  margin-left: auto;
}

/* AUDIENCE */
.audience {
  max-width: 1280px;
  margin: 52px auto 0;
  padding: 0 24px;
  display: flex;
  gap: 20px;
}
.audience-card {
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  min-height: 220px;
}
.audience-card.edu { background: rgba(var(--color-primary-rgb), 0.08); }
.audience-card.stu { background: rgba(var(--color-secondary-rgb), 0.16); }
.audience-img { width: 200px; object-fit: cover; }
.audience-content { padding: 28px 28px; flex: 1; }
.audience-content h3 { font-family: 'PT Serif', serif; font-weight: 800; font-size: 1.2rem; margin-bottom: 8px; color: var(--color-primary); }
.stu-title { color: #7c3aed !important; }
.audience-content p { font-size: 0.85rem; color: #666; margin-bottom: 14px; }
.audience-content ul { list-style: none; }
.audience-content ul li { font-size: 0.82rem; color: #444; margin-bottom: 5px; }

/* TRUST */
.trust {
  max-width: 1280px;
  margin: 48px auto 0;
  padding: 0 24px;
  display: flex;
  gap: 24px;
}
.trust-item { flex: 1; display: flex; align-items: flex-start; gap: 14px; }
.trust-icon { font-size: 1.6rem; flex-shrink: 0; }
.trust-title { font-family: 'PT Serif', serif; font-weight: 800; font-size: 0.95rem; margin-bottom: 4px; }
.trust-desc { font-size: 0.8rem; color: #666; }

/* FOOTER */
.footer {
  background: #111;
  color: #aaa;
  margin-top: 60px;
  padding: 52px 0 0;
}
.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px 40px;
  display: flex;
  gap: 40px;
}
.footer-brand { flex: 0 0 240px; }
.footer-brand p { font-size: 0.8rem; color: #888; margin-top: 14px; line-height: 1.6; }
.footer-brand .logo-name { color: #fff; }
.footer-brand .logo-sub { color: #888; }
.social-links { display: flex; gap: 10px; margin-top: 14px; font-size: 1.1rem; }
.social-links a { color: #888; text-decoration: none; }
.footer-col { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.footer-col-title { font-family: 'PT Serif', serif; font-weight: 800; font-size: 0.85rem; color: #fff; letter-spacing: 0.5px; margin-bottom: 4px; }
.footer-col a { color: #888; text-decoration: none; font-size: 0.8rem; transition: color 0.2s; }
.footer-col a:hover { color: var(--color-secondary); }
.footer-col p { font-size: 0.78rem; color: #777; line-height: 1.6; }
.footer-bottom {
  border-top: 1px solid #222;
  padding: 18px 24px;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #666;
}
.footer-bottom div { display: flex; gap: 20px; }
.footer-bottom a { color: #666; text-decoration: none; }
.footer-bottom a:hover { color: #aaa; }

@media (max-width: 1100px) {
  .hero {
    min-height: auto;
    padding-top: 40px;
    gap: 28px;
  }

  .hero-content {
    flex: 0 1 420px;
  }

  .hero-title {
    font-size: 3.5rem;
  }

  .stats-bar {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stat {
    border-right: 1px solid #eee;
  }

  .stat:nth-child(2n) {
    border-right: none;
  }

  .stat:nth-child(-n + 2) {
    border-bottom: 1px solid #eee;
  }

  .categories {
    gap: 20px;
  }

  .cat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .research-home-grid {
    grid-template-columns: 1fr;
  }

  .find-inner,
  .audience,
  .trust,
  .footer-inner {
    flex-direction: column;
  }

  .find-left {
    flex-basis: auto;
  }

  .audience-card {
    min-height: 0;
  }

  .trust {
    gap: 20px;
  }
}

@media (max-width: 860px) {
  .hero,
  .stats-bar,
  .categories,
  .featured,
  .find-inner,
  .audience,
  .trust,
  .footer-inner,
  .footer-bottom {
    padding-left: 20px;
    padding-right: 20px;
  }

  .hero {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 28px;
  }

  .hero-content {
    flex: 1 1 auto;
    width: 100%;
  }

  .hero-title {
    font-size: 3rem;
  }

  .cat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-desc {
    max-width: 100%;
  }

  .specimens-grid {
    grid-auto-columns: minmax(240px, 1fr);
  }

  .featured-header {
    gap: 12px;
    align-items: flex-start;
  }

  .hero-btns {
    flex-wrap: wrap;
  }

  .hero-image {
    width: 100%;
    min-height: 300px;
  }

  .hero-img-bg {
    width: 100%;
    max-width: 520px;
    height: 320px;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }

  .hero-crystals {
    max-width: 100%;
  }

  .find-filters {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .find-filters select,
  .search-btn {
    width: 100%;
    margin-left: 0;
  }

  .audience-card,
  .audience-card.stu {
    flex-direction: column;
  }

  .audience-card.stu .audience-img {
    order: -1;
  }

  .audience-img {
    width: 100%;
    height: 220px;
  }

  .footer-inner {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }

  .footer-brand {
    flex-basis: auto;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

@media (max-width: 640px) {
  .hero,
  .stats-bar,
  .categories,
  .featured,
  .find-inner,
  .audience,
  .trust,
  .footer-inner,
  .footer-bottom {
    padding-left: 16px;
    padding-right: 16px;
  }

  .hero {
    padding-top: 20px;
  }

  .hero-title {
    font-size: 2.4rem;
    line-height: 0.96;
  }

  .cat-grid {
    grid-template-columns: 1fr;
  }

  .cat-card {
    min-height: 200px;
  }

  .hero-btns {
    flex-direction: column;
    width: 100%;
  }

  .specimens-grid {
    grid-auto-columns: minmax(220px, 1fr);
  }

  .btn-primary,
  .btn-outline {
    width: 100%;
  }

  .hero-image {
    min-height: 240px;
  }

  .hero-img-bg {
    height: 240px;
    top: 0;
  }

  .stats-bar {
    grid-template-columns: 1fr;
  }

  .stat,
  .stat:nth-child(2n) {
    border-right: none;
  }

  .stat:nth-child(-n + 2) {
    border-bottom: none;
  }

  .stat:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  .featured-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .specimen-card {
    flex-basis: 78vw;
    max-width: 280px;
  }

  .find-section {
    padding: 32px 0;
  }

  .find-search {
    padding: 10px 14px;
  }

  .find-filters {
    grid-template-columns: 1fr;
  }

  .research-home-actions,
  .research-home-links {
    align-items: flex-start;
    flex-direction: column;
  }

  .audience-content {
    padding: 20px;
  }

  .trust {
    gap: 18px;
  }

  .trust-item {
    gap: 12px;
  }

  .footer-inner {
    grid-template-columns: 1fr;
  }

  .footer-bottom div {
    flex-wrap: wrap;
    gap: 12px;
  }
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
  background:
    linear-gradient(90deg, rgba(var(--color-accent-rgb), 0.88) 0%, rgba(var(--color-accent-rgb), 0.56) 38%, rgba(var(--color-accent-rgb), 0.18) 100%),
    url('https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=1600&q=80') center / cover;
}

.home-hero__overlay,
.home-cta__overlay {
  position: absolute;
  inset: 0;
  background:
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
