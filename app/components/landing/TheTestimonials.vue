<script setup>
const { locale } = useI18n();
const { $gsap } = useNuxtApp();
const sectionRef = ref(null);
let ctx;

const testimonials = [
  {
    name: "Hiroki T.",
    role: "Project Manager",
    image: "/images/characters/char-business-man.png",
    story:
      "I had almost given up on my TOEFL score after three failed attempts. Juan didn't just teach me English; he taught me a system to manage the test pressure. Knowing he understood my native language gave me the confidence to finally push through.",
  },
  {
    name: "Elena R.",
    role: "Graduate Student",
    image: "/images/characters/char-student.png",
    story:
      "Moving abroad is terrifying. Juan coached me through the academic requirements, but having a teacher who actually understood the logistics of a global move made all the difference.",
  },
  {
    name: "Kenji S.",
    role: "Business Director",
    image: "/images/characters/char-traveller.png",
    story:
      "I needed to lead meetings with our European branch. Juan focused on 'Business EQ'. He understands the nuances of how we communicate, which allowed him to bridge the gap between my thoughts and my English delivery perfectly.",
  },
  {
    name: "Saki W.",
    role: "Parent",
    image: "/images/characters/char-young-student.png",
    story:
      "Most lessons for kids are just games. Juan's approach is different—it's about natural acquisition. My daughter is starting to initiate conversations on her own because the system actually makes sense to her.",
  },
];

onMounted(() => {
  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".testimonial-card");

    cards.forEach((card, i) => {
      $gsap.from(card, {
        y: 60,
        opacity: 0,
        scale: 0.9,
        // Alternating subtle rotation for that "thrown on the table" look
        rotation: i % 2 === 0 ? -2 : 2,
        duration: 0.7,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: card,
          start: "top 90%", // Triggers when the card is 10% from the bottom
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
  <section ref="sectionRef" class="testimonials-section">
    <div class="container">
      <div class="intro">
        <h2 class="title">Success Stories</h2>
        <p class="subtitle">Proof of the System in Action</p>
      </div>

      <div class="testimonial-grid">
        <div
          v-for="(t, index) in testimonials"
          :key="index"
          :class="['testimonial-card', `theme-${locale}`]"
        >
          <div class="card-inner">
            <div class="quote-icon">“</div>
            <p class="story">{{ t.story }}</p>

            <div class="user-meta">
              <div class="avatar-box">
                <img :src="t.image" :alt="t.name" class="avatar" />
              </div>
              <div class="info">
                <span class="name">{{ t.name }}</span>
                <span class="role">{{ t.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Styles remain identical to your previous version */
.testimonials-section {
  padding: 10rem 1.5rem;
  background-color: #f2f2f2;
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
}

.title {
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
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.testimonial-card {
  padding: 3rem;
  border: 4px solid var(--text-dark);
  box-shadow: 12px 12px 0px var(--text-dark);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  background-color: white; /* Fallback */
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

.card-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.quote-icon {
  font-family: var(--font-display);
  font-size: 5rem;
  line-height: 1;
  margin-bottom: -1rem;
  opacity: 0.2;
}

.story {
  font-family: var(--font-display);
  font-size: 1.4rem;
  line-height: 1.4;
  color: var(--text-dark);
  margin-bottom: 2.5rem;
  flex-grow: 1;
}

.user-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding-top: 1.5rem;
}

.avatar-box {
  width: 60px;
  height: 60px;
  background: white;
  border: 2px solid var(--text-dark);
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin-top: 5px;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-family: var(--font-main);
  font-weight: 900;
  font-size: 1.1rem;
  text-transform: uppercase;
}

.role {
  font-family: var(--font-main);
  font-size: 0.85rem;
  font-weight: 700;
  opacity: 0.6;
}

@media (max-width: 900px) {
  .testimonial-grid {
    grid-template-columns: 1fr;
  }
  .testimonial-card {
    padding: 2rem;
  }
}
</style>
