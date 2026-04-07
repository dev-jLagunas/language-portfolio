<script setup>
const { locale, setLocale, t } = useI18n();
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const activeIndex = ref(0);

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "jp", label: "JP" }, // Note: Changed 'jp' to 'ja' to match standard i18n codes
  { code: "fr", label: "FR" },
];

const menuItems = [
  { key: "who_i_help", href: "#who-i-help" },
  { key: "how_it_works", href: "#framework" },
  { key: "testimonials", href: "#testimonials" },
  { key: "social_proof", href: "#social-proof" },
  { key: "contact", href: "#contact" },
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
  <Transition name="brutal-gate">
    <div v-if="isOpen" class="sidebar-overlay" @click.self="$emit('close')">
      <aside :class="['sidebar', `theme-${locale}`]">
        <button
          class="sidebar-close"
          @click="$emit('close')"
          :aria-label="t('sidebar.close_alt')"
        >
          <span class="close-icon">×</span>
        </button>

        <nav class="sidebar-content">
          <div class="sidebar-section">
            <p class="section-label">{{ t("sidebar.system_language") }}</p>
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
                  <span class="link-text">{{
                    t(`sidebar.nav.${item.key}`)
                  }}</span>
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
  display: flex;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  justify-content: flex-end; /* Flipped to Right */
}

.sidebar {
  width: 100%;
  max-width: 420px;
  height: 100%;
  padding: 6rem 2.5rem;
  position: relative;

  /* Flipped: Heavy LEFT border and shadow */
  border-left: 8px solid var(--text-dark);
  box-shadow: -20px 0 0px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
}

/* Background logic maintained */
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

/* Square Brutalist Close Button: Now hanging on the LEFT edge */
.sidebar-close {
  position: absolute;
  top: 2rem;
  left: -58px;
  width: 50px;
  height: 50px;
  background: var(--text-dark);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-icon {
  font-size: 2.5rem;
  font-family: var(--font-sans);
}

.sidebar-close:hover {
  background: #ff4d4d;
  transform: translateX(-5px); /* Moves inward toward center */
}

.sidebar-content {
  margin-top: 2rem;
}

.section-label {
  font-family: var(--font-main);
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
  opacity: 0.5;
}

.lang-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.lang-btn {
  padding: 12px 5px;
  border: 2px solid var(--text-dark);
  background: white;
  font-family: var(--font-main);
  font-weight: 800;
  font-size: 0.8rem;
  cursor: pointer;
  box-shadow: 3px 3px 0px var(--text-dark);
  transition: all 0.1s ease;
}

.lang-btn.is-active {
  background: var(--text-dark);
  color: white;
  box-shadow: 0px 0px 0px var(--text-dark);
  transform: translate(2px, 2px);
}

.sidebar-divider {
  height: 2px;
  background: var(--text-dark);
  margin: 3rem 0;
  opacity: 0.2;
}

.elevator-shaft {
  position: relative;
  padding-left: 2rem;
}

.shaft-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--text-dark);
  opacity: 1;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.nav-link {
  background: none;
  border: none;
  font-family: var(--font-display);
  font-size: 2rem;
  text-align: left;
  cursor: pointer;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;
}

.nav-link:hover {
  transform: translateX(10px);
}

.floor-num {
  font-family: var(--font-main);
  font-size: 0.8rem;
  font-weight: 900;
  opacity: 0.3;
}

.elevator-avatar {
  position: absolute;
  left: -33px;
  top: -2px;
  width: 70px;
  z-index: 5;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}

.elevator-avatar img {
  width: 100%;
  filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.1));
}

/* Flipped Gate Animation Logic */
.brutal-gate-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.brutal-gate-leave-active {
  transition: all 0.3s ease-in;
}

.brutal-gate-enter-from {
  transform: translateX(110%); /* Enters from Right */
}
.brutal-gate-leave-to {
  transform: translateX(110%); /* Exits to Right */
}

/* Staggered entrance: links come in from the right */
.brutal-gate-enter-active .nav-link {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
}
.brutal-gate-enter-from .nav-link {
  opacity: 0;
  transform: translateX(20px);
}

@media (max-width: 767px) {
  .sidebar {
    max-width: 85vw;
    border-left-width: 6px;
    border-right-width: 0;
  }
  .sidebar-close {
    left: 0; /* Align to the inside edge on mobile */
    top: 0;
    width: 60px;
    height: 60px;
  }
}
</style>
