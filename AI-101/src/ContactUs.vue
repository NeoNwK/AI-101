<template>
  <div class="contact-page">
    <AppNavbar
      active-page="contact"
      search-placeholder="Search specimens, minerals, fossils..."
      @go-home="$emit('go-home')"
      @go-browse="$emit('go-browse')"
      @go-research="$emit('go-research')"
      @go-about="$emit('go-about')"
      @go-contact="scrollToTop"
    />

    <section class="contact-hero">
      <div class="contact-hero__image"></div>
      <div class="contact-hero__overlay"></div>
      <div class="contact-hero__inner">
        <div class="contact-hero__content">
          <p class="contact-eyebrow">Paleo Research Group</p>
          <h1>Contact Us</h1>
          <p>
            Connect with our researchers, visit our facilities, or collaborate on future discoveries and educational projects.
          </p>
        </div>
      </div>
    </section>

    <main class="contact-shell">
      <section class="contact-panel contact-grid">
        <article class="info-card">
          <div class="section-heading">
            <span></span>
            <h2>Contact Information</h2>
          </div>

          <div class="info-list">
            <article v-for="item in contactDetails" :key="item.title" class="info-item">
              <div class="info-icon">{{ item.icon }}</div>
              <div>
                <h3>{{ item.title }}</h3>
                <p v-for="line in item.lines" :key="line">{{ line }}</p>
              </div>
            </article>
          </div>

          <div class="info-actions">
            <a class="button-primary" href="https://maps.google.com/?q=Faculty+of+Science+Kasetsart+University+Bangkhen" target="_blank" rel="noreferrer">
              Get Directions
            </a>
            <a class="button-secondary" href="mailto:info@paleoresearchgroup.org">Email Our Team</a>
          </div>
        </article>

        <article class="map-card">
          <iframe
            title="Paleo Research Group map"
            src="https://www.google.com/maps?q=Faculty%20of%20Science%20Kasetsart%20University%20Bangkhen&z=15&output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </article>
      </section>

      <section class="contact-panel inquiry-grid">
        <article class="message-card">
          <div class="section-heading">
            <span></span>
            <h2>Send Us A Message</h2>
          </div>

          <form class="contact-form" @submit.prevent>
            <div class="form-row">
              <input type="text" placeholder="Full Name *" />
              <input type="email" placeholder="Email Address *" />
            </div>
            <input type="text" placeholder="Organization / Institution" />
            <select>
              <option selected disabled>Subject *</option>
              <option>Research collaboration</option>
              <option>Student opportunities</option>
              <option>Publication and media</option>
              <option>General inquiry</option>
            </select>
            <textarea rows="6" placeholder="Message *"></textarea>

            <label class="policy-check">
              <input type="checkbox" />
              <span>I agree to the privacy policy.</span>
            </label>

            <button type="submit" class="button-primary button-primary--full">Send Message</button>
          </form>
        </article>

        <article class="inquiry-card">
          <div class="section-heading">
            <span></span>
            <h2>Research Inquiries</h2>
          </div>

          <div class="inquiry-list">
            <article v-for="item in inquiryCards" :key="item.title" class="inquiry-item">
              <div class="inquiry-item__icon">{{ item.icon }}</div>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
                <a :href="`mailto:${item.email}`">{{ item.email }}</a>
              </div>
            </article>
          </div>
        </article>
      </section>

      <section class="visit-section">
        <div class="section-heading">
          <span></span>
          <h2>Visit Our Facility</h2>
        </div>

        <div class="visit-grid">
          <article v-for="item in visitGallery" :key="item.title" class="visit-card">
            <div class="visit-card__image" :style="{ backgroundImage: `url(${item.image})` }"></div>
            <div class="visit-card__copy">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </article>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="footer-logo__icon">◔</div>
            <div>
              <strong>PALEO RESEARCH GROUP</strong>
              <span>Educational Database</span>
            </div>
          </div>
          <p>
            Advancing the understanding of ancient life through research, discovery, and collaboration.
          </p>
        </div>

        <div class="footer-links">
          <div class="footer-column">
            <h3>Explore</h3>
            <a href="#" @click.prevent="$emit('go-research')">Research</a>
            <a href="#" @click.prevent="$emit('go-browse')">Projects</a>
            <a href="#" @click.prevent="$emit('go-research')">Publications</a>
            <a href="#" @click.prevent="$emit('go-about')">About</a>
          </div>
          <div class="footer-column">
            <h3>About</h3>
            <a href="#" @click.prevent="$emit('go-about')">Mission</a>
            <a href="#" @click.prevent="$emit('go-about')">Team</a>
            <a href="#" @click.prevent="$emit('go-home')">News</a>
          </div>
          <div class="footer-column">
            <h3>Resources</h3>
            <a href="#" @click.prevent="$emit('go-browse')">Specimen Database</a>
            <a href="#" @click.prevent="$emit('go-research')">Fieldwork Opportunities</a>
            <a href="#" @click.prevent="$emit('go-home')">FAQ</a>
          </div>
          <div class="footer-column">
            <h3>Contact</h3>
            <p>Faculty of Science, Kasetsart University</p>
            <p>Bang Khen, Bangkok 10900, Thailand</p>
            <p>+66 123 456 789</p>
            <p>info@paleoresearchgroup.org</p>
          </div>
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

export default {
  name: 'ContactUs',
  components: { AppNavbar },
  emits: ['go-home', 'go-browse', 'go-research', 'go-about'],
  data() {
    return {
      contactDetails: [
        {
          icon: '⌂',
          title: 'Address',
          lines: ['Faculty of Science, Kasetsart University', 'Bang Khen Campus, Chatuchak', 'Bangkok 10900, Thailand'],
        },
        {
          icon: '✆',
          title: 'Phone',
          lines: ['+66 123 456 789'],
        },
        {
          icon: '✉',
          title: 'Email',
          lines: ['info@paleoresearchgroup.org'],
        },
        {
          icon: '◷',
          title: 'Office Hours',
          lines: ['Monday - Friday', '08:30 - 17:00 (ICT)'],
        },
      ],
      inquiryCards: [
        {
          icon: '◌',
          title: 'Research Collaboration',
          text: 'For collaboration, partnerships, and joint research programs.',
          email: 'research@paleoresearchgroup.org',
        },
        {
          icon: '△',
          title: 'Student Opportunities',
          text: 'For internships, graduate programs, and student activities.',
          email: 'students@paleoresearchgroup.org',
        },
        {
          icon: '□',
          title: 'Publications & Media',
          text: 'For publication requests, press, and media inquiries.',
          email: 'publications@paleoresearchgroup.org',
        },
        {
          icon: '➤',
          title: 'General Inquiries',
          text: 'For general questions and other information.',
          email: 'info@paleoresearchgroup.org',
        },
      ],
      visitGallery: [
        {
          title: 'Research Center',
          text: 'Our main research and administration building.',
          image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
        },
        {
          title: 'Laboratories',
          text: 'State-of-the-art laboratories for specimen preparation and analysis.',
          image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
        },
        {
          title: 'Paleo Museum',
          text: 'Exhibitions and fossil collections for public education.',
          image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=1200&q=80',
        },
        {
          title: 'Field Research',
          text: 'Our team conducts fieldwork across Thailand and beyond.',
          image: 'https://images.unsplash.com/photo-1463694775559-eea25626346b?auto=format&fit=crop&w=1200&q=80',
        },
      ],
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap');

.contact-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(var(--color-primary-rgb), 0.16), transparent 24%),
    radial-gradient(circle at top left, rgba(var(--color-secondary-rgb), 0.14), transparent 26%),
    linear-gradient(180deg, #faf7f0 0%, #f1eadf 100%);
  color: #243042;
}

.contact-shell {
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
  padding: 28px 0 48px;
}

.contact-hero {
  position: relative;
  min-height: 430px;
  overflow: hidden;
  width: 100%;
  border-radius: 0;
  box-shadow: 0 28px 60px rgba(var(--color-accent-rgb), 0.18);
}

.contact-hero__image,
.contact-hero__overlay {
  position: absolute;
  inset: 0;
}

.contact-hero__image {
  background:
    linear-gradient(180deg, rgba(18, 24, 33, 0.18), rgba(18, 24, 33, 0.42)),
    url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80') center / cover;
  transform: scale(1.02);
}

.contact-hero__overlay {
  background:
    linear-gradient(90deg, rgba(18, 24, 33, 0.84) 0%, rgba(18, 24, 33, 0.5) 36%, rgba(18, 24, 33, 0.12) 68%);
}

.contact-hero__content {
  position: relative;
  z-index: 1;
}

.contact-hero__inner {
  position: relative;
  z-index: 1;
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
  padding: 112px 0 56px;
}

.contact-hero__content {
  width: min(620px, 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  color: #fff;
}

.contact-eyebrow,
.section-heading span {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-family: 'Manrope', sans-serif;
  font-size: 0.72rem;
}

.contact-eyebrow {
  margin-bottom: 16px;
  color: rgba(255, 244, 224, 0.8);
}

.contact-hero__content h1,
.section-heading h2,
.info-item h3,
.campus-list__item h3,
.visit-card__copy h3,
.inquiry-item h3 {
  font-family: 'Cormorant Garamond', serif;
}

.contact-hero__content h1 {
  margin: 0;
  font-size: clamp(3.2rem, 6vw, 4.8rem);
  line-height: 0.94;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.contact-hero__content p:last-child {
  max-width: 28rem;
  margin: 18px 0 0;
  font-family: 'Manrope', sans-serif;
  font-size: 1.08rem;
  line-height: 1.85;
  color: rgba(255, 255, 255, 0.86);
}

.contact-panel {
  margin-top: 28px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.08);
  border-radius: 28px;
  background: rgba(255, 252, 247, 0.88);
  box-shadow: 0 18px 42px rgba(var(--color-accent-rgb), 0.08);
}

.contact-grid,
.inquiry-grid {
  display: grid;
  gap: 24px;
  padding: 24px;
}

.contact-grid {
  grid-template-columns: 360px minmax(0, 1fr);
}

.inquiry-grid {
  grid-template-columns: minmax(0, 1fr) 0.98fr;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.section-heading span {
  width: 44px;
  height: 2px;
  font-size: 0;
  letter-spacing: normal;
  background: var(--color-secondary);
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 0.95;
  color: #1f2937;
}

.section-heading--light h2 {
  color: #fff;
}

.info-card,
.message-card,
.inquiry-card {
  padding: 12px 8px 8px;
}

.info-list {
  display: grid;
  gap: 18px;
}

.info-item {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 16px;
  align-items: start;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(var(--color-secondary-rgb), 0.95), rgba(var(--color-accent-rgb), 0.9));
  color: #fffaf2;
  font-size: 1.2rem;
  box-shadow: 0 10px 18px rgba(var(--color-accent-rgb), 0.16);
}

.info-item h3,
.campus-list__item h3,
.visit-card__copy h3,
.inquiry-item h3 {
  margin: 0 0 8px;
  font-size: 1.55rem;
  line-height: 1;
}

.info-item p,
.campus-list__item p,
.visit-card__copy p,
.inquiry-item p,
.contact-campus__content > p,
.footer-brand p,
.footer-column p,
.footer-column a {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: 0.98rem;
  line-height: 1.8;
  color: #5f6677;
}

.info-actions {
  display: grid;
  gap: 12px;
  margin-top: 26px;
}

.button-primary,
.button-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 18px;
  border-radius: 12px;
  text-decoration: none;
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.button-primary {
  background: linear-gradient(135deg, var(--color-secondary) 0%, #a98c54 100%);
  color: #fffaf2;
  box-shadow: 0 16px 26px rgba(var(--color-secondary-rgb), 0.24);
}

.button-secondary {
  border: 1px solid rgba(var(--color-primary-rgb), 0.16);
  background: #fff;
  color: var(--color-primary);
}

.button-primary:hover,
.button-secondary:hover {
  transform: translateY(-1px);
}

.map-card {
  overflow: hidden;
  border-radius: 22px;
  min-height: 420px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.08);
  background: #f3efe8;
}

.map-card iframe {
  width: 100%;
  height: 100%;
  min-height: 420px;
  border: 0;
}

.contact-form {
  display: grid;
  gap: 14px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.contact-form input,
.contact-form select,
.contact-form textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.12);
  border-radius: 14px;
  background: #fff;
  color: #253246;
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
}

.contact-form textarea {
  resize: vertical;
  min-height: 160px;
}

.policy-check {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Manrope', sans-serif;
  font-size: 0.92rem;
  color: #5f6677;
}

.policy-check input {
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary);
}

.button-primary--full {
  width: 100%;
}

.inquiry-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.inquiry-item {
  padding: 20px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(249, 244, 236, 0.92));
}

.inquiry-item__icon {
  margin-bottom: 14px;
  color: var(--color-secondary);
  font-size: 1.7rem;
}

.inquiry-item a {
  display: inline-block;
  margin-top: 10px;
  font-family: 'Manrope', sans-serif;
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--color-primary);
  text-decoration: none;
}

.visit-section {
  margin-top: 30px;
}

.visit-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.visit-card {
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.08);
  background: rgba(255, 252, 247, 0.92);
  box-shadow: 0 14px 28px rgba(var(--color-accent-rgb), 0.06);
}

.visit-card__image {
  min-height: 190px;
  background-position: center;
  background-size: cover;
}

.visit-card__copy {
  padding: 16px 16px 18px;
}

.footer {
  margin-top: 8px;
  background: linear-gradient(180deg, rgba(17, 21, 27, 0.98), rgba(20, 23, 29, 1));
  color: #fff;
}

.footer-inner,
.footer-bottom {
  width: min(1400px, calc(100% - 48px));
  margin: 0 auto;
}

.footer-inner {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 36px;
  padding: 34px 0 28px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}

.footer-logo__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(var(--color-secondary-rgb), 0.18);
  color: var(--color-secondary);
}

.footer-logo strong,
.footer-column h3 {
  display: block;
  font-family: 'Cormorant Garamond', serif;
}

.footer-logo strong {
  font-size: 1.28rem;
}

.footer-logo span {
  font-family: 'Manrope', sans-serif;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.62);
}

.footer-brand p,
.footer-column p,
.footer-column a {
  color: rgba(255, 255, 255, 0.72);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.footer-column h3 {
  margin: 0 0 12px;
  font-size: 1.25rem;
  color: #fff;
}

.footer-column a {
  display: block;
  text-decoration: none;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 0 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-family: 'Manrope', sans-serif;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.56);
}

.footer-bottom a {
  margin-left: 18px;
  color: inherit;
  text-decoration: none;
}

@media (max-width: 1100px) {
  .contact-grid,
  .inquiry-grid,
  .footer-inner {
    grid-template-columns: 1fr;
  }

  .visit-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .contact-shell,
  .footer-inner,
  .footer-bottom {
    width: min(100% - 32px, 1280px);
  }

  .contact-hero__content {
    width: min(620px, 100%);
  }

  .contact-hero__inner {
    width: min(100% - 32px, 1280px);
    padding: 88px 0 40px;
  }

  .form-row,
  .inquiry-list,
  .visit-grid {
    grid-template-columns: 1fr;
  }

  .contact-grid,
  .inquiry-grid {
    padding: 18px;
  }

  .footer-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-bottom a:first-child {
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .contact-hero {
    min-height: 400px;
  }

  .contact-hero__content h1 {
    font-size: clamp(3rem, 14vw, 4.2rem);
  }

  .campus-list__item,
  .info-item {
    grid-template-columns: 1fr;
  }

  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>
