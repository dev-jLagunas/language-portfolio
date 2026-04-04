<script setup>
const { locale } = useI18n();

const navItems = [
  { label: "Students", href: "#who-i-help", icon: "👥" },
  { label: "Framework", href: "#framework", icon: "⚙️" },
  { label: "Testimonials", href: "#testimonials", icon: "💬" },
  { label: "Links", href: "#social-proof", icon: "🔗" },
  { label: "Contact", href: "#contact", icon: "✉️" },
];

const scrollToSection = (href) => {
  const el = document.querySelector(href);
  if (el) {
    const offset = 70; // Adjusted for top navbar height
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
        v-for="item in navItems"
        :key="item.href"
        class="mobile-nav-btn"
        @click="scrollToSection(item.href)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-text">{{ $t(item.label) }}</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.mobile-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  z-index: 900;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: none; /* Hidden by default */
  transition: background-color 0.4s ease;
  padding: 0 10px;
}

/* Theme Backgrounds - Matches Navbar Logic */
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
  max-width: 500px;
  margin: 0 auto;
}

.mobile-nav-btn {
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 4px;
  cursor: pointer;
  color: var(--text-dark);
  padding: 8px 0;
}

.nav-icon {
  font-size: 1.2rem;
}

.nav-text {
  font-family: "Source Sans 3", sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

/* Visibility Trigger */
@media (max-width: 768px) {
  .mobile-tab-bar {
    display: block;
  }
}

/* Handle iPhone safe areas for newer models */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .mobile-tab-bar {
    height: calc(65px + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
