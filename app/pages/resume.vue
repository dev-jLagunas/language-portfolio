<script setup>
import { ref } from "vue";

const jobs = [
  {
    id: 1,
    year: "2024 — Present",
    role: "Product Designer & Systems Architect",
    company: "Current",
    color: "var(--color-en)",
    image: "/images/placeholders/arch-1.jpg",
    desc: "Turning disorganized problems into structured, usable, and scalable solutions. Specializing in UX/UI design, design systems, and information architecture.",
  },
  {
    id: 2,
    year: "2022 — 2024",
    role: "Frontend & UI Developer",
    company: "Freelance",
    color: "var(--color-es)",
    image: "/images/placeholders/dev-1.jpg",
    desc: "Building highly interactive interfaces. Hands-on experience translating design systems into code using HTML, CSS, JavaScript, Vue, Nuxt, and Tailwind.",
  },
  {
    id: 3,
    year: "2018 — 2022",
    role: "Cafe Owner & Operator",
    company: "Ishikawa, Japan",
    color: "var(--color-jp)",
    image: "/images/placeholders/cafe-1.jpg",
    desc: "Managed end-to-end business operations, customer experience, and spatial design in a high-accountability, autonomous environment.",
  },
  {
    id: 4,
    year: "2014 — 2018",
    role: "Linguistics",
    company: "UC San Diego",
    color: "var(--color-fr)",
    image: "/images/placeholders/edu-1.jpg",
    desc: "Analyzed complex structural systems and cognitive patterns. JLPT N2 certified in Japanese. Fluent in English and Spanish.",
  },
];

const activeIndex = ref(0);

const nextJob = () => {
  if (activeIndex.value < jobs.length - 1) activeIndex.value++;
};

const prevJob = () => {
  if (activeIndex.value > 0) activeIndex.value--;
};

const setJob = (index) => {
  activeIndex.value = index;
};

const getCardClass = (index) => {
  if (index === activeIndex.value) return "is-active";
  if (index === activeIndex.value - 1) return "is-prev";
  if (index === activeIndex.value + 1) return "is-next";
  if (index < activeIndex.value - 1) return "is-hidden-left";
  if (index > activeIndex.value + 1) return "is-hidden-right";
};
</script>

<template>
  <main class="app resume-page">
    <div class="texture-grid"></div>

    <section class="section-wrapper resume-header flex-between">
      <div>
        <h1 class="display-xl">The Timeline.</h1>
        <p class="pre-title">Career Architecture</p>
      </div>

      <a
        href="/docs/Juan_Lagunas_Resume.pdf"
        download
        class="b-button download-btn"
      >
        <span>Download PDF</span>
        <span class="icon">↓</span>
      </a>
    </section>

    <section class="carousel-section">
      <div class="carousel-container">
        <button
          class="b-button nav-btn prev-btn"
          @click="prevJob"
          :disabled="activeIndex === 0"
          aria-label="Previous role"
        >
          ←
        </button>
        <button
          class="b-button nav-btn next-btn"
          @click="nextJob"
          :disabled="activeIndex === jobs.length - 1"
          aria-label="Next role"
        >
          →
        </button>

        <div
          v-for="(job, index) in jobs"
          :key="job.id"
          :class="['b-card', 'job-card', getCardClass(index)]"
          @click="setJob(index)"
        >
          <div class="card-header" :style="{ backgroundColor: job.color }">
            <span class="job-id">0{{ job.id }}</span>
            <span class="job-year">{{ job.year }}</span>
          </div>

          <div class="card-image-slot">
            <img v-if="job.image" :src="job.image" :alt="job.company" />
            <div v-else class="img-placeholder-pattern"></div>
          </div>

          <div class="card-body">
            <h2 class="pre-title company-name">{{ job.company }}</h2>
            <h3 class="section-title role-title">{{ job.role }}</h3>
            <p class="ui-text job-desc">{{ job.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.resume-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.resume-header {
  padding-bottom: 2rem;
  position: relative;
  z-index: 10;
}

.download-btn {
  font-size: 0.9rem;
  padding: 1.2rem 2.5rem;
}

.download-btn .icon {
  font-family: var(--font-display);
  font-size: 1.2rem;
}

/* =========================
   CAROUSEL ARCHITECTURE
   ========================= */
.carousel-section {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  overflow: hidden;
}

.carousel-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  z-index: 5;
}

/* =========================
   NAVIGATION BUTTONS
   ========================= */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  z-index: 20;
  border: var(--brutalist-border-thick);
}

.prev-btn {
  left: 1rem;
}
.next-btn {
  right: 1rem;
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  box-shadow: none;
  transform: translateY(-50%);
}
.nav-btn:disabled:hover {
  transform: translateY(-50%);
}

/* =========================
   THE CARDS
   ========================= */
.job-card {
  position: absolute;
  width: 100%;
  max-width: 420px;
  height: 500px;
  display: flex;
  flex-direction: column;
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;
  cursor: pointer;
  background: var(--bg-card);
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: var(--brutalist-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.job-id {
  font-family: var(--font-main);
  font-weight: 900;
  font-size: 1.2rem;
}

.job-year {
  font-family: var(--font-main);
  font-weight: 800;
  font-size: 0.9rem;
  text-transform: uppercase;
  padding: 4px 12px;
  background: var(--bg-card);
  border: 2px solid var(--text-dark);
  border-radius: 50px;
}

/* Image Slot */
.card-image-slot {
  width: 100%;
  height: 180px;
  border-bottom: var(--brutalist-border);
  background: var(--bg-main);
  position: relative;
  overflow: hidden;
}

.card-image-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%) contrast(1.2);
  transition: filter 0.4s ease;
}

.img-placeholder-pattern {
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(
    45deg,
    var(--text-dark) 0,
    var(--text-dark) 2px,
    transparent 2px,
    transparent 8px
  );
  opacity: 0.1;
}

.card-body {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.company-name {
  margin-bottom: 0.5rem;
}

.role-title {
  font-size: clamp(1.6rem, 3vw, 2rem);
  margin-bottom: 1rem;
  line-height: 1.1;
}

.job-desc {
  font-size: 1rem;
  opacity: 0.8;
}

/* =========================
   COVER FLOW MATH CLASSES
   ========================= */
.is-active {
  transform: translateX(0) scale(1);
  opacity: 1;
  z-index: 10;
  box-shadow: var(--shadow-xl);
  cursor: default;
}

/* Hover effects for the active card */
.is-active .card-image-slot img {
  filter: grayscale(0%) contrast(1);
}

.is-prev {
  transform: translateX(-80%) scale(0.7); /* Smaller scale (was 0.85) */
  opacity: 0.3; /* Less opaque (was 0.5) */
  z-index: 5;
}

.is-next {
  transform: translateX(80%) scale(0.7); /* Smaller scale (was 0.85) */
  opacity: 0.3; /* Less opaque (was 0.5) */
  z-index: 5;
}

.is-hidden-left {
  transform: translateX(-150%) scale(0.6);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}

.is-hidden-right {
  transform: translateX(150%) scale(0.6);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}

.job-card.is-prev:hover,
.job-card.is-next:hover {
  opacity: 0.9;
  transform: translateX(var(--hover-x, 0)) scale(0.88);
}
.job-card.is-prev:hover {
  --hover-x: -75%;
}
.job-card.is-next:hover {
  --hover-x: 75%;
}

/* =========================
   MEDIA QUERIES
   ========================= */
@media (width <= 768px) {
  .resume-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .carousel-section {
    padding-bottom: 6rem; /* Ensure space for buttons */
  }

  .carousel-container {
    height: 480px;
  }

  .job-card {
    max-width: 300px;
    height: 440px;
  }

  .card-image-slot {
    height: 140px;
  }

  /* Reposition nav buttons below the cards on mobile */
  .nav-btn {
    width: 45px;
    height: 45px;
    top: auto;
    bottom: -60px;
    transform: none !important;
  }

  .prev-btn {
    left: 30%;
  }
  .next-btn {
    right: 30%;
  }

  .is-prev {
    transform: translateX(-65%) scale(0.8);
  }
  .is-next {
    transform: translateX(65%) scale(0.8);
  }
}
</style>
