<script setup>
const { locale } = useI18n();
const activeSection = ref("");

const navItems = [
  { label: "Students", href: "#who-i-help", icon: "students-icon.png" },
  { label: "Framework", href: "#framework", icon: "framework-icon.png" },
  {
    label: "Testimonials",
    href: "#testimonials",
    icon: "testimonials-icon.png",
  },
  { label: "Links", href: "#social-proof", icon: "links-icon.png" },
  { label: "Contact", href: "#contact", icon: "contact-icon.png" },
];

const scrollToSection = (href) => {
  const el = document.querySelector(href);
  if (el) {
    const offset = 70;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

// Handle clearing active state when at the very top (Hero section)
const handleScroll = () => {
  if (window.scrollY < 50) {
    activeSection.value = "";
  }
};

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = `#${entry.target.id}`;
      } else {
        // If the first section moves below the trigger zone, we are back in the Hero
        if (
          entry.target.id === "who-i-help" &&
          entry.boundingClientRect.top > 0
        ) {
          activeSection.value = "";
        }
      }
    });
  }, observerOptions);

  navItems.forEach((item) => {
    const el = document.querySelector(item.href);
    if (el) observer.observe(el);
  });

  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
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
        :class="[
          'mobile-nav-btn',
          { 'is-active': activeSection === item.href },
        ]"
        @click="scrollToSection(item.href)"
      >
        <div class="nav-icon-wrapper">
          <img
            :src="`/images/icons/${item.icon}`"
            :alt="item.label"
            class="nav-icon-img"
          />
        </div>
        <span class="nav-text">{{ item.label }}</span>
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
}

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

/* =========================
   MEDIA QUERIES
   ========================= */
@media (width <= 768px) {
  .mobile-tab-bar {
    display: block;
  }
}

/* Specific fix for very small mobile screens */
@media (width <= 425px) {
  .mobile-tab-bar {
    padding: 0 4px;
  }

  .nav-text {
    font-size: 0.6rem;
    letter-spacing: 0;
  }

  .nav-icon-wrapper {
    height: 24px;
    width: 24px;
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
