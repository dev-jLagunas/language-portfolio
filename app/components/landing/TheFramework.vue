<script setup>
const { $gsap } = useNuxtApp();
const sectionRef = ref(null);
const scrollRef = ref(null);
let ctx;

const steps = [
  {
    title: "The Strategic Audit",
    label: "Step 01: Discovery",
    description:
      "We start with a high-bandwidth session. No generic tests. We map your professional hurdles, analyze your current output, and identify the high-leverage areas where you need to improve immediately.",
  },
  {
    title: "The Architecture",
    label: "Step 02: Design",
    description:
      "I build your proprietary roadmap. We set specific, high-agency goals and design the frameworks—vocabulary systems, presentation templates, or mental models—required to get you there.",
  },
  {
    title: "Strategic Execution",
    label: "Step 03: Progress",
    description:
      "We move into active coaching. This is a feedback-heavy loop where we execute the plan, iterate based on real-world performance, and build the momentum needed for long-term mastery.",
  },
];

onMounted(() => {
  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".step-card");

    // Only run horizontal scroll on desktop
    if (window.innerWidth > 768) {
      $gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.value,
          pin: true,
          scrub: 1, // Smooth "catch-up"
          // End is calculated based on cards count to make it feel natural
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
  <section ref="sectionRef" class="framework-section">
    <div class="intro-block">
      <h2 class="section-title">How It Works</h2>
      <p class="section-subtitle">
        A proprietary 3-step system for professionals.
      </p>
    </div>

    <div class="scroll-container">
      <div ref="scrollRef" class="horizontal-track">
        <div v-for="(step, index) in steps" :key="index" class="step-card">
          <div class="card-inner">
            <span class="step-tag">{{ step.label }}</span>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
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
  background-color: #f2f2f2;
  z-index: 20; /* Curtain effect to cover previous section */
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
  width: 75vw; /* Each card takes up 75% of viewport width */
  max-width: 600px;
  flex-shrink: 0;
}

.card-inner {
  background: white;
  border: 4px solid var(--text-dark);
  box-shadow: 12px 12px 0px var(--text-dark);
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
  color: white;
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

/* Mobile: Revert to standard vertical stack for UX clarity */
@media (max-width: 768px) {
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
