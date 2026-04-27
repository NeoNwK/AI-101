<template>
  <div id="app">
    <!-- ROUTE: ALL SPECIMENS PAGE -->
    <AllSpecimens
      v-if="currentPage === 'specimens'"
      @go-home="goHome"
      @open-specimen="openSpecimen"
    />

    <SpecimenDetail
      v-else-if="currentPage === 'detail' && selectedSpecimenId"
      :specimen-id="selectedSpecimenId"
      @go-home="goHome"
      @back-to-specimens="goToSpecimens"
      @open-specimen="openSpecimen"
    />

    <!-- HOME PAGE -->
    <template v-else>
    <!-- NAVBAR -->
    <AppNavbar
      active-page="home"
      search-placeholder="Search specimens..."
      @go-home="goHome"
      @go-browse="goToSpecimens"
    />

    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="black">EXPLORE.</span><br/>
          <span class="green">LEARN.</span><br/>
          <span class="black">UNDERSTAND.</span>
        </h1>
        <p class="hero-desc">A comprehensive educational database of geological and paleontological specimens, minerals, and gemstones.</p>
        <div class="hero-btns">
          <button class="btn-primary" @click="goToSpecimens">⊕ BROWSE COLLECTION</button>
          <button class="btn-outline">▶ HOW IT WORKS</button>
        </div>
      </div>
      <div class="hero-image">
        <div class="hero-img-bg"></div>
        <img src="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=700&q=80" alt="Crystals and minerals" class="hero-crystals" />
      </div>
    </section>

    <!-- STATS -->
    <div class="stats-bar">
      <div class="stat" v-for="s in stats" :key="s.label">
        <span class="stat-icon" v-html="s.icon"></span>
        <div>
          <div class="stat-num">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <!-- CATEGORIES -->
    <section class="categories">
      <div class="cat-left">
        <h2>EXPLORE BY<br/>CATEGORY</h2>
        <p>Discover specimens across all disciplines</p>
      </div>
      <div class="cat-grid">
        <div class="cat-card" v-for="c in categories" :key="c.name">
          <div class="cat-icon" v-html="c.icon"></div>
          <div class="cat-name">{{ c.name }}</div>
          <div class="cat-desc">{{ c.desc }}</div>
        </div>
        <div class="cat-card arrow-card">›</div>
      </div>
    </section>
    <div class="view-all-btn-wrap">
      <button class="view-all-btn">VIEW ALL 18+ CATEGORIES ▾</button>
    </div>

    <!-- FEATURED SPECIMENS -->
    <section class="featured">
      <div class="featured-header">
        <h2>FEATURED SPECIMENS</h2>
        <a href="#" class="view-all-link" @click.prevent="goToSpecimens">VIEW ALL SPECIMENS →</a>
      </div>
      <div class="specimens-grid">
        <button class="specimen-card" v-for="sp in specimens" :key="sp.id" @click="openSpecimen(sp.id)">
          <div class="spec-img-wrap">
            <span class="spec-badge" :class="sp.badgeClass">{{ sp.badge }}</span>
            <img :src="sp.img" :alt="sp.name" />
          </div>
          <div class="spec-info">
            <div class="spec-name">{{ sp.name }}</div>
            <div class="spec-id">{{ sp.id }}</div>
            <div class="spec-origin">📍 {{ sp.origin }}</div>
          </div>
        </button>
        <div class="spec-arrow">›</div>
      </div>
    </section>

    <!-- FIND SPECIMENS -->
    <section class="find-section">
      <div class="find-inner">
        <div class="find-left">
          <h2>FIND SPECIMENS</h2>
          <p>Search and filter our database to find exactly what you need.</p>
        </div>
        <div class="find-right">
          <div class="find-search">
            <span>🔍</span>
            <input type="text" placeholder="Search specimens, minerals, fossils..." />
          </div>
          <div class="find-filters">
            <select><option>All Categories</option></select>
            <select><option>All Origins</option></select>
            <select><option>All Rock Types</option></select>
            <select><option>All Colors</option></select>
            <button class="search-btn">SEARCH</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FOR EDUCATORS / STUDENTS -->
    <section class="audience">
      <div class="audience-card edu">
        <img src="https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=300&q=80" alt="Educator" class="audience-img" />
        <div class="audience-content">
          <h3>FOR EDUCATORS</h3>
          <p>Power your teaching with reliable data and visual resources.</p>
          <ul>
            <li>✔ High-quality specimen images</li>
            <li>✔ Detailed scientific information</li>
            <li>✔ Perfect for lectures and materials</li>
            <li>✔ Easy to integrate and share</li>
          </ul>
        </div>
      </div>
      <div class="audience-card stu">
        <div class="audience-content">
          <h3 class="stu-title">FOR STUDENTS</h3>
          <p>Access trusted information anytime, anywhere.</p>
          <ul>
            <li>✔ Explore and learn at your own pace</li>
            <li>✔ Reliable academic sources</li>
            <li>✔ Support your research projects</li>
            <li>✔ Build your knowledge</li>
          </ul>
        </div>
        <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&q=80" alt="Student" class="audience-img" />
      </div>
    </section>

    <!-- TRUST SECTION -->
    <section class="trust">
      <div class="trust-item" v-for="t in trustItems" :key="t.title">
        <div class="trust-icon" v-html="t.icon"></div>
        <div>
          <div class="trust-title">{{ t.title }}</div>
          <div class="trust-desc">{{ t.desc }}</div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="logo">
            <div class="logo-icon">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke="#2d6a3f" stroke-width="2.5" fill="none"/>
                <polygon points="18,8 28,13 28,23 18,28 8,23 8,13" stroke="#2d6a3f" stroke-width="1.5" fill="rgba(45,106,63,0.15)"/>
                <circle cx="18" cy="18" r="4" fill="#2d6a3f"/>
              </svg>
            </div>
            <div class="logo-text">
              <span class="logo-name">GEO HUB</span>
              <span class="logo-sub">Educational Database</span>
            </div>
          </div>
          <p>Advancing Earth science education through accessible and high-quality specimen data.</p>
          <div class="social-links">
            <a href="#">📘</a><a href="#">📸</a><a href="#">▶</a><a href="#">✉</a>
          </div>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">QUICK LINKS</div>
          <a href="#">Browse Specimens</a>
          <a href="#">Categories</a>
          <a href="#">For Educators</a>
          <a href="#">For Students</a>
          <a href="#">Help Center</a>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">RESOURCES</div>
          <a href="#">Glossary</a>
          <a href="#">Rock Identifier</a>
          <a href="#">Learning Materials</a>
          <a href="#">Data Guidelines</a>
          <a href="#">API Access</a>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">ABOUT</div>
          <a href="#">About Us</a>
          <a href="#">Our Mission</a>
          <a href="#">Partners</a>
          <a href="#">Contact Us</a>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">CONTACT</div>
          <p>📍 Department of Geology, Chulalongkorn University<br/>Bangkok, Thailand 10330</p>
          <p>✉ geohub@chula.ac.th</p>
          <p>📞 +66 2 218 5458</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2024 GEO HUB Educational Database. All rights reserved.</span>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
    </template><!-- end home page -->
  </div>
</template>

<script>
import AllSpecimens from './AllSpecimens.vue'
import SpecimenDetail from './SpecimenDetail.vue'
import AppNavbar from './components/AppNavbar.vue'
import { featuredSpecimens } from './data/specimens'

export default {
  name: 'App',
  components: { AllSpecimens, SpecimenDetail, AppNavbar },
  data() {
    return {
      currentPage: 'home',
      selectedSpecimenId: null,
      stats: [
        { icon: '📖', value: '2,450+', label: 'Specimens' },
        { icon: '⊞', value: '20+', label: 'Categories' },
        { icon: '🌐', value: '45+', label: 'Countries' },
        { icon: '👥', value: '1,250+', label: 'Users' },
      ],
      categories: [
        { name: 'GEOLOGY', desc: 'Igneous, Sedimentary, Metamorphic & more', icon: '⛰️' },
        { name: 'PALEONTOLOGY', desc: 'Fossils, ancient life, and paleoenvironment', icon: '🦕' },
        { name: 'MINERAL', desc: 'Mineral specimens and crystal structures', icon: '💎' },
        { name: 'GEMSTONES', desc: 'Precious stones and jewelry materials', icon: '💠' },
        { name: 'PETROLOGY', desc: 'Rocks and thin sections', icon: '🪨' },
        { name: 'GEOCHEMISTRY', desc: 'Elemental composition and isotopes', icon: '⚗️' },
        { name: 'GEOPHYSICS', desc: 'Physical properties and measurements', icon: '📡' },
        { name: 'SOIL SCIENCE', desc: 'Soils, sediments and profiles', icon: '🌱' },
      ],
      specimens: featuredSpecimens,
      trustItems: [
        { icon: '✅', title: 'TRUSTED & VERIFIED', desc: 'Verified by geoscience experts and institutions' },
        { icon: '📊', title: 'High Quality Data', desc: 'Accurate, detailed, and continuously updated' },
        { icon: '🌍', title: 'Global Coverage', desc: 'Specimens from 45+ countries and institutions' },
        { icon: '📚', title: 'Open for Education', desc: 'Built for teaching, learning, and research' },
      ],
    }
  },
  methods: {
    goHome() {
      this.currentPage = 'home'
      this.selectedSpecimenId = null
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    goToSpecimens() {
      this.currentPage = 'specimens'
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
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

#app {
  font-family: 'Barlow', sans-serif;
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
.logo-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 1.15rem; letter-spacing: 1px; color: #1a1a1a; line-height: 1; }
.logo-sub { font-size: 0.62rem; color: #888; letter-spacing: 0.3px; }
.nav-links { display: flex; list-style: none; gap: 4px; flex: 1; justify-content: center; }
.nav-links li a {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.5px;
  color: #444;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 4px;
  transition: color 0.2s;
}
.nav-links li a.active, .nav-links li a:hover { color: #2d6a3f; border-bottom: 2px solid #2d6a3f; }
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
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 4.2rem;
  line-height: 1.0;
  margin-bottom: 20px;
  letter-spacing: -1px;
}
.hero-title .black { color: #1a1a1a; }
.hero-title .green { color: #2d6a3f; }
.hero-desc { font-size: 1rem; color: #555; line-height: 1.6; margin-bottom: 28px; max-width: 380px; }
.hero-btns { display: flex; gap: 12px; }
.btn-primary {
  background: #2d6a3f;
  color: #fff;
  border: none;
  padding: 13px 24px;
  border-radius: 6px;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background: #245533; }
.btn-outline {
  background: transparent;
  color: #1a1a1a;
  border: 1.5px solid #ccc;
  padding: 13px 24px;
  border-radius: 6px;
  font-family: 'Barlow Condensed', sans-serif;
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
  background: #2d6a3f;
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
.stat-num { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 1.5rem; color: #1a1a1a; }
.stat-label { font-size: 0.82rem; color: #888; }

/* CATEGORIES */
.categories {
  max-width: 1280px;
  margin: 52px auto 0;
  padding: 0 24px;
  display: flex;
  align-items: flex-start;
  gap: 40px;
}
.cat-left { flex: 0 0 200px; }
.cat-left h2 { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 1.5rem; line-height: 1.2; margin-bottom: 10px; }
.cat-left p { font-size: 0.85rem; color: #666; }
.cat-grid { display: flex; gap: 10px; flex: 1; flex-wrap: nowrap; overflow-x: auto; }
.cat-card {
  flex: 0 0 120px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 16px 12px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.cat-card:hover { border-color: #2d6a3f; box-shadow: 0 2px 10px rgba(45,106,63,0.1); }
.cat-icon { font-size: 1.8rem; margin-bottom: 8px; }
.cat-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 0.78rem; letter-spacing: 0.3px; margin-bottom: 6px; }
.cat-desc { font-size: 0.68rem; color: #888; line-height: 1.4; }
.arrow-card {
  display: flex; align-items: center; justify-content: center;
  font-size: 1.6rem; color: #aaa;
  background: #fafafa;
}

.view-all-btn-wrap { display: flex; justify-content: center; margin-top: 20px; }
.view-all-btn {
  border: 1.5px solid #ccc;
  background: #fff;
  border-radius: 24px;
  padding: 10px 28px;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.view-all-btn:hover { border-color: #2d6a3f; color: #2d6a3f; }

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
.featured-header h2 { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 1.4rem; }
.view-all-link { font-size: 0.85rem; color: #2d6a3f; text-decoration: none; font-weight: 600; }
.specimens-grid {
  display: flex;
  gap: 14px;
  position: relative;
  overflow-x: auto;
}
.specimen-card {
  flex: 0 0 180px;
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
.badge-paleo { background: #c0892a; }
.badge-min { background: #2d6a3f; }
.badge-gem { background: #7c3aed; }
.spec-info { padding: 12px; }
.spec-name { font-weight: 700; font-size: 0.9rem; margin-bottom: 2px; }
.spec-id { font-size: 0.72rem; color: #aaa; margin-bottom: 4px; }
.spec-origin { font-size: 0.75rem; color: #666; }
.spec-arrow {
  display: flex; align-items: center; justify-content: center;
  flex: 0 0 36px;
  font-size: 1.6rem; color: #aaa; cursor: pointer;
}

/* FIND SECTION */
.find-section {
  background: #2d6a3f;
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
.find-left h2 { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 1.8rem; margin-bottom: 8px; }
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
  font-family: 'Barlow Condensed', sans-serif;
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
.audience-card.edu { background: #f4f9f5; }
.audience-card.stu { background: #f5f4f9; }
.audience-img { width: 200px; object-fit: cover; }
.audience-content { padding: 28px 28px; flex: 1; }
.audience-content h3 { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 1.2rem; margin-bottom: 8px; color: #2d6a3f; }
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
.trust-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 0.95rem; margin-bottom: 4px; }
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
.footer-col-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 0.85rem; color: #fff; letter-spacing: 0.5px; margin-bottom: 4px; }
.footer-col a { color: #888; text-decoration: none; font-size: 0.8rem; transition: color 0.2s; }
.footer-col a:hover { color: #2d6a3f; }
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
    flex-direction: column;
    gap: 20px;
  }

  .cat-left {
    flex-basis: auto;
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

  .hero-desc {
    max-width: 100%;
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

  .hero-btns {
    flex-direction: column;
    width: 100%;
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
</style>
