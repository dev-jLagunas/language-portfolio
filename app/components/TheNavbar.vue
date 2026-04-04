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
        <div class="nav-info">
          <p class="nav-name">{{ $t("nav.my_name") }}</p>
          <p class="nav-tagline">{{ $t("nav.my_tagline") }}</p>
        </div>
      </a>

      <div class="nav-actions">
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

        <label class="hamburger">
          <input
            type="checkbox"
            :checked="isSidebarOpen"
            @change="toggleSidebar"
          />
          <svg viewBox="0 0 32 32">
            <path
              class="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path class="line" d="M7 16 27 16"></path>
          </svg>
        </label>
      </div>
    </div>
    <TheSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
  </nav>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 0.75rem 1.5rem;
  transition: background-color 0.4s ease;
  overflow: hidden;
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
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-dark);
}

.nav-avatar {
  height: 80px;
  margin-left: -15px;
  transform: rotate(-3deg);
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.15));
  pointer-events: none;
}

.nav-info {
  margin-left: 10px;
}

.nav-name {
  font-family: "DM Serif Display", serif;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1;
}

.nav-tagline {
  font-family: "Source Sans 3", sans-serif;
  font-size: 0.8rem;
  opacity: 0.8;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-desktop-content {
  display: none; /* Mobile default */
  align-items: center;
  gap: 2rem;
}

/* Desktop Overrides */
@media (min-width: 768px) {
  .nav-inner {
    width: fit-content;
    gap: 1rem;
  }

  .nav-desktop-content {
    display: flex;
  }

  .nav-name {
    font-size: 1.8rem;
  }

  .nav-avatar {
    height: 110px;
  }
}

/* Button & Switcher Styling */
.lang-switcher {
  display: flex;
  gap: 0.5rem;
}

.lang-btn {
  background: none;
  border: none;
  font-family: "Source Sans 3", sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  opacity: 0.5;
}

.lang-btn.is-active {
  opacity: 1;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.nav-booking-link {
  text-decoration: none;
  color: var(--text-dark);
  font-family: "Source Sans 3", sans-serif;
  font-weight: 800;
  font-size: 0.9rem;
  padding: 0.6rem 1.2rem;
  border: 1.5px solid var(--text-dark);
  border-radius: 6px;
}

/* Hamburger UI */
.hamburger {
  cursor: pointer;
  display: block;
}

.hamburger input {
  display: none;
}
.hamburger svg {
  height: 2.5rem;
  color: var(--text-dark);
}
.line {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.5;
  transition: 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
.line-top-bottom {
  stroke-dasharray: 12 63;
}
.hamburger input:checked + svg {
  transform: rotate(-45deg);
}
.hamburger input:checked + svg .line-top-bottom {
  stroke-dasharray: 20 300;
  stroke-dashoffset: -32.42;
}
</style>
