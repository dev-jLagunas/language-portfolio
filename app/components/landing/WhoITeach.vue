<script setup>
const { locale } = useI18n();
const { $gsap } = useNuxtApp();
const container = ref(null);
let ctx;

const students = [
  {
    image: "/images/characters/char-student.png",
    title: "The Test-Taker",
    description:
      "Preparing for Eiken, TOEFL, or TOEIC? We don't just 'study'—we build the specific mental models, time-management frameworks, and vocabulary systems needed to crush your target score.",
    tags: ["Eiken Prep", "Test Strategy", "Academic Writing"],
  },
  {
    image: "/images/characters/char-business-man.png",
    title: "The Professional",
    description:
      "High-stakes presentations, quarterly reviews, or daily international meetings? We refine your professional voice to ensure you command the room. We focus on 'Business EQ'.",
    tags: ["Business English", "Public Speaking", "Corporate EQ"],
  },
  {
    image: "/images/characters/char-traveller.png",
    title: "The Explorer",
    description:
      "Heading abroad for a holiday, a move, or a sabbatical? We focus on practical, high-agency communication. From navigating local logistics to deep-dive conversations.",
    tags: ["Travel Essentials", "Survival English", "Cultural Nuance"],
  },
  {
    image: "/images/characters/char-young-student.png",
    title: "The Next Gen",
    description:
      "Building a rock-solid foundation for younger learners. Using high-interest topics and a 'Systems First' approach, we make language acquisition natural and highly effective.",
    tags: ["Natural Acquisition", "Confidence Building", "Interactive"],
  },
];

onMounted(() => {
  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".student-card");

    cards.forEach((card, i) => {
      // 1. The Pinning Logic
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

      // 2. The Scaling/Fade Logic
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
  <section ref="container" class="teach-section">
    <div class="content-limit">
      <h2 class="section-title">Who I Help</h2>

      <div class="stack-wrapper">
        <div
          v-for="(student, index) in students"
          :key="index"
          class="student-card"
        >
          <div :class="['card-inner', `theme-${locale}`]">
            <div class="card-image">
              <img :src="student.image" :alt="student.title" />
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ student.title }}</h3>
              <p class="card-text">{{ student.description }}</p>
              <div class="tag-group">
                <span v-for="tag in student.tags" :key="tag" class="tag">{{
                  tag
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
