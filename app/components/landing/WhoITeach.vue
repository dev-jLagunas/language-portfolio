<script setup>
const { locale, t } = useI18n();
const { $gsap } = useNuxtApp();
const container = ref(null);
let ctx;

const students = [
  {
    key: "hobbyist",
    image: "/images/characters/avatar-grandma.png",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    key: "professional",
    image: "/images/characters/avatar-businesswoman.png",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    key: "explorer",
    image: "/images/characters/avatar-expat.png",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    key: "next_gen",
    image: "/images/characters/avatar-prof.png",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    key: "test_taker",
    image: "/images/characters/char-student.png",
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
          opacity: 0.1,
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
    <div class="texture-grid"></div>

    <div class="content-limit">
      <h2 class="section-title">{{ t("who.section_title") }}</h2>

      <div class="stack-wrapper">
        <div
          v-for="(student, index) in students"
          :key="index"
          class="student-card"
        >
          <div :class="['card-inner', `theme-${locale}`]">
            <img
              src="/images/avatars/avatar-guiding.png"
              class="guiding-avatar"
              alt=""
              aria-hidden="true"
            />

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
  background-color: var(--bg-main);
  padding: 6rem var(--space-unit) 0 var(--space-unit);
  z-index: 5;
  overflow: hidden;
}

.content-limit {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  z-index: 2;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  text-align: center;
  color: var(--text-dark);
  margin-bottom: 2rem;
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
  position: relative;
  border: var(--brutalist-border-thick);
  box-shadow: var(--shadow-lg);
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
  gap: 3rem;
  padding: 3.5rem;
  width: 100%;
  transform-origin: center top;
  backface-visibility: hidden;
  transition: background-color 0.4s ease;
}

.guiding-avatar {
  position: absolute;
  bottom: -100px;
  left: -50px;
  height: 150px;
  z-index: 10;
  pointer-events: none;
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

.card-image img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.card-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

.card-text {
  font-family: var(--font-main);
  font-size: 1.15rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: var(--text-dark);
  color: var(--text-light);
  padding: 0.6rem 1rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

/* =========================
   MEDIA QUERIES (iPhone 13 / Mobile Fix)
   ========================= */
@media (width <= 850px) {
  .student-card {
    margin-bottom: 30vh;
  }

  .card-inner {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1rem;
    text-align: center;
  }

  .guiding-avatar {
    height: 120px;
    left: -50px;
    bottom: -70px;
  }

  .card-image img {
    max-height: 180px;
  }

  .card-title {
    margin-bottom: 0.75rem;
    font-size: 1.6rem;
  }

  .card-text {
    font-size: 1rem;
    margin-bottom: 1.25rem;
    line-height: 1.4;
  }

  .tag-group {
    justify-content: center;
  }

  .tag {
    padding: 0.4rem 0.8rem;
    font-size: 0.65rem;
  }
}
</style>
