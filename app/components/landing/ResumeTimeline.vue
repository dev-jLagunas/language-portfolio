<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const { t } = useI18n();
const { currentTheme, isChangingLanguage } = useTheme();

const timelineKeys = [
  "irc",
  "ucsd",
  "eia",
  "aeon",
  "westgate",
  "boe",
  "cafe",
  "freelance",
  "friends",
  "youtube",
];

const visualMap = {
  irc: "/images/visuals/english-assistant-visual.png",
  ucsd: "/images/visuals/ucsd-linguistics-visual.png",
  eia: "/images/visuals/english-action-visual.png",
  aeon: "/images/visuals/aeon-school-visual.png",
  westgate: "/images/visuals/meiji-university-visual.png",
  boe: "/images/visuals/alt-school-visual.png",
  cafe: "/images/visuals/cafe-triangle-visual.png",
  freelance: "/images/visuals/ux-design-visual.png",
  friends: "/images/visuals/language-friends-visuals.png",
  youtube: "/images/visuals/youtube-channels-visual.png",
};

const activeIndex = ref(0);
let autoPlayInterval = null;

const nextJob = () => {
  if (activeIndex.value < timelineKeys.length - 1) {
    activeIndex.value++;
  } else {
    activeIndex.value = 0;
  }
};

const prevJob = () => {
  if (activeIndex.value > 0) activeIndex.value--;
};

const setJob = (index) => {
  activeIndex.value = index;
  resetAutoplay();
};

const startAutoplay = () => {
  autoPlayInterval = setInterval(() => {
    nextJob();
  }, 3000);
};

const resetAutoplay = () => {
  clearInterval(autoPlayInterval);
  startAutoplay();
};

const getCardClass = (index) => {
  if (index === activeIndex.value) return "is-active";
  if (index === activeIndex.value - 1) return "is-prev";
  if (index === activeIndex.value + 1) return "is-next";
  if (index < activeIndex.value - 1) return "is-hidden-left";
  if (index > activeIndex.value + 1) return "is-hidden-right";
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  clearInterval(autoPlayInterval);
});
</script>

<template>
  <section
    ref="sectionRef"
    :class="['app', 'resume-page', currentTheme]"
    id="resume-timeline"
    data-step="4"
  >
    <div class="texture-grid"></div>

    <section class="section-wrapper resume-header flex-between">
      <div class="title-wrapper">
        <h1 class="display-xl">{{ t("resume.title") }}</h1>
        <p class="pre-title">{{ t("resume.tagline") }}</p>
      </div>

      <a
        href="/docs/Juan_Lagunas_Resume.pdf"
        download
        class="b-button download-btn"
      >
        <span>Download PDF</span>
        <span class="icon">↓</span>
      </a>
    </section>

    <section class="carousel-section">
      <div class="carousel-container">
        <div
          class="sitting-avatar-wrapper"
          :style="{ opacity: activeIndex !== null ? 1 : 0 }"
        >
          <img
            src="/images/avatars/avatar-sitting.png"
            alt="Juan sitting"
            class="avatar-sitting-img"
          />
        </div>

        <button
          class="b-button nav-btn prev-btn"
          @click="prevJob"
          :disabled="activeIndex === 0"
          aria-label="Previous role"
        >
          ←
        </button>
        <button
          class="b-button nav-btn next-btn"
          @click="nextJob"
          aria-label="Next role"
        >
          →
        </button>

        <div
          v-for="(key, index) in timelineKeys"
          :key="key"
          :class="[
            'b-card',
            'job-card',
            getCardClass(index),
            { 'is-transitioning': isChangingLanguage },
          ]"
          @click="setJob(index)"
        >
          <div class="card-header">
            <span class="job-id">{{
              index + 1 < 10 ? `0${index + 1}` : index + 1
            }}</span>
            <span class="job-year">{{ t(`resume.items.${key}.year`) }}</span>
          </div>

          <div class="card-image-slot">
            <img
              v-if="visualMap[key]"
              :src="visualMap[key]"
              :alt="t(`resume.items.${key}.role`)"
              class="visual-img"
            />
            <div v-else class="img-placeholder-pattern"></div>
          </div>

          <div class="card-body">
            <h2 class="pre-title company-name">
              {{ t(`resume.items.${key}.company`) }}
            </h2>
            <h3 class="section-title role-title">
              {{ t(`resume.items.${key}.role`) }}
            </h3>
            <p class="ui-text job-desc">{{ t(`resume.items.${key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.resume-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--bg-main) !important;

  padding-bottom: 4rem;
}

/* Variables remain scoped to the section so the card header works */
.theme-en {
  --card-theme-color: var(--color-en);
}
.theme-es {
  --card-theme-color: var(--color-es);
}
.theme-jp {
  --card-theme-color: var(--color-jp);
}
.theme-fr {
  --card-theme-color: var(--color-fr);
}

.resume-header {
  padding-bottom: 2rem;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.download-btn {
  font-size: 0.9rem;
  padding: 1rem 2rem;
}

.download-btn .icon {
  font-family: var(--font-display);
  font-size: 1.2rem;
}

.carousel-section {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  overflow: hidden;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  z-index: 5;
}

.sitting-avatar-wrapper {
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  z-index: 25;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.avatar-sitting-img {
  width: 100%;
  filter: drop-shadow(var(--shadow-sm));
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  z-index: 20;
  border: var(--brutalist-border-thick);
}

.prev-btn {
  left: 1rem;
}
.next-btn {
  right: 1rem;
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  box-shadow: none;
}

.job-card {
  position: absolute;
  width: 100%;
  max-width: 420px;
  height: 500px;
  display: flex;
  flex-direction: column;
  transition:
    all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 0.4s ease;
  will-change: transform, opacity;
  cursor: pointer;
  background: var(--bg-card);
}

.job-card.is-transitioning .card-body {
  visibility: hidden;
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: var(--brutalist-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--card-theme-color);
  transition: background-color 0.4s ease;
}

.pre-title {
  font-family: var(--font-main);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-weight: 800;
  opacity: 0.5;
}

.job-id {
  font-family: var(--font-main);
  font-weight: 900;
  font-size: 1.2rem;
}

.job-year {
  font-family: var(--font-main);
  font-weight: 800;
  font-size: 0.9rem;
  text-transform: uppercase;
  padding: 4px 12px;
  background: var(--bg-card);
  border: 2px solid var(--text-dark);
  border-radius: 50px;
}

.card-image-slot {
  width: 100%;
  height: 180px;
  border-bottom: var(--brutalist-border);
  background: var(--bg-main);
  position: relative;
  overflow: hidden;
}

.visual-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.4s ease;
}

.img-placeholder-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    45deg,
    var(--text-dark) 0,
    var(--text-dark) 2px,
    transparent 2px,
    transparent 8px
  );
  opacity: 0.1;
}

.card-body {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.role-title {
  font-size: clamp(1.6rem, 3vw, 2rem);
  margin-bottom: 1rem;
  line-height: 1.1;
}

.job-desc {
  font-size: 1rem;
  opacity: 0.8;
}

.is-active {
  transform: translateX(0) scale(1);
  opacity: 1;
  z-index: 10;
  box-shadow: var(--shadow-xl);
  cursor: default;
}

.is-prev {
  transform: translateX(-80%) scale(0.7);
  opacity: 0.3;
  z-index: 5;
}

.is-next {
  transform: translateX(80%) scale(0.7);
  opacity: 0.3;
  z-index: 5;
}

.is-hidden-left {
  transform: translateX(-150%) scale(0.6);
  opacity: 0;
  pointer-events: none;
}
.is-hidden-right {
  transform: translateX(150%) scale(0.6);
  opacity: 0;
  pointer-events: none;
}

@media (width <= 768px) {
  .sitting-avatar-wrapper {
    width: 90px;
    top: -30px;
  }
  .carousel-container {
    height: 480px;
  }
  .job-card {
    max-width: 300px;
    height: 440px;
  }
  .nav-btn {
    width: 45px;
    height: 45px;
    bottom: -60px;
    top: auto;
    transform: none !important;
  }
  .prev-btn {
    left: 30%;
  }
  .next-btn {
    right: 30%;
  }
  .is-prev {
    transform: translateX(-65%) scale(0.8);
  }
  .is-next {
    transform: translateX(65%) scale(0.8);
  }
}
</style>
