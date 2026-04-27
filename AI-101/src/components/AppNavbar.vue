<template>
  <nav class="app-navbar">
    <div class="nav-inner">
      <div class="logo" @click="$emit('go-home')">
        <div class="logo-icon">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke="#ffffff" stroke-width="2.5" fill="none" />
            <polygon points="18,8 28,13 28,23 18,28 8,23 8,13" stroke="#ffffff" stroke-width="1.5" fill="rgba(255,255,255,0.15)" />
            <circle cx="18" cy="18" r="4" fill="#ffffff" />
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-name">GEO HUB</span>
          <span class="logo-sub">Educational Database</span>
        </div>
      </div>

      <ul class="nav-links">
        <li><a href="#" :class="{ active: activePage === 'home' }" @click.prevent="$emit('go-home')">HOME</a></li>
        <li><a href="#" :class="{ active: activePage === 'browse' }" @click.prevent="$emit('go-browse')">BROWSE</a></li>
        <li><a href="#">GEOLOGY</a></li>
        <li><a href="#">PALEONTOLOGY</a></li>
        <li><a href="#">MINERAL</a></li>
        <li><a href="#">GEMSTONES</a></li>
        <li><a href="#">ABOUT US</a></li>
      </ul>

      <div class="nav-right">
        <div class="search-box" v-if="showSearch">
          <input
            type="text"
            :value="searchValue"
            :placeholder="searchPlaceholder"
            :readonly="searchReadonly"
            @input="$emit('update:searchValue', $event.target.value)"
          />
          <button type="button">🔍</button>
        </div>
        <div class="avatar" v-if="showAvatar">👤</div>
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
        <button type="button" aria-label="Search specimens">🔍</button>
      </div>

      <ul class="mobile-links">
        <li><a href="#" :class="{ active: activePage === 'home' }" @click.prevent="navigate('go-home')">HOME</a></li>
        <li><a href="#" :class="{ active: activePage === 'browse' }" @click.prevent="navigate('go-browse')">BROWSE</a></li>
        <li><a href="#">GEOLOGY</a></li>
        <li><a href="#">PALEONTOLOGY</a></li>
        <li><a href="#">MINERAL</a></li>
        <li><a href="#">GEMSTONES</a></li>
        <li><a href="#">ABOUT US</a></li>
      </ul>

      <div class="mobile-avatar" v-if="showAvatar">👤 Account</div>
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
  },
  emits: ['go-home', 'go-browse', 'update:searchValue'],
  data() {
    return {
      mobileMenuOpen: false,
    }
  },
  methods: {
    navigate(eventName) {
      this.mobileMenuOpen = false
      this.$emit(eventName)
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600&display=swap');

.app-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #306e25;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
}

.nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 28px;
  height: 64px;
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
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 1px;
  color: #fff;
  line-height: 1;
}

.logo-sub {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.82);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2px;
  flex: 1;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 4px;
  transition: color 0.2s, border-color 0.2s;
  border-bottom: 2px solid transparent;
}

.nav-links li a.active,
.nav-links li a:hover {
  color: #fff;
  border-bottom-color: #fff;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.mobile-menu-toggle,
.mobile-panel {
  display: none;
}

.search-box {
  display: flex;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
}

.search-box input {
  border: none;
  outline: none;
  padding: 6px 14px;
  font-size: 0.8rem;
  width: 220px;
  color: #fff;
  background: transparent;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.72);
}

.search-box button {
  border: none;
  background: transparent;
  color: #fff;
  padding: 6px 12px;
  cursor: pointer;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.22);
}

@media (max-width: 1100px) {
  .nav-inner {
    height: 72px;
  }

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
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .mobile-panel {
    display: grid;
    gap: 16px;
    padding: 0 24px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    background: #306e25;
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
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    letter-spacing: 0.6px;
  }

  .mobile-links a.active {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
  }

  .mobile-avatar {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-size: 0.95rem;
    padding-top: 4px;
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
    font-size: 1rem;
  }
}
</style>
