<script setup>
const { $gsap } = useNuxtApp();
const sectionRef = ref(null);
let ctx;

const resources = [
  {
    title: "Juan & Moe's Language Switch",
    type: "Learning / YT",
    desc: "Real-time language challenges and breakdown scripts. Seeing the system in action.",
    link: "#",
    btnText: "Watch Channel",
    img: "/images/avatars/avatar-pointing.png",
  },
  {
    title: "The English Lab (Official)",
    type: "Education / YT",
    desc: "Deep dives into the linguistics and systems behind high-speed language acquisition.",
    link: "#",
    btnText: "Watch Channel",
    img: "/images/avatars/avatar-thumbs-up.png",
  },
  {
    title: "Product & UX Portfolio",
    type: "Systems / Design",
    desc: "The architectural thinking applied to digital products, now applied to language.",
    link: "#",
    btnText: "View Portfolio",
    img: "/images/characters/char-professional.png",
  },
  {
    title: "Behance Case Studies",
    type: "Visual Strategy",
    desc: "Visual breakdowns of design systems and brand identities created over the last decade.",
    link: "#",
    btnText: "View Behance",
    img: "/images/characters/char-student.png",
  },
  {
    title: "Medium Blog",
    type: "Writing / Logic",
    desc: "Articles on UX, pedagogy, and the intersection of systems architecture and life.",
    link: "#",
    btnText: "Read Articles",
    img: "/images/characters/char-traveller.png",
  },
  {
    title: "Unsplash Photography",
    type: "Visual / Aesthetic",
    desc: "High-quality captures from life in Ishikawa and beyond. 1M+ views globally.",
    link: "#",
    btnText: "View Gallery",
    img: "/images/characters/char-young-student.png",
  },
];

const secondaryLinks = [
  { name: "GitHub", link: "#", icon: "ph:github-logo" },
  { name: "Instagram", link: "#", icon: "ph:instagram-logo" },
];

onMounted(() => {
  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".resource-card");

    cards.forEach((card) => {
      $gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: card,
          start: "top 92%", // Fires as the card peeks into view
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
  <section ref="sectionRef" class="beyond-lab">
    <div class="container">
      <div class="header-flex">
        <h2 class="section-title">Beyond the Lab</h2>
        <div class="social-pills">
          <a
            v-for="s in secondaryLinks"
            :key="s.name"
            :href="s.link"
            class="pill"
          >
            {{ s.name }}
          </a>
        </div>
      </div>

      <div class="resource-grid">
        <div v-for="item in resources" :key="item.title" class="resource-card">
          <div class="card-visual">
            <img :src="item.img" :alt="item.title" loading="lazy" />
          </div>
          <div class="card-info">
            <span class="type-tag">{{ item.type }}</span>
            <h3 class="resource-title">{{ item.title }}</h3>
            <p class="resource-desc">{{ item.desc }}</p>
            <a :href="item.link" class="resource-link">
              {{ item.btnText }} <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.beyond-lab {
  padding: 100px 20px;
  background: #ffffff;
  border-top: 1px solid #eee;
  position: relative;
  z-index: 40; /* High z-index to stay above previous layers */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
  border-bottom: 2px solid var(--text-dark);
  padding-bottom: 1rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin: 0;
}

.social-pills {
  display: flex;
  gap: 0.5rem;
}

.pill {
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  padding: 6px 16px;
  border: 1px solid var(--text-dark);
  color: var(--text-dark);
  text-decoration: none;
  border-radius: 100px;
  transition: all 0.2s ease;
}

.pill:hover {
  background: var(--text-dark);
  color: white;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 1.5rem;
}

.resource-card {
  background: #fcfcfc;
  border: 1px solid #eee;
  display: flex;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.resource-card:hover {
  border-color: var(--text-dark);
  box-shadow: 6px 6px 0px var(--text-dark); /* Subtle Brutalist hover */
}

.card-visual {
  width: 35%;
  background: #f0f0f0;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.card-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* FLIPPED LOGIC: Color by default */
  filter: grayscale(0%);
  transition: filter 0.4s ease;
}

.resource-card:hover .card-visual img {
  /* FLIPPED LOGIC: Grayscale on hover */
  filter: grayscale(100%);
}

.card-info {
  width: 65%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.type-tag {
  font-family: var(--font-main);
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 0.5rem;
}

.resource-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.resource-desc {
  font-family: var(--font-main);
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.resource-link {
  font-family: var(--font-main);
  font-weight: 800;
  font-size: 0.85rem;
  text-transform: uppercase;
  color: var(--text-dark);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.resource-link span {
  transition: transform 0.2s ease;
}

.resource-card:hover .resource-link span {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .header-flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .resource-card {
    flex-direction: column;
  }
  .card-visual,
  .card-info {
    width: 100%;
  }
  .card-visual {
    height: 150px;
  }
}
</style>
