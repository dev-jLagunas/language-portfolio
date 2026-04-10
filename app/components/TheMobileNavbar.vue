<script setup>
const { locale, t } = useI18n();

// Access the global source of truth
const { activeIndex } = useSectionTracker();

const navItems = [
  { key: "students", href: "#who-i-help", icon: "students-icon.png" },
  { key: "system", href: "#framework", icon: "framework-icon.png" },
  { key: "testimonials", href: "#testimonials", icon: "testimonials-icon.png" },
  { key: "resume", href: "#resume-timeline", icon: "resume-icon.png" },
  { key: "links", href: "#social-proof", icon: "links-icon.png" },
  { key: "contact", href: "#contact", icon: "contact-icon.png" },
];

const scrollToSection = (href) => {
  const el = document.querySelector(href);
  if (el) {
    // 70px offset matches your mobile bar height exactly
    const offset = 70;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};
</script>

<template>
  <nav
    :class="['mobile-tab-bar', `theme-${locale}`]"
    aria-label="Mobile navigation"
  >
    <div class="mobile-nav-inner">
      <button
        v-for="(item, index) in navItems"
        :key="item.href"
        :class="['mobile-nav-btn', { 'is-active': activeIndex === index }]"
        @click="scrollToSection(item.href)"
      >
        <div class="nav-icon-wrapper">
          <img
            :src="`/images/icons/${item.icon}`"
            :alt="t(`mobile_nav.${item.key}`)"
            class="nav-icon-img"
          />
        </div>
        <span class="nav-text">{{ t(`mobile_nav.${item.key}`) }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
/* -------------------------
   LAYOUT & THEME
   ------------------------- */
.mobile-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  z-index: 900;
  border-top: var(--brutalist-border);
  display: none;
  transition: background-color 0.4s ease;
  padding: 0 10px;
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

.mobile-nav-inner {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
}

/* -------------------------
   BUTTONS & ICONS
   ------------------------- */
.mobile-nav-btn {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  flex: 1;
  gap: 2px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0.7;
  position: relative;
  color: var(--text-dark);
}

.nav-icon-wrapper {
  height: 28px;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.nav-icon-img {
  height: 100%;
  width: auto;
  object-fit: contain;
}

.nav-text {
  font-family: var(--font-main);
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
}

/* ACTIVE STATE */
.mobile-nav-btn.is-active {
  opacity: 1;
  background: var(--text-light);
  border: 2px solid var(--text-dark);
  box-shadow: var(--shadow-sm);
  transform: translateY(-12px);
  z-index: 2;
}

.mobile-nav-btn.is-active .nav-icon-wrapper {
  transform: scale(1.1);
}

/* -------------------------
   RESPONSIVE & SAFE AREA
   ------------------------- */
@media (width <= 768px) {
  .mobile-tab-bar {
    display: block;
  }
}

@media (width <= 425px) {
  .mobile-tab-bar {
    padding: 0 4px;
  }
  .nav-text {
    display: none;
  }
  .nav-icon-wrapper {
    height: 26px;
    width: 26px;
  }
}

@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .mobile-tab-bar {
    height: calc(70px + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
  }
  .mobile-nav-btn.is-active {
    transform: translateY(-15px);
  }
}
</style>
