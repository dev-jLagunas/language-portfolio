<script setup>
const { locale, setLocale } = useI18n();
const isSidebarOpen = ref(false);

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "jp", label: "JP" },
  { code: "fr", label: "FR" },
];

const platforms = [
  { name: "Cambly", url: "#", icon: "ph:video-camera-bold" },
  { name: "NativeTalk", url: "#", icon: "ph:chats-bold" },
  { name: "iTalki", url: "#", icon: "ph:student-bold" },
];

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <nav :class="['nav-bar', `theme-${locale}`]" aria-label="Main navigation">
    <div class="nav-inner">
      <a href="/" class="nav-brand">
        <div class="logo-icon-wrap">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="logo-svg"
          >
            <rect
              width="32"
              height="32"
              rx="4"
              fill="currentColor"
              fill-opacity="0.1"
            />
            <path
              d="M16 8V24M8 16H24"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="square"
            />
          </svg>
        </div>

        <img
          :src="`/images/avatars/avatar-${locale}.png`"
          :alt="$t('nav.avatar_alt')"
          class="nav-avatar"
        />
        <div class="nav-info">
          <p class="nav-name">Juan Lagunas</p>
          <p class="nav-tagline">{{ $t("nav.my_tagline") }}</p>
        </div>
      </a>

      <div class="nav-actions">
        <div class="nav-desktop-content">
          <div class="platform-nav">
            <a
              v-for="p in platforms"
              :key="p.name"
              :href="p.url"
              class="platform-link"
              :title="p.name"
            >
              <Icon :name="p.icon" />
              <span>{{ p.name }}</span>
            </a>
          </div>

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
}

/* Theme Backgrounds */
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
  position: relative;
}

.nav-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-dark);
  gap: 1rem;
}

.logo-icon-wrap {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.nav-avatar {
  height: 100px;
  transform: rotate(-3deg);
  filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.15));
  pointer-events: none;
  position: absolute;
  left: -25px;
  top: -15px;
}

.nav-info {
  margin-left: 4rem;
}
.nav-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 1;
}
.nav-tagline {
  font-family: var(--font-main);
  font-size: 1rem;
  opacity: 0.8;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-desktop-content {
  display: none;
  align-items: center;
  gap: 2rem;
}

/* Platform Links (1024px+) */
.platform-nav {
  display: none;
  gap: 1.25rem;
}

@media (min-width: 1024px) {
  .platform-nav {
    display: flex;
    padding-right: 2rem;
    border-right: 1.5px solid rgba(0, 0, 0, 0.1);
  }
}

.platform-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--text-dark);
  transition: transform 0.2s ease;
}

.platform-link:hover {
  transform: translateY(-2px);
}
.platform-link span {
  font-family: var(--font-main);
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-top: 2px;
}

/* Desktop Overrides */
@media (min-width: 768px) {
  .nav-desktop-content {
    display: flex;
  }
  .nav-name {
    font-size: 2rem;
  }
  .nav-avatar {
    height: 150px;
    left: -65px;
  }
}

.lang-switcher {
  display: flex;
  gap: 0.5rem;
}
.lang-btn {
  background: none;
  border: none;
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 1rem;
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
  font-family: var(--font-main);
  font-size: 0.85rem;
  font-weight: 900;
  padding: 0.6rem 1.2rem;
  border: 2px solid var(--text-dark);
  box-shadow: 4px 4px 0px var(--text-dark);
  background-color: #fff;
  text-transform: uppercase;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-booking-link:hover {
  background-color: var(--text-dark);
  color: #fff;
  transform: translate(2px, 2px);
  box-shadow: 0px 0px 0px var(--text-dark);
}

/* Hamburger Styles Restored */
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
