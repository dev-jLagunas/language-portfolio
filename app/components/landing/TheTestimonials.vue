<script setup>
const { t, locale } = useI18n();
const { currentTheme, isChangingLanguage } = useTheme();
const { $gsap } = useNuxtApp();
const sectionRef = ref(null);
let ctx;

const testimonials = [
  { key: "hiroki", image: "/images/characters/avatar-satoshi.png" },
  { key: "elena", image: "/images/characters/avatar-mina.png" },
  { key: "kenji", image: "/images/characters/avatar-park.png" },
  { key: "saki", image: "/images/characters/avatar-takumi.png" },
];

// Force GSAP to recalculate when text height changes
watch(locale, async () => {
  await nextTick();
  ScrollTrigger.refresh();
});

onMounted(() => {
  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".testimonial-card");

    cards.forEach((card, i) => {
      $gsap.from(card, {
        y: 80, // Increased for a more dramatic pop
        rotation: i % 2 === 0 ? -2 : 2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 95%", // Starts a bit later for better impact
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="testimonials-section" id="testimonials">
    <div class="container">
      <div class="intro">
        <h2 class="display-xl">{{ t("testimonials.title") }}</h2>
        <p class="subtitle">{{ t("testimonials.subtitle") }}</p>
      </div>

      <div class="testimonial-grid">
        <div
          v-for="(item, index) in testimonials"
          :key="index"
          :class="[
            'testimonial-card',
            currentTheme,
            { 'is-transitioning': isChangingLanguage },
          ]"
        >
          <div class="texture-grid"></div>

          <div class="card-inner">
            <div class="user-meta">
              <span class="name">{{
                t(`testimonials.items.${item.key}.name`)
              }}</span>
              <span class="role">{{
                t(`testimonials.items.${item.key}.role`)
              }}</span>
            </div>

            <div class="story-wrapper">
              <span class="quote-mark open">“</span>
              <p class="story">
                {{ t(`testimonials.items.${item.key}.story`) }}
              </p>
              <span class="quote-mark close">”</span>
            </div>

            <div class="image-anchor">
              <img
                :src="item.image"
                :alt="t(`testimonials.items.${item.key}.name`)"
                class="pinned-polaroid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  padding: 8rem var(--space-unit);
  background-color: var(--bg-main);
  position: relative;
  z-index: 30;
  overflow: hidden; /* Prevents rotation from causing horizontal scroll */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.intro {
  text-align: center;
  margin-bottom: 5rem;
}

.display-xl {
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 4.5rem);
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.subtitle {
  font-family: var(--font-main);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-weight: 800;
  opacity: 0.5;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 8rem 3rem;
}

.testimonial-card {
  position: relative;
  padding: 3rem;
  border: var(--brutalist-border-thick);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  background-color: var(--bg-card);
  overflow: visible;
  transition:
    background-color 0.4s ease,
    opacity 0.3s ease;
  opacity: 1 !important; /* Forces visibility */
}

/* We keep the visual lock for the language swap, 
   but we only lower it to 0.5 so it never truly disappears.
*/
.testimonial-card.is-transitioning {
  opacity: 0.5 !important;
}

.testimonial-card.is-transitioning .card-inner {
  visibility: hidden;
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

.texture-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 0;
  pointer-events: none;
}

.card-inner {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-meta {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  width: 100%;
}

.name {
  font-family: var(--font-main);
  font-weight: 900;
  font-size: 1.4rem;
  text-transform: uppercase;
  color: var(--text-dark);
}

.role {
  font-family: var(--font-main);
  font-size: 0.8rem;
  font-weight: 700;
  opacity: 0.5;
  text-transform: uppercase;
}

.story-wrapper {
  position: relative;
  width: 100%;
}

.story {
  font-family: var(--font-display);
  font-size: 1.4rem;
  line-height: 1.3;
  color: var(--text-dark);
  text-align: left;
}

.quote-mark {
  font-family: var(--font-display);
  font-size: 7rem;
  color: var(--text-dark);
  opacity: 0.1;
  position: absolute;
}

.quote-mark.open {
  top: -30px;
  left: -20px;
}
.quote-mark.close {
  bottom: -60px;
  right: -10px;
}

.image-anchor {
  position: relative;
  width: 100%;
  height: 60px;
  margin-top: 3rem;
}

.pinned-polaroid {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: auto;
  filter: drop-shadow(6px 6px 0px rgba(0, 0, 0, 0.15));
}

@media (width <= 768px) {
  .testimonial-grid {
    gap: 6rem 1rem;
  }
  .testimonial-card {
    padding: 2rem 1.5rem;
  }
  .story {
    font-size: 1.15rem;
  }
  .pinned-polaroid {
    width: 160px;
  }
}
</style>
