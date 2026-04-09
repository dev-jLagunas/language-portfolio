<script setup>
const { t } = useI18n();
const { $gsap } = useNuxtApp();
const sectionRef = ref(null);
const scrollRef = ref(null);
let ctx;

// We use keys to map to the localized content in our JSON files
const steps = [
  { key: "step1" },
  { key: "step2" },
  { key: "step3" },
  { key: "step4" },
  { key: "step5" },
];

onMounted(() => {
  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".step-card");

    if (window.innerWidth > 768) {
      $gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.value,
          pin: true,
          scrub: 1,
          end: () => "+=" + sectionRef.value.offsetWidth * (cards.length - 1),
          invalidateOnRefresh: true,
        },
      });
    }
  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section
    ref="sectionRef"
    class="framework-section"
    id="framework"
    data-step="2"
  >
    <div class="intro-block">
      <h2 class="section-title">{{ t("framework.title") }}</h2>
      <p class="section-subtitle">
        {{ t("framework.subtitle") }}
      </p>
    </div>

    <div class="scroll-container">
      <div ref="scrollRef" class="horizontal-track">
        <div v-for="(step, index) in steps" :key="index" class="step-card">
          <div class="card-inner">
            <span class="step-tag">{{
              t(`framework.steps.${step.key}.label`)
            }}</span>
            <h3 class="step-title">
              {{ t(`framework.steps.${step.key}.title`) }}
            </h3>
            <p class="step-description">
              {{ t(`framework.steps.${step.key}.description`) }}
            </p>
            <span class="bg-number">{{ index + 1 }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.framework-section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--bg-main);
  z-index: 20;
  overflow: hidden;
}

.intro-block {
  padding: 0 5%;
  margin-bottom: 2rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-family: var(--font-main);
  font-weight: 700;
  color: var(--text-dark);
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.scroll-container {
  width: 100%;
  padding: 0 5%;
}

.horizontal-track {
  display: flex;
  gap: 4rem;
  width: fit-content; /* Critical for GSAP horizontal scroll logic */
}

.step-card {
  width: 75vw;
  max-width: 600px;
  flex-shrink: 0;
}

.card-inner {
  background: var(--text-light);
  border: var(--brutalist-border-thick);
  box-shadow: var(--shadow-lg);
  padding: 4rem 3rem;
  position: relative;
  overflow: hidden;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.step-tag {
  display: inline-block;
  background: var(--text-dark);
  color: var(--text-light);
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  font-weight: 900;
  margin-bottom: 2rem;
  width: fit-content;
}

.step-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  z-index: 2;
  color: var(--text-dark);
}

.step-description {
  font-family: var(--font-main);
  font-size: 1.15rem;
  line-height: 1.6;
  color: #333;
  z-index: 2;
}

.bg-number {
  position: absolute;
  right: -10px;
  bottom: -20px;
  font-family: var(--font-display);
  font-size: 12rem;
  color: var(--text-dark);
  opacity: 0.05;
  z-index: 1;
  pointer-events: none;
}

/* =========================
   MEDIA QUERIES
   ========================= */
@media (width <= 768px) {
  .framework-section {
    height: auto;
    padding: 6rem 1.5rem;
  }

  .horizontal-track {
    flex-direction: column;
    width: 100%;
    gap: 3rem;
  }

  .step-card {
    width: 100%;
    max-width: none;
  }

  .card-inner {
    height: auto;
    padding: 3rem 2rem;
  }
}
</style>
