<script setup>
const { locale, t } = useI18n();
const { $gsap } = useNuxtApp();
const sectionRef = ref(null);
let ctx;

const testimonials = [
  { key: "hiroki", image: "/images/characters/avatar-satoshi.png" },
  { key: "elena", image: "/images/characters/avatar-mina.png" },
  { key: "kenji", image: "/images/characters/avatar-park.png" },
  { key: "saki", image: "/images/characters/avatar-takumi.png" },
];

onMounted(() => {
  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".testimonial-card");

    cards.forEach((card, i) => {
      $gsap.from(card, {
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotation: i % 2 === 0 ? -1 : 1,
        duration: 0.7,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reverse",
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
  <section
    ref="sectionRef"
    class="testimonials-section"
    id="testimonials"
    data-step="3"
  >
    <div class="container">
      <div class="intro">
        <h2 class="display-xl">{{ t("testimonials.title") }}</h2>
        <p class="subtitle">{{ t("testimonials.subtitle") }}</p>
      </div>

      <div class="testimonial-grid">
        <div
          v-for="(item, index) in testimonials"
          :key="index"
          :class="['testimonial-card', `theme-${locale}`]"
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
  padding: var(--section-padding);
  background-color: var(--bg-main);
  position: relative;
  z-index: 30;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.intro {
  text-align: center;
  margin-bottom: 5rem;

  & .title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 4.5rem);
    color: var(--text-dark);
    margin-bottom: 1rem;
  }

  & .subtitle {
    font-family: var(--font-main);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    font-weight: 800;
    opacity: 0.5;
  }
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 8rem 3rem; /* Extra vertical gap for the breakout image */
}

/* -------------------------
   CARD ARCHITECTURE
   ------------------------- */
.testimonial-card {
  position: relative;
  padding: 3rem;
  border: var(--brutalist-border-thick);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  background-color: var(--bg-card);
  overflow: visible;
  transition: transform 0.3s ease;
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
  align-items: center; /* Center content for better alignment with polaroid */
  text-align: center;
}

/* -------------------------
   HEADER (NAME & ROLE)
   ------------------------- */
.user-meta {
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5rem;
  width: 100%;

  & .name {
    font-family: var(--font-main);
    font-weight: 900;
    font-size: 1.4rem;
    text-transform: uppercase;
    color: var(--text-dark);
    letter-spacing: 0.02em;
  }

  & .role {
    font-family: var(--font-main);
    font-size: 0.8rem;
    font-weight: 700;
    opacity: 0.5;
    color: var(--text-dark);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
}

/* -------------------------
   STORY & QUOTES
   ------------------------- */
.story-wrapper {
  position: relative;
  padding: 0 1rem;
  margin-bottom: 4rem; /* Space for polaroid below */
}

.story {
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1.3;
  color: var(--text-dark);
  position: relative;
  z-index: 1;
  text-align: start;
}

.quote-mark {
  font-family: var(--font-display);
  font-size: 8rem;
  color: var(--text-dark);
  opacity: 0.15;
  line-height: 1;
  position: absolute;
  user-select: none;
}

.quote-mark.open {
  top: -45px;
  left: -30px;
  transform: rotate(-15deg);
}

.quote-mark.close {
  bottom: -100px;
  right: 10px;
  transform: rotate(15deg);
}

/* -------------------------
   CENTERED PINNED POLAROID
   ------------------------- */
.image-anchor {
  position: relative;
  width: 100%;
  height: 60px; /* Acts as a spacer for the absolute image */
}

.pinned-polaroid {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 225px; /* Bigger presence as requested */
  height: auto;
  z-index: 10;
  filter: drop-shadow(8px 8px 0px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.testimonial-card:hover .pinned-polaroid {
  transform: translateX(-50%) translateY(-5px) scale(1.02);
}

/* =========================
   MEDIA QUERIES
   ========================= */
@media (width <= 900px) {
  .testimonial-grid {
    grid-template-columns: 1fr;
    gap: 8rem;
  }

  .testimonial-card {
    padding: 2rem 0.5rem;
  }

  .story {
    font-size: 1.25rem;
  }

  .pinned-polaroid {
    width: 200px;
  }
}

@media (width >= 1024px) {
  .pinned-polaroid {
    width: 240px;
  }
}
</style>
