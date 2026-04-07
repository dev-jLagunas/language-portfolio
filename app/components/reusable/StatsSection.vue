<script setup>
// We create the source array once.
const sourceStats = [
  { number: "10+", label: "Years Experience" },
  { number: "1,000+", label: "Students Taught" },
  { number: "4", label: "Languages Spoken" },
  { number: "10", label: "Years in Japan" },
  { number: "3", label: "Global Corps Coached" },
  { number: "1", label: "Published Author" },
  { number: "N2", label: "JLPT Certified" },
  { number: "3–87", label: "Student Age Range" },
  { number: "50+", label: "Largest Class Size" },
  { number: "100%", label: "Remote Coaching" },
];

// Nuxt/Vue handles the duplication: We combine the array with itself.
// This is required for the infinite loop CSS trick.
const statsList = [...sourceStats, ...sourceStats];
</script>

<template>
  <section class="marquee" aria-label="Key performance statistics">
    <div class="marquee-track">
      <div
        v-for="(stat, index) in statsList"
        :key="`${stat.label}-${index}`"
        class="stat-card"
      >
        <span class="stat-number">{{ stat.number }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* --- Marquee Container --- */
.marquee {
  width: 100%;
  padding: 1em 0;
  /* Subtle backdrop */
  background-color: #f2f2f2;
  overflow: hidden; /* Hide the overflow on the left/right */
  position: relative;
  /* Optional: Adds a subtle mask/fade effect on the edges */
  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 0) 100%
  );
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 1) 90%,
    rgba(0, 0, 0, 0) 100%
  );
  margin-top: 4rem;
}

/* --- The Flexbox Track (Moves) --- */
.marquee-track {
  display: flex;
  align-items: center;
  /* Gap between individual stat cards */
  gap: 2rem;
  /* Calculate the width to fit 20 items + gaps */
  width: calc((200px * 20) + (2rem * 19));
  /* Define and execute the infinite scroll animation */
  animation: scrollMarquee 40s linear infinite;

  /* UX Polish: Pauses when user hovers or taps on a mobile screen */
  &:hover {
    animation-play-state: paused;
  }
}

/* --- Individual Stat Card Structure --- */
.stat-card {
  /* Fix the width of each card so the marquee math is predictable */
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background-color: #f2f2f2;
}

/* --- Typography (Matching your Brand Vibe) --- */
.stat-number {
  font-family: "DM Serif Display", serif;
  font-size: 2rem;
  line-height: 1;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-family: "Source Sans 3", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
  color: var(--text-dark);
  white-space: nowrap; /* Prevent label text wrapping */
}

/* --- The Animation Logic --- */
@keyframes scrollMarquee {
  0% {
    /* Start at zero */
    transform: translateX(0);
  }
  100% {
    /* Scroll exactly half of the duplicated list's total width */
    transform: translateX(
      calc(-100px * 20)
    ); /* Total cards (20) * Half width (100) */
  }
}

/* --- Mobile Responsiveness --- */
@media (width < 768px) {
  .marquee {
    padding: 0rem 0;
    margin-top: 4rem;
  }
  .stat-card {
    flex: 0 0 160px; /* Narrower cards on small screens */
  }
  .stat-number {
    font-size: 1.5rem;
  }
  .stat-label {
    font-size: 0.75rem;
  }
  @keyframes scrollMarquee {
    100% {
      /* Adjust calculation for mobile card width (160px) */
      transform: translateX(calc(-80px * 20));
    }
  }
}
</style>
