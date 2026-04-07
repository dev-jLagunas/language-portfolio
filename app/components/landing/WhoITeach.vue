<script setup>
const { locale, t } = useI18n(); // Standard usage
const { $gsap } = useNuxtApp();
const container = ref(null);
let ctx;

// We use keys to reference the translations in our JSON files
const students = [
  {
    key: "test_taker",
    image: "/images/characters/char-student.png",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    key: "professional",
    image: "/images/characters/char-business-man.png",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    key: "explorer",
    image: "/images/characters/char-traveller.png",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    key: "next_gen",
    image: "/images/characters/char-young-student.png",
    tags: ["tag1", "tag2", "tag3"],
  },
];

onMounted(() => {
  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".student-card");

    cards.forEach((card, i) => {
      $gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 100px",
          endTrigger: container.value,
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      if (i < cards.length - 1) {
        $gsap.to(card.querySelector(".card-inner"), {
          scale: 0.9,
          opacity: 0.3,
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 80%",
            end: "top 100px",
            scrub: true,
          },
        });
      }
    });
  }, container.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section ref="container" class="teach-section" id="who-i-help" data-step="1">
    <div class="content-limit">
      <h2 class="section-title">{{ t("who.section_title") }}</h2>

      <div class="stack-wrapper">
        <div
          v-for="(student, index) in students"
          :key="index"
          class="student-card"
        >
          <div :class="['card-inner', `theme-${locale}`]">
            <div class="card-image">
              <img
                :src="student.image"
                :alt="t(`who.students.${student.key}.title`)"
              />
            </div>
            <div class="card-content">
              <h3 class="card-title">
                {{ t(`who.students.${student.key}.title`) }}
              </h3>
              <p class="card-text">
                {{ t(`who.students.${student.key}.description`) }}
              </p>
              <div class="tag-group">
                <span v-for="tagKey in student.tags" :key="tagKey" class="tag">
                  {{ t(`who.students.${student.key}.tags.${tagKey}`) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.teach-section {
  position: relative;
  background-color: #f2f2f2;
  padding: 6rem 1.5rem 0 1.5rem;
  z-index: 5;
}

.content-limit {
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  text-align: center;
  margin-bottom: 5rem;
  color: var(--text-dark);
}

.stack-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.student-card {
  width: 100%;
  margin-bottom: 40vh;
  display: flex;
  justify-content: center;
}

.card-inner {
  /* Removed static white background to allow themes to work */
  border: 4px solid var(--text-dark);
  box-shadow: 12px 12px 0px var(--text-dark);
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
  gap: 3rem;
  padding: 3.5rem;
  width: 100%;
  transform-origin: center top;
  backface-visibility: hidden;
  transition: background-color 0.4s ease; /* Smooth color shift on lang change */
}

/* Theme color logic integrated */
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

.card-image img {
  width: 100%;
  max-height: 350px;
  object-fit: contain;
}

.card-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 1.5rem;
}

.card-text {
  font-family: var(--font-main);
  font-size: 1.15rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: var(--text-dark);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
}

@media (max-width: 850px) {
  .card-inner {
    grid-template-columns: 1fr;
    padding: 2rem;
    gap: 1.5rem;
    text-align: center;
  }
  .tag-group {
    justify-content: center;
  }
  .student-card {
    margin-bottom: 30vh;
  }
}
</style>
