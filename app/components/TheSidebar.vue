<script setup>
const { locale, setLocale } = useI18n();
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const activeIndex = ref(0);

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "jp", label: "JP" },
  { code: "fr", label: "FR" },
];

const menuItems = [
  { label: "nav.who_i_help", href: "#who-i-help" },
  { label: "nav.framework", href: "#framework" },
  { label: "nav.testimonials", href: "#testimonials" },
  { label: "nav.social_proof", href: "#social-proof" },
  { label: "nav.contact", href: "#contact" },
];

const handleLocaleChange = (code) => {
  setLocale(code);
};

const handleNavClick = async (index, href) => {
  activeIndex.value = index;
  await new Promise((resolve) => setTimeout(resolve, 300));

  const el = document.querySelector(href);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
  emit("close");
};
</script>

<template>
  <Transition name="slide-left">
    <div v-if="isOpen" class="sidebar-overlay" @click.self="$emit('close')">
      <aside :class="['sidebar', `theme-${locale}`]">
        <button
          class="sidebar-close"
          @click="$emit('close')"
          aria-label="Close"
        >
          <span class="close-icon">×</span>
        </button>

        <nav class="sidebar-content">
          <div class="sidebar-section">
            <p class="section-label">Language</p>
            <div class="lang-grid">
              <button
                v-for="lang in languages"
                :key="lang.code"
                :class="['lang-btn', { 'is-active': locale === lang.code }]"
                @click="handleLocaleChange(lang.code)"
              >
                {{ lang.label }}
              </button>
            </div>
          </div>

          <div class="sidebar-divider"></div>

          <div class="sidebar-section elevator-shaft">
            <div class="shaft-line"></div>
            <ul class="nav-list">
              <li v-for="(item, index) in menuItems" :key="item.href">
                <button
                  class="nav-link"
                  @click="handleNavClick(index, item.href)"
                >
                  <span class="floor-num">0{{ index + 1 }}</span>
                  {{ $t(item.label) }}
                </button>
              </li>
            </ul>

            <div
              class="elevator-avatar"
              :style="{ transform: `translateY(${activeIndex * 62}px)` }"
            >
              <img src="/images/avatars/avatar-pointing.png" alt="Juan" />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  </Transition>
</template>

<style scoped>
.sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: flex-start; /* Slide from left */
}

.sidebar {
  width: 100%;
  max-width: 400px;
  height: 100%;
  background: white;
  padding: 6rem 2rem;
  position: relative;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  display: flex;
  flex-direction: column;
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

/* Close Button Styling & Micro-animations */
.sidebar-close {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ff4d4d;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 2010;
}

.close-icon {
  font-size: 2rem;
  line-height: 1;
  font-family: Arial, sans-serif;
}

.sidebar-close:hover {
  background: #e63939;
  transform: translateX(-50%) scale(1.1) rotate(90deg);
  box-shadow: 0 6px 15px rgba(255, 77, 77, 0.5);
}

.sidebar-close:active {
  transform: translateX(-50%) scale(0.9);
}

/* Desktop: Top-Center */
@media (min-width: 768px) {
  .sidebar-close {
    top: 2rem;
  }
}

/* Mobile: Bottom-Center */
@media (max-width: 767px) {
  .sidebar {
    max-width: 85vw;
    padding: 4rem 1.5rem 8rem;
  }
  .sidebar-close {
    bottom: 2rem;
  }
}

.sidebar-content {
  margin-top: 1rem;
}

.section-label {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.lang-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.lang-btn {
  padding: 8px;
  border: 1px solid var(--text-dark);
  background: transparent;
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.75rem;
  cursor: pointer;
}

.lang-btn.is-active {
  background: var(--text-dark);
  color: white;
}

.sidebar-divider {
  height: 1px;
  background: var(--text-dark);
  opacity: 0.1;
  margin: 2.5rem 0;
}

.elevator-shaft {
  position: relative;
  padding-left: 1.5rem;
}

.shaft-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: var(--text-dark);
  opacity: 0.2;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-link {
  background: none;
  border: none;
  font-family: var(--font-display);
  font-size: 1.6rem;
  text-align: left;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.floor-num {
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 900;
  opacity: 0.4;
}

.elevator-avatar {
  position: absolute;
  left: -35px;
  top: -5px;
  width: 70px;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  pointer-events: none;
}

.elevator-avatar img {
  width: 100%;
}

/* Left-to-Right Slide Animation */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.4s ease-out;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
