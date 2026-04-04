<script setup>
const students = [
  {
    image: "/images/characters/char-student.png",
    title: "The Test-Taker",
    description:
      "Preparing for Eiken, TOEFL, or TOEIC? We don't just 'study'—we build the specific mental models, time-management frameworks, and vocabulary systems needed to crush your target score. Whether you are aiming for Grade 1 or a 100+ TOEFL, I provide the roadmap to get there.",
    tags: ["Eiken Prep", "Test Strategy", "Academic Writing"],
  },
  {
    image: "/images/characters/char-business-man.png",
    title: "The Professional",
    description:
      "High-stakes presentations, quarterly reviews, or daily international meetings? We refine your professional voice to ensure you command the room. We focus on 'Business EQ'—the ability to navigate nuance and culture just as fluently as the language itself.",
    tags: ["Business English", "Public Speaking", "Corporate EQ"],
  },
  {
    image: "/images/characters/char-traveller.png",
    title: "The Explorer",
    description:
      "Heading abroad for a holiday, a move, or a sabbatical? We focus on practical, high-agency communication. From navigating local logistics to deep-dive conversations with locals, you'll learn to handle any situation with total self-reliance and confidence.",
    tags: ["Travel Essentials", "Survival English", "Cultural Nuance"],
  },
  {
    image: "/images/characters/char-young-student.png",
    title: "The Next Gen",
    description:
      "Building a rock-solid foundation for younger learners. Using high-interest topics and a 'Systems First' approach, we make language acquisition natural and highly effective. No boring rote memorization—just progress through engagement and real conversation.",
    tags: ["Natural Acquisition", "Confidence Building", "Interactive"],
  },
];
</script>

<template>
  <section class="teach-section">
    <div class="container">
      <h2 class="section-title">Who I Help</h2>

      <div class="student-grid">
        <div
          v-for="(student, index) in students"
          :key="index"
          class="student-card"
        >
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
  </section>
</template>

<style scoped>
.teach-section {
  padding: 6rem 1.5rem;
  background: white;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.section-title {
  font-family: "DM Serif Display", serif;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  color: var(--text-dark);
}

.student-grid {
  display: flex;
  flex-direction: column;
  gap: 6rem; /* Increased gap for better breathing room without animations */
}

.student-card {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  align-items: center;
  gap: 3rem;
}

.card-image img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.card-title {
  font-family: "DM Serif Display", serif;
  font-size: 2.25rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.card-text {
  font-family: "Source Sans 3", sans-serif;
  font-size: 1.15rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #333;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  /* Flipped color scheme as requested */
  background: var(--text-dark);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-family: "Source Sans 3", sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

/* Zig-zag layout for desktop */
@media (min-width: 768px) {
  .student-card:nth-child(even) {
    direction: rtl;
  }
  .student-card:nth-child(even) .card-content {
    direction: ltr;
    text-align: right;
  }
  .student-card:nth-child(even) .tag-group {
    justify-content: flex-end;
  }
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .student-card {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
  .tag-group {
    justify-content: center;
  }
  .section-title {
    font-size: 2.5rem;
  }
}
</style>
