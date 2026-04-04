<script setup>
const { locale, setLocale } = useI18n();

defineProps({
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
  { label: "nav.who_i_help", href: "#who-i-help" },
  { label: "nav.experience", href: "#experience" },
  { label: "nav.links", href: "#links" },
  { label: "nav.contact", href: "#contact" },
];

const handleLocaleChange = (code) => {
  setLocale(code);
};

const handleNavClick = () => {
  emit("close");
};
</script>

<template>
  <Transition name="slide">
    <div v-if="isOpen" class="sidebar-container">
      <aside :class="['sidebar', `theme-${locale}`]">
        <button
          class="sidebar-close"
          @click="$emit('close')"
          aria-label="Close menu"
        >
          ×
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

          <div class="sidebar-section">
            <ul class="nav-list">
              <li v-for="item in menuItems" :key="item.href">
                <a :href="item.href" class="nav-link" @click="handleNavClick">
                  {{ $t(item.label) }}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <img
        src="/images/avatars/avatar-pointing.png"
        class="sidebar-avatar"
        alt="Pointing Avatar"
      />
    </div>
  </Transition>
</template>

<style scoped>
.sidebar-container {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
}

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  padding: 4rem 2rem;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  transition: background-color 0.4s ease;
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
  font-size: 2.5rem;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  color: inherit;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-label {
  font-family: "Source Sans 3", sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.7;
}

.lang-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.lang-btn {
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.2);
  font-family: "Source Sans 3", sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: inherit;
  padding: 0.6rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.lang-btn.is-active {
  background: var(--text-dark);
  color: white;
  border-color: var(--text-dark);
}

.sidebar-divider {
  height: 1px;
  background: currentColor;
  opacity: 0.1;
  width: 100%;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.nav-link {
  font-family: "DM Serif Display", serif;
  font-size: 1.75rem;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
}

.nav-link:active {
  opacity: 0.6;
}

.sidebar-avatar {
  position: absolute;
  bottom: 55px;
  object-fit: contain;
}

/* --- TRANSITIONS --- */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.4s ease;
}

.slide-enter-active .sidebar,
.slide-leave-active .sidebar {
  transition: transform 0.4s ease;
}

.slide-enter-active .sidebar-avatar,
.slide-leave-active .sidebar-avatar {
  transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-enter-from .sidebar,
.slide-leave-to .sidebar {
  transform: translateX(-100%);
}

.slide-enter-from .sidebar-avatar,
.slide-leave-to .sidebar-avatar {
  transform: translateX(100%);
}

.slide-enter-to .sidebar-avatar {
  transform: translateX(-20px);
}

/* --- RESPONSIVE SIZES --- */
@media (320px <= width <= 425px) {
  .sidebar {
    width: 260px;
  }
  .sidebar-avatar {
    height: 250px;
    right: -70px;
  }
  .nav-link {
    font-size: 1.5rem;
  }
}

@media (426px <= width <= 767px) {
  .sidebar {
    width: 320px;
  }
  .sidebar-avatar {
    height: 300px;
    right: -80px;
  }
}
</style>
