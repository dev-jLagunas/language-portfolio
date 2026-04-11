<script setup>
const { t, locale } = useI18n();
const { currentTheme } = useTheme();
const { $gsap } = useNuxtApp();
const sectionRef = ref(null);
const scrollRef = ref(null);
let ctx;

const steps = [
  { key: "step1", icon: "ph:magnifying-glass-bold" },
  { key: "step2", icon: "ph:brain-bold" },
  { key: "step3", icon: "ph:target-bold" },
  { key: "step4", icon: "ph:globe-hemisphere-west-bold" },
  { key: "step5", icon: "ph:arrows-clockwise-bold" },
];

watch(locale, async () => {
  await nextTick();
  ScrollTrigger.refresh();
});

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
            <div class="step-header">
              <Icon :name="step.icon" class="step-icon" />
              <span :class="['step-tag', currentTheme]">
                {{ t(`framework.steps.${step.key}.label`) }}
              </span>
            </div>

            <h3 class="step-title">
              {{ t(`framework.steps.${step.key}.title`) }}
            </h3>
            <p class="step-description">
              {{ t(`framework.steps.${step.key}.description`) }}
            </p>
            <span class="bg-number">{{ index + 1 }}</span>
          </div>

          <img
            v-if="index === steps.length - 1"
            src="/images/avatars/avatar-pushing.png"
            class="pushing-avatar"
            alt="Juan pushing"
          />
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
  width: fit-content;
}

.step-card {
  width: 75vw;
  max-width: 600px;
  flex-shrink: 0;
  position: relative;
}

.card-inner {
  background: var(--text-light);
  border: var(--brutalist-border-thick);
  box-shadow: var(--shadow-lg);
  padding: 4rem 3rem;
  position: relative;
  overflow: hidden;
  height: 425px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.step-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  z-index: 2;
}

.step-icon {
  font-size: 2.5rem;
  color: var(--text-dark);
}

.step-tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  font-weight: 900;
  width: fit-content;
  border: 2px solid var(--text-dark);
  color: var(--text-dark);
  text-transform: uppercase;
  box-shadow: 3px 3px 0px var(--text-dark);
  transition: background-color 0.4s ease;
}

/* Theme Background Colors */
.step-tag.theme-en {
  background-color: var(--color-en);
}
.step-tag.theme-es {
  background-color: var(--color-es);
}
.step-tag.theme-jp {
  background-color: var(--color-jp);
}
.step-tag.theme-fr {
  background-color: var(--color-fr);
}

.step-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
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
  opacity: 0.2;
  z-index: 1;
  pointer-events: none;
}

.pushing-avatar {
  position: absolute;
  right: -425px;
  bottom: -100px;
  height: 500px;
  pointer-events: none;
  z-index: 1;
  display: none;
}

@media (width > 768px) {
  .pushing-avatar {
    display: block;
  }
}

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
```
