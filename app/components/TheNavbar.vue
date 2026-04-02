<script setup>
const { locale, setLocale, t } = useI18n();

const changeLanguage = (lang) => {
  setLocale(lang);
};
</script>

<template>
  <nav :class="['navbar', `theme-${locale}`]" aria-label="Main navigation">
    <div class="navbar__inner">
      <a href="/" class="navbar__brand" aria-label="Homepage">
        <img
          :src="`/images/avatar-${locale}.png`"
          alt="Avatar"
          class="navbar__avatar"
        />
        <span class="navbar__name">Juan Lagunas English Coaching</span>
      </a>

      <div
        class="navbar__language-switcher"
        role="group"
        aria-label="Language selector"
      >
        <button
          v-for="lang in ['en', 'es', 'jp', 'fr']"
          :key="lang"
          type="button"
          :class="['navbar__language-button', { 'is-active': locale === lang }]"
          @click="setLocale(lang)"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>

      <a href="/contact" class="navbar__contact-link">
        {{ locale === "en" ? "Book a Lesson" : "" }}
        {{ locale === "es" ? "Reservar Clase" : "" }}
        {{ locale === "jp" ? "レッスンを予約する" : "" }}
        {{ locale === "fr" ? "Réserver un cours" : "" }}
      </a>
    </div>
  </nav>
</template>

<style scoped>
/* Basic styles you already had */
.navbar {
  width: 100%;
  padding: 1rem;
  transition: background-color 0.4s ease; /* Smooth transition for BG change */
}

/* 2. THEME LOGIC: Changing background based on language */
.theme-en {
  background-color: #f0f4f8;
}
.theme-es {
  background-color: #fcf5e5;
}
.theme-jp {
  background-color: #fff5f5;
}
.theme-fr {
  background-color: #f5f3ff;
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__language-button {
  cursor: pointer;
  border: 1px solid transparent;
  background: none;
  padding: 4px 8px;
}

/* Highlighting the active language */
.navbar__language-button.is-active {
  font-weight: bold;
  border-bottom: 2px solid currentColor;
}

.navbar__avatar {
  height: 40px; /* Temporary size */
  width: auto;
}
</style>
