<script setup>
const { locale, locales, setLocale, t } = useI18n();
const currentYear = new Date().getFullYear();

const footerNav = {
  expertise: [
    { key: "lab", link: "#testimonials" }, // Coaching/Lab
    { key: "design", link: "#social-proof" }, // Portfolio/UX
    { key: "method", link: "#methodology" }, // Systems/Architecture
  ],
  network: [
    { name: "Language Switch", link: "https://youtube.com/@moeandjuan" },
    { name: "The English Lab", link: "https://youtube.com/@theenglishlab" },
    { name: "Behance", link: "https://behance.net/juan-lagunas" },
    { name: "Language Friends", link: "https://amazon.com/author/juanlagunas" },
    { name: "Photography", link: "#" },
  ],
  legal: [
    { key: "privacy", link: "/privacy" },
    { key: "terms", link: "/terms" },
  ],
};

const langNames = {
  en: "English",
  es: "Español",
  ja: "日本語",
  fr: "Français",
};
</script>

<template>
  <footer :class="['main-footer', `theme-${locale}`]">
    <div class="container">
      <div class="footer-grid">
        <div class="brand-column">
          <h2 class="footer-logo">JUAN<br />LAGUNAS<span>.</span></h2>
          <p class="brand-mission">
            {{ t("footer.mission") }}
          </p>

          <div class="lang-switcher">
            <span class="switcher-label">{{ t("footer.switcher_label") }}</span>
            <div class="lang-pills">
              <button
                v-for="lang in locales"
                :key="lang.code"
                :class="['lang-pill', { active: locale === lang.code }]"
                @click="setLocale(lang.code)"
              >
                {{ langNames[lang.code] || lang.code }}
              </button>
            </div>
          </div>
        </div>

        <div class="nav-group">
          <div class="nav-column">
            <span class="column-title">{{
              t("footer.columns.expertise")
            }}</span>
            <ul>
              <li v-for="item in footerNav.expertise" :key="item.key">
                <a :href="item.link">{{ t(`footer.nav.${item.key}`) }}</a>
              </li>
            </ul>
          </div>

          <div class="nav-column">
            <span class="column-title">{{ t("footer.columns.network") }}</span>
            <ul>
              <li v-for="item in footerNav.network" :key="item.name">
                <a :href="item.link" target="_blank" rel="noopener">{{
                  item.name
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          © {{ currentYear }} Juan Lagunas. {{ t("footer.location") }}
        </div>

        <div class="legal-links">
          <NuxtLink
            v-for="item in footerNav.legal"
            :key="item.key"
            :to="item.link"
          >
            {{ t(`footer.nav.${item.key}`) }}
          </NuxtLink>
        </div>

        <div class="tech-stack">
          {{ t("footer.built_with") }} <strong>Nuxt 4</strong> &
          <strong>GSAP</strong>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  padding: 100px 1.5rem 40px;
  border-top: var(--brutalist-border-thick);
  position: relative;
  z-index: 50;
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

/* Theme Backgrounds */
.theme-en {
  background-color: var(--color-en);
  color: var(--text-dark);
}
.theme-es {
  background-color: var(--color-es);
  color: var(--text-dark);
}
.theme-jp {
  background-color: var(--color-jp);
  color: var(--text-dark);
}
.theme-fr {
  background-color: var(--color-fr);
  color: var(--text-dark);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  margin-bottom: 80px;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 3rem;
  line-height: 0.85;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;

  & span {
    color: #ff4d4d;
  }
}

.brand-mission {
  font-family: var(--font-main);
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.7;
  max-width: 350px;
  margin-bottom: 3rem;
}

.lang-switcher {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  & .switcher-label {
    font-family: var(--font-main);
    font-size: 0.65rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.5;
  }
}

.lang-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.lang-pill {
  background: transparent;
  border: 1px solid var(--text-dark);
  color: var(--text-dark);
  padding: 4px 12px;
  border-radius: 4px;
  font-family: var(--font-main);
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.6;

  &:hover,
  &.active {
    background: var(--text-dark);
    color: var(--text-light);
    opacity: 1;
  }
}

.nav-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.column-title {
  display: block;
  font-family: var(--font-main);
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  opacity: 0.4;
  margin-bottom: 1.5rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;

  & li {
    margin-bottom: 0.75rem;

    & a {
      font-family: var(--font-main);
      color: inherit;
      text-decoration: none;
      font-size: 1.1rem;
      font-weight: 600;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.4;
      }
    }
  }
}

.footer-bottom {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-main);
  font-size: 0.85rem;
  opacity: 0.6;
}

.legal-links {
  display: flex;
  gap: 2rem;

  & a {
    color: inherit;
    text-decoration: none;
  }
}

.tech-stack strong {
  font-weight: 800;
}

/* =========================
   MEDIA QUERIES
   ========================= */
@media (width <= 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding-bottom: 80px; /* Space for Mobile Tab Bar */
  }

  .legal-links {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
