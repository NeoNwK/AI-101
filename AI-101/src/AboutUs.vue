<template>
  <div class="about-page">
    <AppNavbar
      active-page="about"
      search-placeholder="Search specimens, minerals, fossils..."
      @go-home="$emit('go-home')"
      @go-browse="$emit('go-browse')"
      @go-research="$emit('go-research')"
      @go-contact="$emit('go-contact')"
      @go-about="scrollToTop"
    />

    <main class="about-shell">
      <section class="hero-section">
        <div class="hero-copy">
          <h1>About <span>Us</span></h1>
          <h2>Knowledge for Education. Shared for All.</h2>
          <p>
            Paleo Research Group is an educational platform dedicated to collecting, organizing, and sharing geological,
            paleontological, mineral, and gemstone specimens for learning and academic purposes.
          </p>
        </div>

        <div class="hero-visual">
          <div class="hero-visual__topography"></div>
          <div class="hero-visual__landscape"></div>
          <div class="hero-visual__ground"></div>
          <div class="crystal crystal-left"></div>
          <div class="crystal crystal-center"></div>
          <div class="crystal crystal-right"></div>
        </div>
      </section>

      <section class="highlight-panel">
        <div class="panel-badge">🎓</div>
        <div class="panel-copy">
          <h3>This website is a non-profit educational resource. We do not seek any financial gain.</h3>
          <p>
            Our sole purpose is to support education, research, and the dissemination of knowledge to students,
            educators, and anyone with a passion for the Earth's natural history.
          </p>
        </div>
        <div class="panel-illustration">🌍</div>
      </section>

      <section class="story-grid">
        <article class="story-image story-image--mountains"></article>
        <article class="story-card">
          <div class="story-icon">⛰</div>
          <div>
            <h3>Our Background</h3>
            <p>
              Paleo Research Group was initiated by a group of educators and students from the Department of Geology who recognized
              the need for a centralized, accessible platform to document and share specimen information.
            </p>
            <p>
              We believe that high-quality geological data should be open to everyone for learning and research.
            </p>
          </div>
        </article>

        <article class="story-image story-image--mineral"></article>
        <article class="story-card">
          <div class="story-icon">◎</div>
          <div>
            <h3>Our Goals</h3>
            <ul class="goals-list">
              <li>To reconstruct the paleoenvironment through the study of stratigraphy.</li>
              <li>To study paleoclimate changes through geochemical analysis.</li>
              <li>To study paleobiodiversity through the study of fossils.</li>
              <li>To evaluate the management of related natural resources, such as petroleum or fossils.</li>
            </ul>
          </div>
        </article>

        <article class="story-image story-image--notebook"></article>
        <article class="story-card">
          <div class="story-icon">❤</div>
          <div>
            <h3>Student-inclusive Research Projects</h3>
            <ul class="research-projects-list">
              <li>Paleoenvironmental Reconstruction</li>
              <li>Study of Paleobiodiversity of Vertebrate Fossils</li>
              <li>Reservoir Evaluation</li>
              <li>Geochemical Analysis in Sedimentary Rocks</li>
              <li>Study of Stratigraphy Based on Rock Characteristics (Lithostratigraphy)</li>
              <li>Study of Paleobiodiversity of Invertebrate Fossils</li>
              <li>Photo Interpretation for Land Use Assessment</li>
              <li>Study of Geochemical Components to Indicate Heavy Metal Content in Sediments</li>
              <li>Study of Biodiversity</li>
              <li>Study of Biodiversity of Foraminifera and Ostracods</li>
            </ul>
          </div>
        </article>
      </section>

      <section class="team-section">
        <div class="team-title">
          <span></span>
          <h2>Our Team</h2>
          <span></span>
        </div>

        <div class="team-group">
          <p class="team-label">Advisors (Faculty)</p>
          <div class="team-grid team-grid--advisors">
            <article v-for="member in advisors" :key="member.name" class="member-card">
              <div class="member-avatar" :style="{ background: member.avatar }">{{ member.initials }}</div>
              <div class="member-copy">
                <h3>{{ member.name }}</h3>
                <p class="member-role">{{ member.role }}</p>
                <p class="member-meta">{{ member.meta }}</p>
              </div>
            </article>
          </div>
        </div>

        <div class="team-group">
          <p class="team-label">Student Members</p>
          <div class="team-grid team-grid--students">
            <article v-for="member in students" :key="member.name" class="member-card member-card--compact">
              <div class="member-avatar" :style="{ background: member.avatar }">{{ member.initials }}</div>
              <div class="member-copy">
                <h3>{{ member.name }}</h3>
                <p class="member-role">{{ member.role }}</p>
                <p class="member-meta">{{ member.meta }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="support-strip">
        <div class="support-note">
          <div class="support-icon">🛡</div>
          <p>
            We would like to thank all institutions and individuals who contribute to the collection of data,
            specimens, and knowledge.
          </p>
        </div>
        <div class="support-grid">
          <article v-for="partner in partners" :key="partner.name" class="support-item">
            <div class="support-mark">{{ partner.mark }}</div>
            <p>{{ partner.name }}</p>
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
  name: 'AboutUs',
  components: { AppNavbar },
  emits: ['go-home', 'go-browse', 'go-research', 'go-contact'],
  data() {
    return {
      advisors: [
        {
          initials: 'KD',
          name: 'ผศ.ดร.ฉัตรเฉลิม เกษเวชสุริยา (อ.เคนโด้)',
          role: 'Faculty Research Member',
          meta: 'ความเชี่ยวชาญ: บรรพชีวินวิทยา ตะกอนวิทยา สัตว์ไม่มีกระดูกสันหลัง',
          avatar: 'linear-gradient(135deg, #d9dde7 0%, #3d4b64 100%)',
        },
        {
          initials: 'TY',
          name: 'ดร.ชวิศา ภู่เจริญชัยวรรณ (อ.เตย)',
          role: 'Faculty Research Member',
          meta: 'ความเชี่ยวชาญ: ตะกอนวิทยา ลำดับชั้นหิน',
          avatar: 'linear-gradient(135deg, #f3d1c8 0%, #916857 100%)',
        },
        {
          initials: 'JB',
          name: 'อ.วงศ์เวชช เชาวน์ชูเวชช (อ.จ๊อบ)',
          role: 'Faculty Research Member',
          meta: 'ความเชี่ยวชาญ: บรรพชีวินวิทยา สัตว์มีกระดูกสันหลัง',
          avatar: 'linear-gradient(135deg, #efe2da 0%, #967b67 100%)',
        },
      ],
      students: [
        {
          initials: 'TS',
          name: 'Thanakorn S.',
          role: 'Project Lead',
          meta: 'Geology',
          avatar: 'linear-gradient(135deg, #e4d9b8 0%, #515031 100%)',
        },
        {
          initials: 'PL',
          name: 'Patcharapa L.',
          role: 'Database Developer',
          meta: 'Computer Science',
          avatar: 'linear-gradient(135deg, #f2d7cd 0%, #8e685f 100%)',
        },
        {
          initials: 'WM',
          name: 'Worawit M.',
          role: 'Data Curator',
          meta: 'Geology',
          avatar: 'linear-gradient(135deg, #e2d6c4 0%, #7e694c 100%)',
        },
        {
          initials: 'KT',
          name: 'Kanokwan T.',
          role: 'UI/UX Designer',
          meta: 'Information Technology',
          avatar: 'linear-gradient(135deg, #f1ddd4 0%, #956f62 100%)',
        },
        {
          initials: 'CC',
          name: 'Chayut C.',
          role: 'Content Editor',
          meta: 'Geology',
          avatar: 'linear-gradient(135deg, #d9dde7 0%, #515031 100%)',
        },
        {
          initials: 'NK',
          name: 'Natchaya K.',
          role: 'Image Specialist',
          meta: 'Geology',
          avatar: 'linear-gradient(135deg, #f0d8cf 0%, #8f6f60 100%)',
        },
      ],
      partners: [
        { mark: '⚒', name: 'Department of Geology xxxxxxx University' },
        { mark: '◎', name: 'Geological Society of Thailand' },
        { mark: '⬢', name: 'National Science Museum Thailand' },
        { mark: '👥', name: 'Many Contributors and Volunteers' },
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

.about-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(var(--color-primary-rgb), 0.16), transparent 20%),
    radial-gradient(circle at top left, rgba(var(--color-secondary-rgb), 0.14), transparent 24%),
    linear-gradient(180deg, #faf7f0 0%, #f3ede1 100%);
  color: #243042;
}

.about-shell {
  width: min(1400px, calc(100% - 48px));
  margin: 0 auto;
  padding: 0 0 40px;
}

.hero-section {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(420px, 1.15fr);
  gap: 18px;
  align-items: stretch;
  padding-top: 30px;
}

.hero-copy {
  padding: 64px 0 20px 12px;
}

.hero-copy h1,
.hero-copy h2,
.story-card h3,
.team-title h2,
.panel-copy h3 {
  font-family: 'Cormorant Garamond', serif;
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(4.1rem, 9vw, 6.6rem);
  line-height: 0.88;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: #202836;
}

.hero-copy h1 span {
  color: var(--color-primary);
}

.hero-copy h2 {
  margin: 22px 0 18px;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  line-height: 1.05;
  font-weight: 600;
  color: var(--color-accent);
}

.hero-copy p {
  max-width: 33rem;
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: 1.05rem;
  line-height: 1.9;
  color: #5f6677;
}

.hero-visual {
  position: relative;
  min-height: 520px;
  overflow: hidden;
  border-radius: 0 0 26px 26px;
  background: linear-gradient(135deg, rgba(var(--color-secondary-rgb), 0.8) 0%, rgba(var(--color-primary-rgb), 0.72) 44%, rgba(var(--color-accent-rgb), 0.92) 100%);
  box-shadow: 0 28px 50px rgba(var(--color-accent-rgb), 0.18);
}

.hero-visual__landscape {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.32)),
    url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80') center / cover;
}

.hero-visual__topography {
  position: absolute;
  inset: -18% 34% 12% -8%;
  border-radius: 50%;
  background:
    radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.12), transparent 32%),
    repeating-radial-gradient(circle at 58% 42%, rgba(255, 255, 255, 0.14) 0 2px, transparent 2px 24px),
    linear-gradient(180deg, rgba(var(--color-secondary-rgb), 0.72), rgba(var(--color-primary-rgb), 0.82));
  opacity: 0.96;
}

.hero-visual__ground {
  position: absolute;
  inset: auto 0 0;
  height: 96px;
  background: linear-gradient(180deg, rgba(49, 39, 28, 0), rgba(49, 39, 28, 0.62));
}

.crystal {
  position: absolute;
  bottom: 18px;
  filter: drop-shadow(0 24px 24px rgba(27, 21, 13, 0.28));
}

.crystal::before,
.crystal::after {
  content: '';
  position: absolute;
}

.crystal-left {
  left: 17%;
  width: 260px;
  height: 220px;
  border-radius: 42% 58% 32% 35% / 40% 46% 34% 36%;
  background:
    radial-gradient(circle at 36% 38%, rgba(255, 255, 255, 0.34), transparent 18%),
    linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.98), rgba(var(--color-primary-rgb), 0.95) 55%, rgba(var(--color-secondary-rgb), 0.9));
  border: 6px solid rgba(85, 63, 34, 0.48);
}

.crystal-left::before {
  inset: 18px;
  background:
    linear-gradient(60deg, rgba(255, 255, 255, 0.14) 25%, transparent 25% 50%, rgba(255, 255, 255, 0.14) 50% 75%, transparent 75%),
    radial-gradient(circle at 55% 42%, rgba(242, 255, 247, 0.95), rgba(0, 0, 0, 0) 8%);
  clip-path: polygon(12% 56%, 30% 18%, 56% 10%, 79% 30%, 87% 59%, 69% 84%, 36% 87%, 12% 72%);
  opacity: 0.85;
}

.crystal-center {
  right: 17%;
  width: 314px;
  height: 378px;
  border-radius: 44% 44% 22% 22% / 22% 22% 30% 30%;
  background:
    radial-gradient(circle at 48% 34%, rgba(25, 10, 47, 1) 0 24%, rgba(71, 25, 98, 1) 24% 41%, rgba(255, 247, 255, 0.92) 41% 53%, rgba(83, 58, 46, 0.98) 53% 100%);
  transform: rotate(8deg);
  border: 8px solid rgba(78, 57, 39, 0.7);
}

.crystal-center::before {
  inset: 14px 18px 48px 16px;
  background:
    linear-gradient(50deg, rgba(255, 255, 255, 0.12) 18%, transparent 18% 36%, rgba(255, 255, 255, 0.12) 36% 54%, transparent 54% 72%, rgba(255, 255, 255, 0.1) 72%),
    radial-gradient(circle at 45% 36%, rgba(58, 16, 79, 1) 0 18%, rgba(22, 7, 34, 1) 18% 43%, rgba(91, 36, 126, 0.94) 43% 55%, transparent 55%);
  clip-path: ellipse(42% 40% at 46% 34%);
}

.crystal-right {
  right: 3.5%;
  width: 155px;
  height: 164px;
}

.crystal-right::before,
.crystal-right::after {
  inset: auto;
  bottom: 0;
  width: 54px;
  height: 138px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(239, 223, 203, 0.84));
  clip-path: polygon(50% 0, 87% 18%, 78% 100%, 21% 100%, 11% 18%);
  border: 3px solid rgba(219, 203, 183, 0.85);
}

.crystal-right::before {
  left: 10px;
}

.crystal-right::after {
  right: 12px;
  height: 124px;
}

.highlight-panel,
.story-card,
.member-card,
.support-strip {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(var(--color-primary-rgb), 0.08);
  box-shadow: 0 18px 44px rgba(48, 54, 42, 0.08);
}

.highlight-panel {
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr) 140px;
  gap: 28px;
  align-items: center;
  margin-top: -30px;
  padding: 22px 26px;
  border-radius: 28px;
  position: relative;
  z-index: 2;
}

.panel-badge,
.story-icon,
.support-icon {
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: radial-gradient(circle at 30% 30%, var(--color-primary), var(--color-accent));
}

.panel-badge {
  width: 102px;
  height: 102px;
  font-size: 2.7rem;
}

.panel-copy h3 {
  margin: 0 0 10px;
  max-width: 24ch;
  font-size: clamp(2rem, 4vw, 2.9rem);
  line-height: 0.98;
  font-weight: 600;
  color: var(--color-primary);
}

.panel-copy p,
.story-card p,
.member-copy p,
.support-note p,
.support-item p,
.footer p,
.footer a {
  font-family: 'Manrope', sans-serif;
}

.panel-copy p {
  max-width: 52rem;
  margin: 0;
  font-size: 1rem;
  line-height: 1.8;
  color: #5f6677;
}

.panel-illustration {
  justify-self: end;
  color: rgba(var(--color-secondary-rgb), 0.88);
  font-size: 4.7rem;
  line-height: 1;
}

.story-grid {
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: 12px;
  margin-top: 18px;
}

.story-image,
.story-card {
  min-height: 188px;
  border-radius: 18px;
}

.story-image {
  overflow: hidden;
  background-color: #c7c2b5;
  background-size: cover;
  background-position: center;
}

.story-image--mountains {
  background-image:
    linear-gradient(180deg, rgba(16, 17, 16, 0.14), rgba(16, 17, 16, 0.28)),
    url('https://images.unsplash.com/photo-1464823063530-08f10ed1a2dd?auto=format&fit=crop&w=1200&q=80');
}

.story-image--mineral {
  background-image:
    linear-gradient(180deg, rgba(16, 17, 16, 0.12), rgba(16, 17, 16, 0.32)),
    url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80');
}

.story-image--notebook {
  background-image:
    linear-gradient(180deg, rgba(16, 17, 16, 0.12), rgba(16, 17, 16, 0.24)),
    url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80');
}

.story-card {
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  gap: 18px;
  padding: 22px 24px;
  align-items: start;
}

.story-icon {
  width: 58px;
  height: 58px;
  font-size: 1.5rem;
}

.story-card h3 {
  margin: 0 0 10px;
  font-size: 2rem;
  line-height: 1;
  font-weight: 600;
  color: var(--color-primary);
}

.story-card p {
  margin: 0 0 14px;
  font-size: 0.97rem;
  line-height: 1.75;
  color: #5f6677;
}

.goals-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.goals-list li {
  position: relative;
  padding-left: 26px;
  margin-bottom: 10px;
  font-family: 'Manrope', sans-serif;
  color: #5f6677;
  line-height: 1.65;
}

.goals-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--color-primary);
  font-weight: 700;
}

.research-projects-list {
  margin: 0;
  padding: 2px 0 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 20px;
}

.research-projects-list li {
  position: relative;
  min-height: 100%;
  padding: 12px 14px 12px 34px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(var(--color-secondary-rgb), 0.08));
  font-family: 'Manrope', sans-serif;
  color: #4f5867;
  line-height: 1.55;
}

.research-projects-list li::before {
  content: '•';
  position: absolute;
  left: 14px;
  top: 10px;
  color: var(--color-primary);
  font-size: 1.35rem;
  line-height: 1;
}

.team-section {
  margin-top: 28px;
}

.team-title {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 24px;
  align-items: center;
}

.team-title span {
  height: 1px;
  background: rgba(var(--color-primary-rgb), 0.22);
}

.team-title h2 {
  margin: 0;
  font-size: 3rem;
  line-height: 1;
  font-weight: 600;
  color: var(--color-primary);
}

.team-group {
  margin-top: 24px;
  padding: 24px 26px 28px;
  border: 1px solid rgba(var(--color-primary-rgb), 0.12);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(var(--color-secondary-rgb), 0.08));
  box-shadow: 0 18px 32px rgba(38, 45, 57, 0.06);
}

.team-label {
  margin: 0 0 16px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.65rem;
  font-weight: 600;
  color: var(--color-accent);
}

.team-grid {
  display: grid;
  gap: 18px;
}

.team-grid--advisors {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.team-grid--students {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.member-card {
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr);
  gap: 16px;
  padding: 18px;
  border-radius: 22px;
  min-height: 132px;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
}

.member-card--compact {
  grid-template-columns: 68px minmax(0, 1fr);
  min-height: 118px;
}

.member-avatar {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.7rem;
  font-weight: 700;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

.member-card--compact .member-avatar {
  width: 62px;
  height: 62px;
  font-size: 1.35rem;
}

.member-copy h3 {
  margin: 2px 0 6px;
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  line-height: 1.35;
  font-weight: 700;
  color: #1f241f;
}

.member-role,
.member-meta {
  margin: 0;
  line-height: 1.55;
}

.member-role {
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 600;
}

.member-meta {
  color: #5b635d;
  font-size: 0.84rem;
}

.support-strip {
  display: grid;
  grid-template-columns: minmax(280px, 1.1fr) minmax(0, 2.4fr);
  gap: 0;
  margin-top: 16px;
  overflow: hidden;
  border-radius: 20px;
}

.support-note {
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  padding: 20px 22px;
  border-right: 1px solid rgba(var(--color-primary-rgb), 0.08);
}

.support-icon {
  width: 58px;
  height: 58px;
  font-size: 1.6rem;
}

.support-note p {
  margin: 0;
  color: #454f47;
  line-height: 1.75;
}

.support-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.support-item {
  display: grid;
  place-items: center;
  gap: 10px;
  padding: 18px 14px;
  text-align: center;
  border-left: 1px solid rgba(var(--color-primary-rgb), 0.08);
}

.support-mark {
  color: var(--color-primary);
  font-size: 2rem;
}

.support-item p {
  margin: 0;
  max-width: 18ch;
  color: #49524b;
  line-height: 1.5;
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

.footer-brand p {
  color: rgba(255, 255, 255, 0.72);
  margin: 14px 0 0;
  line-height: 1.7;
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

.footer-column a,
.footer-column p {
  color: rgba(255, 255, 255, 0.72);
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

.footer-bottom div {
  display: flex;
  gap: 20px;
}

@media (max-width: 1280px) {
  .hero-section {
    grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1.1fr);
  }

  .team-grid--advisors {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .team-grid--students {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .footer-inner,
  .footer-links {
    grid-template-columns: 1fr;
  }

  .footer-links {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 960px) {
  .about-shell,
  .footer-inner,
  .footer-bottom {
    width: min(100%, calc(100% - 28px));
  }

  .hero-section,
  .story-grid,
  .highlight-panel,
  .support-strip {
    grid-template-columns: 1fr;
  }

  .hero-copy {
    padding: 40px 4px 0;
  }

  .hero-visual {
    min-height: 420px;
    border-radius: 24px;
  }

  .highlight-panel {
    margin-top: 14px;
  }

  .panel-illustration {
    justify-self: start;
  }

  .support-note {
    border-right: 0;
    border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.08);
  }

  .support-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .footer-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 720px) {
  .about-shell {
    width: min(100%, calc(100% - 20px));
  }

  .hero-copy h1 {
    font-size: 4rem;
  }

  .hero-copy h2 {
    font-size: 1.9rem;
  }

  .story-card,
  .member-card,
  .highlight-panel,
  .support-note {
    padding: 18px;
  }

  .story-card,
  .member-card {
    grid-template-columns: 1fr;
  }

  .research-projects-list {
    grid-template-columns: 1fr;
  }

  .panel-badge,
  .story-icon,
  .support-icon,
  .member-avatar {
    margin: 0 auto;
  }

  .panel-copy,
  .story-card,
  .member-card,
  .support-note {
    text-align: center;
  }

  .team-title h2 {
    font-size: 2.35rem;
  }

  .team-grid--advisors,
  .team-grid--students,
  .support-grid,
  .footer-links {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
