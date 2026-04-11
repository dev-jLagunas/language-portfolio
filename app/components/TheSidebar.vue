<script setup>
const { t } = useI18n();
const { currentTheme, changeLanguage } = useTheme();
const { activeIndex, setActiveIndex } = useSectionTracker();

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const languages = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "jp", label: "JP" },
  { code: "fr", label: "FR" },
];

const menuItems = [
  { key: "who_i_help", href: "#who-i-help" },
  { key: "how_it_works", href: "#framework" },
  { key: "testimonials", href: "#testimonials" },
  { key: "resume_timeline", href: "#resume-timeline" },
  { key: "social_proof", href: "#social-proof" },
  { key: "contact", href: "#contact" },
];

const platforms = [
  { name: "Cambly", url: "#" },
  { name: "NativeTalk", url: "#" },
  { name: "iTalki", url: "#" },
];

const handleLocaleChange = (code) => {
  changeLanguage(code);
};

const handleNavClick = async (index, href) => {
  setActiveIndex(index);

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
      <aside :class="['sidebar', currentTheme]">
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
                :class="[
                  'lang-btn',
                  { 'is-active': currentTheme === `theme-${lang.code}` },
                ]"
                @click="handleLocaleChange(lang.code)"
              >
                {{ lang.label }}
              </button>
            </div>
          </div>

          <div class="sidebar-divider"></div>

          <div class="sidebar-section">
            <p class="section-label">Platforms</p>
            <div class="platform-grid">
              <a
                v-for="platform in platforms"
                :key="platform.name"
                :href="platform.url"
                target="_blank"
                class="platform-link"
              >
                {{ platform.name }}
              </a>
            </div>
          </div>

          <div class="sidebar-divider"></div>

          <div class="sidebar-section elevator-shaft">
            <div class="shaft-line"></div>
            <ul class="nav-list">
              <li
                v-for="(item, index) in menuItems"
                :key="item.href"
                class="nav-item"
              >
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
              :style="{
                transform: `translateY(calc(var(--var-step-height) * ${activeIndex}))`,
              }"
            >
              <img src="/images/avatars/avatar-elevator.png" alt="Juan" />
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
  justify-content: flex-end;
}

.sidebar {
  width: 100%;
  max-width: 550px;
  height: 100%;
  position: relative;
  border-left: 8px solid var(--text-dark);
  box-shadow: -20px 0 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: visible;
  --var-step-height: 62px;
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

.sidebar-close {
  position: absolute;
  top: 2rem;
  left: -58px;
  width: 50px;
  height: 50px;
  background: var(--text-dark);
  color: var(--text-light);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 100;
}

.sidebar-close:hover {
  background: #ff4d4d;
  transform: translateX(-5px);
}

.close-icon {
  font-size: 2rem;
  font-family: var(--font-main);
}

.sidebar-content {
  overflow-y: auto;
  flex: 1;
  padding: 6rem 2.5rem;
}

.section-label {
  font-family: var(--font-main);
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
  color: var(--text-dark);
  opacity: 0.5;
}

.lang-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.platform-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.lang-btn,
.platform-link {
  padding: 10px 5px;
  border: var(--brutalist-border);
  background: var(--text-light);
  font-family: var(--font-main);
  font-weight: 800;
  font-size: 0.75rem;
  text-align: center;
  text-decoration: none;
  color: var(--text-dark);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}

.lang-btn.is-active,
.platform-link:hover {
  background: var(--text-dark);
  color: var(--text-light);
  box-shadow: none;
  transform: translate(2px, 2px);
}

.sidebar-divider {
  height: 2px;
  background: var(--text-dark);
  margin: 2rem 0;
  opacity: 0.15;
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
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.nav-item {
  height: 42px;
  display: flex;
  align-items: center;
}

.nav-link {
  background: none;
  border: none;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 5vw, 2.25rem);
  text-align: left;
  cursor: pointer;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 1rem;
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
  top: -10px;
  width: 70px;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
}

.elevator-avatar img {
  width: 100%;
  filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.1));
  transform: scaleX(-1);
}

@media (width <= 768px) {
  .sidebar {
    max-width: 85vw;
    --var-step-height: 45px;
  }

  .sidebar-close {
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
    box-shadow: var(--shadow-sm);
  }

  .sidebar-content {
    padding: 5rem 1.5rem 3rem 1.5rem;
  }

  .sidebar-divider {
    margin: 1.25rem 0;
  }

  .nav-list {
    gap: 10px;
  }

  .nav-item {
    height: 35px;
  }

  .nav-link {
    font-size: 1.5rem;
    gap: 0.75rem;
  }

  .elevator-avatar {
    width: 55px;
    left: -25px;
    top: -5px;
  }
}

.brutal-gate-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.brutal-gate-leave-active {
  transition: all 0.3s ease-in;
}
.brutal-gate-enter-from,
.brutal-gate-leave-to {
  transform: translateX(110%);
}
</style>
