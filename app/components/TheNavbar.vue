<script setup>
import StatsSection from "./reusable/StatsSection.vue";

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
    <TheSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
  </nav>
</template>

<style scoped>
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

.hamburger {
  cursor: pointer;
  display: none;
}

.hamburger input {
  display: none;
}

.hamburger svg {
  height: 3em;
  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line {
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3;
  transition:
    stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
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
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1.1;
  }

  .nav-tagline {
    font-size: 0.8rem;
    margin-top: 0;
  }

  .nav-desktop-content {
    display: none;
  }

  .hamburger {
    display: block;
  }
}

@media (width >= 425px) {
  .nav-name {
    font-size: 2rem;
  }

  .nav-tagline {
    font-size: 1rem;
  }
}

@media (width >= 768px) {
  .nav-bar {
    position: sticky;
    top: 0;
    bottom: auto;
    padding: 1rem 5rem;
  }

  .hamburger {
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
