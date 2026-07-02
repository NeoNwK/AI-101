<template>
  <nav :class="['app-navbar', { 'app-navbar--home': variant === 'home' }]">
    <div class="nav-inner">
      <button type="button" class="logo" @click="$emit('go-home')">
        <span class="logo-icon">◔</span>
        <span class="logo-text">
          <span class="logo-name">PALEO RESEARCH GROUP</span>
          <span class="logo-sub">Department of Earth Sciences, Faculty of Science, Kasetsart University</span>
        </span>
      </button>

      <ul class="nav-links">
        <li><a href="#" :class="{ active: activePage === 'home' }" @click.prevent="$emit('go-home')">HOME</a></li>
        <li><a href="#" :class="{ active: activePage === 'about' }" @click.prevent="$emit('go-about')">ABOUT US</a></li>
        <li><a href="#" :class="{ active: activePage === 'research' }" @click.prevent="$emit('go-research')">PUBLICATION</a></li>
        <li><a href="#" :class="{ active: activePage === 'browse' }" @click.prevent="$emit('go-browse')">ALL SPECIMEN</a></li>
        <li><a href="#" :class="{ active: activePage === 'contact' }" @click.prevent="$emit('go-contact')">CONTACT</a></li>
      </ul>

      <div class="nav-right">
        <button v-if="showSearch" type="button" class="nav-icon-btn" aria-label="Toggle search" @click="searchOpen = !searchOpen">
          ⌕
        </button>
        <div class="search-box" v-if="showSearch && searchOpen">
          <input
            type="text"
            :value="searchValue"
            :placeholder="searchPlaceholder"
            :readonly="searchReadonly"
            @input="$emit('update:searchValue', $event.target.value)"
          />
        </div>
      </div>

      <button
        type="button"
        class="mobile-menu-toggle"
        :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
        aria-label="Toggle navigation menu"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        ☰
      </button>
    </div>

    <div v-if="mobileMenuOpen" class="mobile-panel">
      <div class="mobile-search" v-if="showSearch">
        <input
          type="text"
          :value="searchValue"
          :placeholder="searchPlaceholder"
          :readonly="searchReadonly"
          @input="$emit('update:searchValue', $event.target.value)"
        />
        <button type="button" aria-label="Search specimens">⌕</button>
      </div>

      <ul class="mobile-links">
        <li><a href="#" :class="{ active: activePage === 'home' }" @click.prevent="navigate('go-home')">HOME</a></li>
        <li><a href="#" :class="{ active: activePage === 'about' }" @click.prevent="navigate('go-about')">ABOUT US</a></li>
        <li><a href="#" :class="{ active: activePage === 'research' }" @click.prevent="navigate('go-research')">PUBLICATION</a></li>
        <li><a href="#" :class="{ active: activePage === 'browse' }" @click.prevent="navigate('go-browse')">ALL SPECIMEN</a></li>
        <li><a href="#" :class="{ active: activePage === 'contact' }" @click.prevent="navigate('go-contact')">CONTACT</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  props: {
    activePage: {
      type: String,
      default: '',
    },
    searchValue: {
      type: String,
      default: '',
    },
    searchPlaceholder: {
      type: String,
      default: 'Search specimens...',
    },
    searchReadonly: {
      type: Boolean,
      default: false,
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
    showAvatar: {
      type: Boolean,
      default: true,
    },
    variant: {
      type: String,
      default: 'default',
    },
  },
  emits: ['go-home', 'go-browse', 'go-about', 'go-research', 'go-contact', 'update:searchValue'],
  data() {
    return {
      mobileMenuOpen: false,
      searchOpen: false,
    }
  },
  methods: {
    navigate(eventName) {
      this.mobileMenuOpen = false
      this.searchOpen = false
      this.$emit(eventName)
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap');

.app-navbar {
  position: sticky;
  top: 0;
  z-index: 120;
  background:
    linear-gradient(90deg, rgba(var(--color-accent-rgb), 0.92) 0%, rgba(var(--color-primary-rgb), 0.82) 100%);
  border-bottom: 1px solid rgba(var(--color-secondary-rgb), 0.16);
  box-shadow: 0 10px 28px rgba(var(--color-accent-rgb), 0.22);
}

.app-navbar--home {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: transparent;
  border-bottom: 0;
  box-shadow: none;
}

.app-navbar--home .nav-inner {
  padding-top: 0;
}

.app-navbar--home .search-box {
  background: rgba(22, 24, 19, 0.82);
}

.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 84px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: #fff;
}

.logo-icon {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(var(--color-secondary-rgb), 0.62);
  color: var(--color-secondary);
  font-size: 1.35rem;
  line-height: 1;
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.logo-name {
  font-family: 'PT Serif', serif;
  font-weight: 800;
  font-size: 1.38rem;
  letter-spacing: 0.04em;
  color: #fff;
  line-height: 1;
}

.logo-sub {
  margin-top: 3px;
  max-width: 380px;
  font-size: 0.62rem;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.3;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 28px;
  flex: 1;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: 0.86rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  padding: 6px 0 10px;
  border-radius: 0;
  transition: color 0.2s ease, opacity 0.2s ease;
  border-bottom: 2px solid transparent;
  position: relative;
}

.nav-links li a.active,
.nav-links li a:hover {
  color: #fff;
}

.nav-links li a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: rgba(var(--color-secondary-rgb), 0.92);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease;
}

.nav-links li a.active::after,
.nav-links li a:hover::after {
  transform: scaleX(1);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
  position: relative;
}

.mobile-menu-toggle,
.mobile-panel {
  display: none;
}

.nav-icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  font-size: 1.05rem;
  cursor: pointer;
}

.search-box {
  position: absolute;
  top: calc(100% + 14px);
  right: 0;
  display: flex;
  min-width: 280px;
  border: 1px solid rgba(var(--color-secondary-rgb), 0.3);
  border-radius: 16px;
  overflow: hidden;
  background: rgba(var(--color-accent-rgb), 0.94);
  box-shadow: 0 14px 32px rgba(var(--color-accent-rgb), 0.24);
}

.search-box input {
  border: none;
  outline: none;
  padding: 12px 14px;
  font-size: 0.84rem;
  width: 100%;
  color: #fff;
  background: transparent;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.72);
}

@media (max-width: 1100px) {
  .nav-links,
  .nav-right,
  .logo-sub {
    display: none;
  }

  .mobile-menu-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    width: 42px;
    height: 42px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .mobile-panel {
    display: grid;
    gap: 16px;
    padding: 0 24px 20px;
    border-top: 1px solid rgba(var(--color-secondary-rgb), 0.16);
    background: linear-gradient(90deg, rgba(var(--color-accent-rgb), 0.96) 0%, rgba(var(--color-primary-rgb), 0.86) 100%);
  }

  .app-navbar--home .mobile-panel {
    background: linear-gradient(90deg, rgba(var(--color-accent-rgb), 0.96) 0%, rgba(var(--color-primary-rgb), 0.86) 100%);
  }

  .mobile-search {
    display: flex;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 14px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.08);
  }

  .mobile-search input {
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    padding: 10px 14px;
    font-size: 0.9rem;
    color: #fff;
    background: transparent;
  }

  .mobile-search input::placeholder {
    color: rgba(255, 255, 255, 0.72);
  }

  .mobile-search button {
    border: none;
    background: transparent;
    color: #fff;
    padding: 10px 14px;
    cursor: pointer;
  }

  .mobile-links {
    display: grid;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .mobile-links a {
    display: block;
    padding: 10px 12px;
    border-radius: 10px;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-family: 'PT Serif', serif;
    font-weight: 700;
    letter-spacing: 0.6px;
  }

  .mobile-links a.active {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
  }

}

@media (max-width: 640px) {
  .nav-inner {
    padding: 0 16px;
    gap: 16px;
  }

  .mobile-panel {
    padding: 0 16px 16px;
  }

  .logo-name {
    font-size: 1.1rem;
  }
}
</style>
