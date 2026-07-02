<template>
  <div class="detail-page" v-if="specimen">
    <ImageLightbox
      v-if="lightboxImage"
      :src="lightboxImage.src"
      :alt="lightboxImage.alt"
      @close="lightboxImage = null"
    />

    <AppNavbar
      active-page="browse"
      :search-value="specimen.name"
      :search-readonly="true"
      @go-home="$emit('go-home')"
      @go-browse="$emit('back-to-specimens')"
      @go-about="$emit('go-about')"
      @go-research="$emit('go-research')"
      @go-contact="$emit('go-contact')"
    />

    <div class="detail-shell">
      <div class="page-breadcrumb app-breadcrumb">
        <button type="button" class="app-breadcrumb__back" @click="$emit('back-to-specimens')">
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </button>
        <div class="app-breadcrumb__trail">
          <span
            v-for="(crumb, index) in specimen.breadcrumb"
            :key="crumb"
            class="app-breadcrumb__item"
            :class="{ 'is-current': index === specimen.breadcrumb.length - 1 }"
          >
            <button
              v-if="index < specimen.breadcrumb.length - 1"
              type="button"
              class="app-breadcrumb__link"
              @click="onBreadcrumbClick(index)"
            >{{ crumb }}</button>
            <span v-else>{{ crumb }}</span>
            <span v-if="index < specimen.breadcrumb.length - 1" class="app-breadcrumb__sep">›</span>
          </span>
        </div>
      </div>

      <section class="hero-layout">
        <div class="gallery-panel">
          <div class="hero-image-frame">
            <div class="image-count">{{ activeImageIndex + 1 }} / {{ specimen.heroImages.length }}</div>
            <button class="gallery-nav prev" @click="stepImage(-1)">‹</button>
            <img :src="activeImage.src" :alt="activeImage.alt" class="preview-image" @click="openImagePreview(activeImage.src, activeImage.alt)" />
            <button class="gallery-nav next" @click="stepImage(1)">›</button>
          </div>

          <div class="thumb-row">
            <button
              v-for="(image, index) in specimen.heroImages"
              :key="image.id"
              class="thumb"
              :class="{ active: index === activeImageIndex }"
              @click="activeImageIndex = index"
            >
              <img :src="image.src" :alt="image.alt" />
            </button>
          </div>

          <div class="tab-row">
            <button
              v-for="tab in tabs"
              :key="tab"
              class="tab-btn"
              :class="{ active: currentTab === tab }"
              @click="currentTab = tab"
            >
              {{ tab }}
            </button>
          </div>

          <div class="content-card">
            <template v-if="currentTab === 'Overview'">
              <h3>Description</h3>
              <p>{{ specimen.description }}</p>

              <h3>Key Characteristics</h3>
              <div class="tag-row">
                <span v-for="item in specimen.keyCharacteristics" :key="item" class="tag">{{ item }}</span>
              </div>

              <h3>Composition</h3>
              <div class="composition-grid">
                <article v-for="item in specimen.composition" :key="item.name" class="composition-card">
                  <img :src="item.image" :alt="item.name" />
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.value }}</span>
                </article>
              </div>

              <div class="cross-section-card">
                <img
                  :src="specimen.crossSection.image"
                  :alt="`${specimen.name} section`"
                  class="preview-image"
                  @click="openImagePreview(specimen.crossSection.image, `${specimen.name} section`)"
                />
                <div>
                  <h3>Cross Section</h3>
                  <p>{{ specimen.crossSection.description }}</p>
                  <button class="secondary-btn" @click="currentTab = 'Gallery'">View All Images</button>
                </div>
              </div>
            </template>

            <template v-else-if="currentTab === 'Properties'">
              <h3>Specimen Properties</h3>
              <div class="detail-grid two-col">
                <div v-for="[label, value] in specimen.properties" :key="label" class="detail-row">
                  <span>{{ label }}</span>
                  <strong>{{ value }}</strong>
                </div>
              </div>
            </template>

            <template v-else-if="currentTab === 'Composition'">
              <h3>Material Breakdown</h3>
              <div class="composition-grid">
                <article v-for="item in specimen.composition" :key="item.name" class="composition-card">
                  <img :src="item.image" :alt="item.name" />
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.value }}</span>
                </article>
              </div>
            </template>

            <template v-else-if="currentTab === 'Gallery'">
              <h3>Gallery</h3>
              <div class="gallery-grid">
                <button
                  v-for="(image, index) in specimen.heroImages"
                  :key="image.id"
                  class="gallery-card"
                  @click="activeImageIndex = index"
                >
                  <img :src="image.src" :alt="image.alt" />
                  <span>{{ image.label }}</span>
                </button>
              </div>
            </template>

            <template v-else>
              <h3>References</h3>
              <ul class="reference-list">
                <li>Paleo Research Group Internal Catalog Template</li>
                <li>Teaching Collection Metadata Schema v1.0</li>
                <li>Mock specimen record prepared for UI prototyping</li>
              </ul>
            </template>
          </div>
        </div>

        <aside class="summary-panel">
          <div class="eyebrow">{{ specimen.category }}</div>
          <h1>{{ specimen.name }}</h1>
          <div class="meta-line">
            <span class="verified">{{ specimen.verification }}</span>
            <span>Specimen ID: {{ specimen.id }}</span>
          </div>

          <div class="summary-list">
            <div class="summary-row"><span>Type</span><strong>{{ specimen.subcategory }}</strong></div>
            <div class="summary-row"><span>Origin</span><strong>{{ specimen.origin }}</strong></div>
            <div class="summary-row"><span>Collected By</span><strong>{{ specimen.collectedBy }}</strong></div>
            <div class="summary-row"><span>Collection Date</span><strong>{{ specimen.collectionDate }}</strong></div>
            <div class="summary-row"><span>Location</span><strong>{{ specimen.location }}</strong></div>
            <div class="summary-row"><span>Repository</span><strong>{{ specimen.repository }}</strong></div>
          </div>

          <div class="action-row">
            <button class="primary-btn" @click="downloadDataSheet">Download Data Sheet</button>
            <button class="secondary-btn" @click="citeSpecimen">{{ citeLabel }}</button>
          </div>

          <div class="side-card">
            <h3>Classification</h3>
            <div class="detail-grid">
              <div v-for="[label, value] in specimen.classification" :key="label" class="detail-row">
                <span>{{ label }}</span>
                <strong>{{ value }}</strong>
              </div>
            </div>
          </div>

          <div class="side-card">
            <h3>Provenance</h3>
            <div class="detail-grid">
              <div v-for="[label, value] in specimen.provenance" :key="label" class="detail-row">
                <span>{{ label }}</span>
                <strong>{{ value }}</strong>
              </div>
            </div>
            <div class="map-placeholder">Map Placeholder</div>
          </div>

          <div class="side-card">
            <h3>Additional Information</h3>
            <div class="detail-grid">
              <div v-for="[label, value] in specimen.additionalInformation" :key="label" class="detail-row">
                <span>{{ label }}</span>
                <strong>{{ value }}</strong>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section class="related-section">
        <div class="section-head">
          <h2>Related Specimens</h2>
          <a href="#" @click.prevent="$emit('back-to-specimens')">View All</a>
        </div>
        <div class="related-grid">
          <button
            v-for="related in specimen.related"
            :key="related.id"
            class="related-card"
            @click="$emit('open-specimen', related.id)"
          >
            <img :src="related.img" :alt="related.name" />
            <span class="related-badge">{{ related.category }}</span>
            <strong>{{ related.name }}</strong>
            <small>{{ related.id }}</small>
          </button>
        </div>
      </section>
    </div>
  </div>

  <div v-else class="detail-empty">
    <p>Specimen not found.</p>
    <button class="primary-btn" @click="$emit('back-to-specimens')">Back to specimens</button>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import ImageLightbox from './components/ImageLightbox.vue'
import { getSpecimenDetail } from './data/specimens'

export default {
  name: 'SpecimenDetail',
  components: { AppNavbar, ImageLightbox },
  props: {
    specimenId: {
      type: String,
      required: true,
    },
  },
  emits: ['go-home', 'go-about', 'go-research', 'go-contact', 'back-to-specimens', 'open-specimen'],
  data() {
    return {
      activeImageIndex: 0,
      lightboxImage: null,
      currentTab: 'Overview',
      tabs: ['Overview', 'Properties', 'Composition', 'Gallery', 'References'],
    }
  },
  computed: {
    specimen() {
      return getSpecimenDetail(this.specimenId)
    },
    activeImage() {
      return this.specimen?.heroImages[this.activeImageIndex] ?? null
    },
  },
  watch: {
    specimenId() {
      this.activeImageIndex = 0
      this.currentTab = 'Overview'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
  methods: {
    stepImage(step) {
      if (!this.specimen) return
      const total = this.specimen.heroImages.length
      this.activeImageIndex = (this.activeImageIndex + step + total) % total
    },
    onBreadcrumbClick(index) {
      if (index === 0) this.$emit('go-home')
      else this.$emit('back-to-specimens')
    },
    openImagePreview(src, alt) {
      this.lightboxImage = { src, alt }
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap');

.detail-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(var(--color-primary-rgb), 0.16), transparent 26%),
    radial-gradient(circle at top left, rgba(var(--color-secondary-rgb), 0.12), transparent 22%),
    linear-gradient(180deg, #fbfcfa 0%, #f4f0e8 100%);
  color: #253043;
  font-family: 'PT Serif', serif;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 8px 24px rgba(var(--color-accent-rgb), 0.24);
}

.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 28px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-name {
  font-family: 'PT Serif', serif;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #fff;
  line-height: 1;
}

.logo-sub {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.78);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2px;
  margin: 0;
  padding: 0;
  flex: 1;
  justify-content: center;
}

.nav-links li a {
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 4px;
  transition: color 0.2s;
}

.nav-links li a.active {
  color: #fff;
  border-bottom: 2px solid #fff;
}

.nav-links li a:hover {
  color: #fff;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.search-box {
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
}

.search-box input {
  width: 200px;
  border: none;
  outline: none;
  padding: 6px 14px;
  font-size: 0.8rem;
  background: transparent;
  color: #fff;
}

.search-box button {
  border: none;
  background: transparent;
  padding: 6px 12px;
  cursor: pointer;
  color: #fff;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  color: #fff;
}

.detail-shell {
  width: min(1160px, calc(100% - 56px));
  margin: 0 auto;
  padding: 18px 0 34px;
}

.page-breadcrumb {
  margin-bottom: 14px;
}

.hero-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.48fr) minmax(280px, 0.82fr);
  gap: 18px;
  margin-top: 14px;
}

.gallery-panel,
.summary-panel,
.content-card,
.side-card {
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 12px 32px rgba(var(--color-primary-rgb), 0.06);
  backdrop-filter: blur(12px);
}

.gallery-panel {
  padding: 0;
  border-radius: 18px;
  overflow: hidden;
}

.hero-image-frame {
  position: relative;
  min-height: 360px;
  background: linear-gradient(180deg, var(--color-accent) 0%, #27281b 100%);
}

.hero-image-frame img {
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
  display: block;
}

.preview-image {
  cursor: zoom-in;
}

.image-count {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(var(--color-primary-rgb), 0.9);
  color: #fff;
  font-weight: 700;
  font-size: 0.76rem;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  z-index: 1;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  font-size: 1.45rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
}

.gallery-nav.prev {
  left: 12px;
}

.gallery-nav.next {
  right: 12px;
}

.thumb-row {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 6px;
  padding: 10px 12px;
  background: #fff;
}

.thumb {
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 0;
  overflow: hidden;
  background: rgba(var(--color-primary-rgb), 0.08);
}

.thumb.active {
  border-color: var(--color-primary);
}

.thumb img {
  width: 100%;
  aspect-ratio: 1.15;
  object-fit: cover;
  display: block;
}

.tab-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 12px 12px;
  background: #fff;
}

.tab-btn {
  border-radius: 999px;
  padding: 7px 12px;
  background: rgba(var(--color-primary-rgb), 0.08);
  color: #586274;
  font-weight: 600;
  font-size: 0.82rem;
}

.tab-btn.active {
  background: var(--color-primary);
  color: #fff;
}

.content-card {
  margin: 0 12px 12px;
  border-radius: 16px;
  padding: 16px;
}

.content-card h3,
.side-card h3,
.section-head h2 {
  margin: 0 0 10px;
  font-family: 'PT Serif', serif;
  font-size: 1.14rem;
}

.content-card p {
  margin: 0 0 14px;
  color: #5f6777;
  line-height: 1.55;
  font-size: 0.86rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}

.tag {
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(var(--color-primary-rgb), 0.08);
  color: #4f5a70;
  font-weight: 600;
  font-size: 0.8rem;
}

.composition-grid,
.gallery-grid,
.related-grid {
  display: grid;
  gap: 10px;
}

.composition-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.composition-card,
.gallery-card,
.related-card {
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
  border-radius: 14px;
  background: #fff;
  overflow: hidden;
  text-align: left;
  padding: 0;
}

.composition-card img,
.gallery-card img,
.related-card img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.composition-card img {
  aspect-ratio: 1.25;
}

.composition-card strong,
.composition-card span,
.gallery-card span,
.related-card strong,
.related-card small,
.related-badge {
  display: block;
  padding-inline: 12px;
}

.composition-card strong,
.gallery-card span,
.related-card strong {
  padding-top: 10px;
  font-size: 0.92rem;
}

.composition-card span,
.related-card small {
  padding-bottom: 12px;
  color: #71798a;
  font-size: 0.8rem;
}

.cross-section-card {
  display: grid;
  grid-template-columns: 1.25fr 0.9fr;
  gap: 12px;
  margin-top: 18px;
  align-items: center;
}

.cross-section-card img {
  width: 100%;
  border-radius: 14px;
  min-height: 180px;
  object-fit: cover;
}

.summary-panel {
  border-radius: 18px;
  padding: 18px;
  align-self: start;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 5px 8px;
  border-radius: 7px;
  background: var(--color-primary);
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.72rem;
}

.summary-panel h1 {
  margin: 10px 0 6px;
  font-family: 'PT Serif', serif;
  font-size: clamp(1.8rem, 3.4vw, 2.8rem);
  line-height: 0.95;
}

.meta-line {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.1);
  color: #677082;
  font-size: 0.8rem;
}

.verified {
  color: var(--color-primary);
  font-weight: 700;
}

.summary-list,
.detail-grid {
  display: grid;
  gap: 10px;
}

.summary-list {
  padding: 14px 0;
}

.summary-row,
.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: start;
}

.summary-row span,
.detail-row span {
  color: #727a8b;
  font-size: 0.82rem;
}

.summary-row strong,
.detail-row strong {
  text-align: right;
  font-size: 0.86rem;
}

.action-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.primary-btn,
.secondary-btn {
  min-height: 38px;
  border-radius: 10px;
  padding: 8px 12px;
  font-weight: 700;
  font-size: 0.8rem;
}

.primary-btn {
  background: var(--color-primary);
  color: #fff;
}

.secondary-btn {
  border: 1px solid rgba(var(--color-primary-rgb), 0.12);
  background: #fff;
  color: #334155;
}

.side-card {
  margin-top: 12px;
  border-radius: 16px;
  padding: 14px;
}

.map-placeholder {
  margin-top: 12px;
  min-height: 96px;
  border-radius: 12px;
  background:
    linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.12), rgba(var(--color-primary-rgb), 0.03)),
    repeating-linear-gradient(45deg, rgba(var(--color-primary-rgb), 0.08) 0 16px, rgba(255, 255, 255, 0.4) 16px 32px);
  display: grid;
  place-items: center;
  color: var(--color-accent);
  font-weight: 700;
  font-size: 0.8rem;
}

.gallery-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.gallery-card span {
  padding-bottom: 12px;
  font-size: 0.8rem;
}

.reference-list {
  margin: 0;
  padding-left: 20px;
  color: #5f6777;
  line-height: 1.6;
  font-size: 0.84rem;
}

.related-section {
  margin-top: 18px;
  border-radius: 18px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
  box-shadow: 0 12px 32px rgba(var(--color-primary-rgb), 0.06);
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.section-head a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.82rem;
}

.related-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.related-card {
  padding-bottom: 12px;
}

.related-card img {
  aspect-ratio: 1.15;
}

.related-badge {
  padding-top: 10px;
  color: var(--color-primary);
  font-size: 0.68rem;
  font-weight: 700;
}

.detail-empty {
  min-height: 100vh;
  display: grid;
  place-items: center;
  gap: 16px;
  background: #f5f4ef;
}

@media (max-width: 1100px) {
  .nav-links,
  .nav-right {
    display: none;
  }

  .hero-layout {
    grid-template-columns: 1fr;
  }

  .summary-panel {
    order: -1;
  }

  .related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .detail-shell,
  .nav-inner {
    width: min(100% - 18px, 1160px);
  }

  .hero-image-frame,
  .hero-image-frame img {
    min-height: 240px;
  }

  .thumb-row,
  .composition-grid,
  .gallery-grid,
  .related-grid,
  .action-row,
  .cross-section-card {
    grid-template-columns: 1fr;
  }

  .tab-row {
    overflow-x: auto;
    flex-wrap: nowrap;
  }

  .content-card,
  .summary-panel,
  .related-section {
    padding: 14px;
    margin-inline: 0;
  }

  .gallery-panel {
    padding-bottom: 18px;
  }

  .summary-row,
  .detail-row {
    flex-direction: column;
  }

  .summary-row strong,
  .detail-row strong {
    text-align: left;
  }
}
</style>
