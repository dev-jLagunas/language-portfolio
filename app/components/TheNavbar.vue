I have renamed the classes to be more intuitive (using single hyphens/camelCase
as preferred) and restructured the CSS into a mobile-first hierarchy with
explicit buckets for your breakpoints. ```vue
<script setup>
const { locale, setLocale } = useI18n();
const isSidebarOpen = ref(false);

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "jp", label: "JP" },
  { code: "fr", label: "FR" },
];

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <nav :class="['nav-bar', `theme-${locale}`]" aria-label="Main navigation">
    <div class="nav-inner">
      <a href="/" class="nav-brand">
        <img
          :src="`/images/avatars/avatar-${locale}.png`"
          :alt="$t('nav.avatar_alt')"
          class="nav-avatar"
        />
        <span class="nav-info">
          <p class="nav-name">{{ $t("nav.my_name") }}</p>
          <p class="nav-tagline">{{ $t("nav.my_tagline") }}</p>
        </span>
      </a>

      <div class="nav-desktop-content">
        <div class="lang-switcher" role="group">
          <button
            v-for="lang in languages"
            :key="lang.code"
            :class="['lang-btn', { 'is-active': locale === lang.code }]"
            @click="setLocale(lang.code)"
          >
            {{ lang.label }}
          </button>
        </div>
        <a href="/contact" class="nav-booking-link">
          {{ $t("nav.book_lesson") }}
        </a>
      </div>

      <button
        class="nav-hamburger"
        @click="toggleSidebar"
        aria-label="Open Menu"
      >
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>
    </div>

    <TheSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
  </nav>
</template>

<style scoped>
/* --- BASE & THEMES --- */
.nav-bar {
  width: 100%;
  padding: 0.5rem 1rem;
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
  font-family: "DM Serif Display", serif;
  color: var(--text-dark);
  z-index: 100;
}

.theme-en {
  background-color: var(--color-en);
}
.theme-es {
  background-color: var(--color-es);
}
.theme-jp {
  background-color: var(--color-jp);
}
.theme-fr {
  background-color: var(--color-fr);
}

.nav-inner {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.nav-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.nav-booking-link {
  font-family: "Source Sans 3", sans-serif;
}

.lang-btn {
  font-family: "Source Sans 3", sans-serif;
}

.nav-tagline {
  color: var(--text-dark);
  font-family: "Source Sans 3", sans-serif;
}

.hamburger-bar {
  width: 30px;
  height: 3px;
  background-color: currentColor;
  border-radius: 2px;
}

/* --- MOBILE FIRST (320px to 424px) --- */
@media (width >= 320px) {
  .nav-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    min-height: 60px;
  }

  .nav-avatar {
    position: absolute;
    bottom: -10px;
    left: -40px;
    height: 120px;
    z-index: 110;
    transform: rotate(-5deg);
    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));
  }

  .nav-info {
    margin-left: 70px;
  }

  .nav-name {
    font-size: 1.25rem; /* Control text size here */
    font-weight: bold;
    line-height: 1.1;
  }

  .nav-tagline {
    font-size: 0.8rem; /* Control tagline size here */
    margin-top: 0;
  }

  .nav-desktop-content {
    display: none;
  }

  .nav-hamburger {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
  }
}

/* --- SMALL MOBILE TO TABLET (425px to 767px) --- */
@media (width >= 425px) {
  .nav-name {
    font-size: 2rem; /* Upscale for slightly larger mobile */
  }

  .nav-tagline {
    font-size: 1rem;
  }
}

/* --- TABLET & DESKTOP (768px and up) --- */
@media (width >= 768px) {
  .nav-bar {
    position: sticky;
    top: 0;
    bottom: auto;
    padding: 1rem 5rem;
  }

  .nav-hamburger {
    display: none;
  }

  .nav-desktop-content {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-avatar {
    top: -20px;
  }

  .nav-name {
    font-size: 1.5rem;
  }

  .nav-tagline {
    margin-top: -0.3rem;
  }

  /* Language Switcher Styles */
  .lang-switcher {
    display: flex;
    gap: 0.5rem;
  }
  .lang-btn {
    cursor: pointer;
    border: none;
    background: none;
    font-size: 0.875rem;
    font-weight: 500;
    color: inherit;
    opacity: 0.6;
    padding: 0.25rem 0.5rem;
  }
  .lang-btn.is-active {
    opacity: 1;
    border-bottom: 2px solid currentColor;
  }
  .nav-booking-link {
    text-decoration: none;
    color: inherit;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border: 1px solid currentColor;
    border-radius: 8px;
  }
}
</style>
```
