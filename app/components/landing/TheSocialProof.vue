<script setup>
const { t, locale } = useI18n();
const { $gsap } = useNuxtApp();
const sectionRef = ref(null);
const selectedResource = ref(null);
let ctx;

const resources = [
  {
    key: "language_friends",
    link: "https://amazon.com/author/juanlagunas",
    img: "/images/links/language-friends-img.png",
    hasModal: true,
  },
  {
    key: "yt_challenge",
    link: "https://youtube.com/@moeandjuan",
    img: "/images/links/language-switch-img.png",
    hasModal: true,
  },
  {
    key: "english_lab",
    link: "https://youtube.com/@theenglishlab",
    img: "/images/links/language-lab-img.png",
    hasModal: true,
  },
  {
    key: "portfolio",
    link: "https://juan-lagunas.com",
    img: "/images/links/ux-portfolio-img.png",
    hasModal: true,
  },
  {
    key: "behance",
    link: "https://behance.net/juan-lagunas",
    img: "/images/links/unsplash-img.png",
    hasModal: false,
  },
  {
    key: "medium",
    link: "#",
    img: "/images/links/medium-blog.png",
    hasModal: true,
  },
];

const secondaryLinks = [
  { key: "github", link: "https://github.com/juan-lagunas" },
  { key: "instagram", link: "#" },
];

const openModal = (item) => {
  selectedResource.value = item;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedResource.value = null;
  document.body.style.overflow = "";
};

onMounted(() => {
  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".resource-card");

    cards.forEach((card, i) => {
      $gsap.from(card, {
        y: 30,
        opacity: 0,
        scale: 0.98,
        duration: 0.6,
        delay: (i % 2) * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
  document.body.style.overflow = "";
});
</script>

<template>
  <section ref="sectionRef" class="beyond-lab" id="social-proof">
    <div class="container">
      <div class="header-flex">
        <h2 class="section-title">{{ t("resources.section_title") }}</h2>
        <div class="social-pills">
          <a
            v-for="s in secondaryLinks"
            :key="s.key"
            :href="s.link"
            class="pill"
          >
            {{ t(`resources.social.${s.key}`) }}
          </a>
        </div>
      </div>

      <div class="resource-grid">
        <div v-for="item in resources" :key="item.key" class="resource-card">
          <div class="card-visual">
            <img
              :src="item.img"
              :alt="t(`resources.items.${item.key}.title`)"
              loading="lazy"
            />
          </div>
          <div class="card-info">
            <div class="meta-row">
              <span class="type-tag">{{
                t(`resources.items.${item.key}.type`)
              }}</span>
              <button
                v-if="item.hasModal"
                @click="openModal(item)"
                class="details-trigger"
              >
                {{ t("resources.common.details") }}
              </button>
            </div>

            <h3 class="resource-title">
              {{ t(`resources.items.${item.key}.title`) }}
            </h3>
            <p class="resource-desc">
              {{ t(`resources.items.${item.key}.desc`) }}
            </p>

            <a :href="item.link" target="_blank" class="main-link">
              {{ t(`resources.items.${item.key}.btnText`) }}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="modal-pop">
        <div
          v-if="selectedResource"
          class="modal-overlay"
          @click.self="closeModal"
        >
          <div class="modal-window" :class="`theme-${locale}`">
            <button class="close-btn" @click="closeModal">✕</button>

            <!-- Modal Banner Image -->
            <div class="modal-banner">
              <img
                :src="selectedResource.img"
                :alt="t(`resources.items.${selectedResource.key}.title`)"
              />
            </div>

            <div class="modal-layout">
              <div class="modal-header">
                <span class="type-tag">{{
                  t(`resources.items.${selectedResource.key}.type`)
                }}</span>
                <h2 class="modal-title">
                  {{ t(`resources.items.${selectedResource.key}.title`) }}
                </h2>
              </div>

              <div class="modal-body scroll-custom">
                <p class="long-text">
                  {{ t(`resources.items.${selectedResource.key}.details`) }}
                </p>
              </div>

              <div class="modal-footer">
                <a
                  :href="selectedResource.link"
                  target="_blank"
                  class="pill primary"
                >
                  {{ t(`resources.items.${selectedResource.key}.btnText`) }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
/* 
  ========================================
  LAYOUT & ARCHITECTURE
  ========================================
*/
.beyond-lab {
  padding: var(--section-padding) 0;
  background-color: var(--bg-main);
  border-top: 2px solid var(--text-dark);
  position: relative;
  overflow: hidden;
  margin-bottom: 4rem;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
  border-bottom: 2px solid var(--text-dark);
  padding-bottom: 1.5rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: var(--text-dark);
  line-height: 1;
  margin: 0;
  letter-spacing: -0.02em;
}

/* 
  ========================================
  GRID & CARDS
  ========================================
*/
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 450px), 1fr));
  gap: 2rem;
}

.resource-card {
  display: flex;
  background: var(--bg-card);
  border: 2px solid var(--text-dark);
  position: relative;
  transition:
    transform 0.2s cubic-bezier(0.2, 0, 0, 1),
    box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.resource-card:hover {
  transform: translate(-6px, -6px);
  box-shadow: 6px 6px 0px var(--text-dark);
}

.card-visual {
  width: 35%;
  flex-shrink: 0;
  background: #e5e5e5;
  border-right: 2px solid var(--text-dark);
  position: relative;
  overflow: hidden;
}

.card-visual img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.1);
  transition:
    filter 0.3s ease,
    transform 0.4s ease;
}

.resource-card:hover .card-visual img {
  filter: grayscale(0%) contrast(1);
  transform: scale(1.05);
}

.card-info {
  width: 65%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

/* 
  ========================================
  TYPOGRAPHY & UI ELEMENTS
  ========================================
*/
.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.type-tag {
  background: var(--text-dark);
  color: var(--bg-main);
  padding: 4px 8px;
  font-family: var(--font-main);
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;
}

.details-trigger {
  background: none;
  border: none;
  font-family: var(--font-main);
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-dark);
  cursor: pointer;
  padding: 4px 0;
  position: relative;
}

.details-trigger::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--text-dark);
  transform-origin: right;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.details-trigger:hover::after {
  transform-origin: left;
  transform: scaleX(1);
}

.resource-title {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  color: var(--text-dark);
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.resource-desc {
  font-family: var(--font-main);
  font-size: 0.9rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.main-link {
  font-family: var(--font-main);
  font-weight: 800;
  font-size: 0.8rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-dark);
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
}

.main-link svg {
  transition: transform 0.2s ease;
}
.resource-card:hover .main-link svg {
  transform: translateX(4px);
}

/* 
  ========================================
  MODAL SYSTEM
  ========================================
*/
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  backdrop-filter: blur(4px);
}

.modal-window {
  background: var(--bg-main);
  width: 100%;
  max-width: 600px;
  border: 3px solid var(--text-dark);
  position: relative;
  box-shadow: 12px 12px 0px var(--text-dark);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Important for banner corners */
}

/* Modal Banner Image */
.modal-banner {
  width: 100%;
  height: 220px;
  background: #e5e5e5;
  border-bottom: 3px solid var(--text-dark);
  overflow: hidden;
}

.modal-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--text-dark);
  color: var(--bg-main);
  border: none;
  width: 44px;
  height: 44px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal-layout {
  padding: 2rem 2.5rem 2.5rem;
}

.modal-header {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: var(--text-dark);
  line-height: 1.1;
  margin: 0.5rem 0 0;
}

.scroll-custom {
  max-height: 35vh;
  overflow-y: auto;
  padding-right: 1rem;
}

.long-text {
  font-family: var(--font-main);
  font-size: 1rem;
  line-height: 1.6;
  color: #222;
  white-space: pre-wrap;
}

.modal-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  text-align: right;
}

.pill {
  font-family: var(--font-main);
  font-weight: 800;
  font-size: 0.75rem;
  text-transform: uppercase;
  text-decoration: none;
  padding: 8px 16px;
  border: 2px solid var(--text-dark);
  color: var(--text-dark);
  display: inline-block;
}

.pill.primary {
  background: var(--text-dark);
  color: var(--bg-main);
}

/* MODAL ANIMATIONS */
.modal-pop-enter-active,
.modal-pop-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-pop-enter-from,
.modal-pop-leave-to {
  opacity: 0;
}
.modal-pop-enter-from .modal-window,
.modal-pop-leave-to .modal-window {
  transform: translateY(20px) scale(0.98);
}

@media (max-width: 768px) {
  .resource-card {
    flex-direction: column;
  }
  .card-visual {
    width: 100%;
    height: 160px;
    border-right: none;
    border-bottom: 2px solid var(--text-dark);
  }
  .card-info {
    width: 100%;
    padding: 1.25rem;
  }
  .modal-banner {
    height: 160px;
  }
  .modal-layout {
    padding: 1.5rem;
  }
}
</style>
