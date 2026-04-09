<script setup>
const { t } = useI18n();

const sourceStats = [
  { number: "10+", key: "years_experience" },
  { number: "1,000+", key: "students_taught" },
  { number: "4", key: "languages_spoken" },
  { number: "10", key: "years_japan" },
  { number: "3", key: "global_corps" },
  { number: "1", key: "published_author" },
  { number: "N2", key: "jlpt_certified" },
  { number: "3–87", key: "age_range" },
  { number: "50+", key: "class_size" },
  { number: "100%", key: "remote_coaching" },
];

const statsList = [...sourceStats, ...sourceStats];
</script>

<template>
  <section class="marquee" :aria-label="t('stats.section_label')">
    <div class="marquee-track">
      <div
        v-for="(stat, index) in statsList"
        :key="`${stat.key}-${index}`"
        class="stat-card"
      >
        <span class="stat-number">{{ stat.number }}</span>
        <span class="stat-label">{{ t(`stats.labels.${stat.key}`) }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  width: 100%;
  padding: 1em 0;
  background-color: var(--bg-main);
  overflow: hidden;
  position: relative;
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

.marquee-track {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: calc((200px * 20) + (2rem * 19));
  animation: scrollMarquee 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
}

.stat-card {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background-color: var(--bg-main);
}

.stat-number {
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 1;
  color: var(--text-dark);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-family: var(--font-main);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
  color: var(--text-dark);
  white-space: nowrap;
}

@keyframes scrollMarquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100px * 20));
  }
}

/* =========================
   MEDIA QUERIES
   ========================= */
@media (width <= 768px) {
  .marquee {
    padding: 0rem 0;
    margin-top: 4rem;
  }

  .stat-card {
    flex: 0 0 160px;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .stat-label {
    font-size: 0.75rem;
  }

  @keyframes scrollMarquee {
    100% {
      transform: translateX(calc(-80px * 20));
    }
  }
}
</style>
