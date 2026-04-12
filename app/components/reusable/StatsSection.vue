<script setup>
const { t } = useI18n();

const sourceStats = [
  { number: "3+", key: "ux_systems" },
  { number: "600+", key: "professionals_coached" },
  { number: "4", key: "languages_spoken" },
  { number: "10+", key: "years_japan" },
  { number: "N2", key: "jlpt_certified" },
  { number: "5-Pt", key: "core_framework" },
  { number: "UCSD", key: "linguistics" },
  { number: "2", key: "tech_channels" },
  { number: "100%", key: "remote_architecture" },
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
  margin-top: 4rem;
}

.marquee::before,
.marquee::after {
  content: "";
  position: absolute;
  top: 0;
  width: 150px;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.marquee::before {
  left: 0;
  background: linear-gradient(to right, var(--bg-main), transparent);
}

.marquee::after {
  right: 0;
  background: linear-gradient(to left, var(--bg-main), transparent);
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: fit-content;
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
    transform: translateX(-50%);
  }
}

/* =========================
   MEDIA QUERIES
   ========================= */
@media (width <= 768px) {
  .marquee {
    padding: 0.5rem 0;
    margin-top: 3rem;
  }

  .stat-card {
    flex: 0 0 160px;
  }

  .marquee::before,
  .marquee::after {
    width: 60px;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .stat-label {
    font-size: 0.7rem;
  }
}
</style>
