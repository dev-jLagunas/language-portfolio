<script setup>
const { locale, t } = useI18n();
const { $gsap } = useNuxtApp();
const sectionRef = ref(null);
let ctx;

const testimonials = [
  { key: "hiroki", image: "/images/characters/char-business-man.png" },
  { key: "elena", image: "/images/characters/char-student.png" },
  { key: "kenji", image: "/images/characters/char-traveller.png" },
  { key: "saki", image: "/images/characters/char-young-student.png" },
];

onMounted(() => {
  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".testimonial-card");

    cards.forEach((card, i) => {
      $gsap.from(card, {
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotation: i % 2 === 0 ? -2 : 2,
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
        <h2 class="title">{{ t("testimonials.title") }}</h2>
        <p class="subtitle">{{ t("testimonials.subtitle") }}</p>
      </div>

      <div class="testimonial-grid">
        <div
          v-for="(item, index) in testimonials"
          :key="index"
          :class="['testimonial-card', `theme-${locale}`]"
        >
          <div class="card-inner">
            <div class="quote-icon">“</div>
            <p class="story">{{ t(`testimonials.items.${item.key}.story`) }}</p>

            <div class="user-meta">
              <div class="avatar-box">
                <img
                  :src="item.image"
                  :alt="t(`testimonials.items.${item.key}.name`)"
                  class="avatar"
                />
              </div>
              <div class="info">
                <span class="name">{{
                  t(`testimonials.items.${item.key}.name`)
                }}</span>
                <span class="role">{{
                  t(`testimonials.items.${item.key}.role`)
                }}</span>
              </div>
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
  margin-bottom: 6rem;

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
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.testimonial-card {
  padding: 3rem;
  /* System Integration: Heavy Brutalist lines and large offset shadow */
  border: var(--brutalist-border-thick);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  background-color: var(--bg-card);
}

/* Theme Backgrounds mapped to design tokens */
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

.card-inner {
  height: 100%;
  display: flex;
  flex-direction: column;

  & .quote-icon {
    font-family: var(--font-display);
    font-size: 5rem;
    line-height: 1;
    margin-bottom: -1rem;
    opacity: 0.2;
    color: var(--text-dark);
  }

  & .story {
    font-family: var(--font-display);
    font-size: 1.4rem;
    line-height: 1.4;
    color: var(--text-dark);
    margin-bottom: 2.5rem;
    flex-grow: 1;
  }
}

.user-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding-top: 1.5rem;

  & .avatar-box {
    width: 60px;
    height: 60px;
    background: var(--text-light);
    border: var(--brutalist-border); /* Linked to 3px system border */
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;

    & .avatar {
      width: 100%;
      height: 100%;
      object-fit: contain;
      margin-top: 5px;
    }
  }

  & .info {
    display: flex;
    flex-direction: column;

    & .name {
      font-family: var(--font-main);
      font-weight: 900;
      font-size: 1.1rem;
      text-transform: uppercase;
      color: var(--text-dark);
    }

    & .role {
      font-family: var(--font-main);
      font-size: 0.85rem;
      font-weight: 700;
      opacity: 0.6;
      color: var(--text-dark);
    }
  }
}

/* =========================
   MEDIA QUERIES
   ========================= */
@media (width <= 900px) {
  .testimonial-grid {
    grid-template-columns: 1fr;
  }

  .testimonial-card {
    padding: 2rem;
  }
}
</style>
