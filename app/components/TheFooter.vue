<script setup>
const { locale, locales, setLocale } = useI18n();
const currentYear = new Date().getFullYear();

const footerNav = {
  expertise: [
    { name: "English Coaching", link: "/" },
    { name: "UX Design Portfolio", link: "#" },
    { name: "Systems Architecture", link: "#" },
  ],
  social: [
    { name: "YouTube", link: "#" },
    { name: "Instagram", link: "#" },
    { name: "Behance", link: "#" },
    { name: "Medium", link: "#" },
  ],
  legal: [
    { name: "Privacy Policy", link: "/privacy" },
    { name: "Terms of Service", link: "/terms" },
  ],
};

const langNames = {
  en: "English",
  es: "Español",
  jp: "日本語",
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
            Systems Architect & High-Agency English Coach.<br />
            Operating at the intersection of design and communication.
          </p>

          <div class="lang-switcher">
            <span class="switcher-label">System Language</span>
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
            <span class="column-title">Expertise</span>
            <ul>
              <li v-for="item in footerNav.expertise" :key="item.name">
                <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="nav-column">
            <span class="column-title">Network</span>
            <ul>
              <li v-for="item in footerNav.social" :key="item.name">
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
          © {{ currentYear }} Juan Lagunas. Ishikawa, Japan.
        </div>

        <div class="legal-links">
          <NuxtLink
            v-for="item in footerNav.legal"
            :key="item.name"
            :to="item.link"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <div class="tech-stack">
          Built with <strong>Nuxt 4</strong> & <strong>GSAP</strong>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  padding: 100px 20px 40px;
  border-top: 4px solid var(--text-dark);
  position: relative;
  z-index: 50;
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

/* Theme color logic integrated */
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
}

.footer-logo span {
  color: #ff4d4d;
}

.brand-mission {
  font-family: var(--font-main);
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.7;
  max-width: 350px;
  margin-bottom: 3rem;
}

/* Language Switcher */
.lang-switcher {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.switcher-label {
  font-family: var(--font-main);
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.5;
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
}

.lang-pill:hover,
.lang-pill.active {
  background: var(--text-dark);
  color: #fff;
  opacity: 1;
}

/* Nav Groups */
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
}

ul li {
  margin-bottom: 0.75rem;
}

ul li a {
  font-family: var(--font-main);
  color: inherit;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

ul li a:hover {
  opacity: 0.4;
}

/* Bottom Bar */
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
}

.legal-links a {
  color: inherit;
  text-decoration: none;
}

.tech-stack strong {
  font-weight: 800;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }

  .legal-links {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
