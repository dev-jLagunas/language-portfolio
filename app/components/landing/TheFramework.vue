<script setup>
const { locale } = useI18n();

const steps = [
  {
    number: "1",
    icon: "bi bi-search",
    title: "System Audit",
    label: "Discovery & Analysis",
    description:
      "We don't just guess. I map your current linguistic hurdles, analyze your existing study habits, and define high-agency, measurable goals specific to your needs.",
  },
  {
    number: "2",
    icon: "bi bi-layers-half",
    title: "The Architecture",
    label: "Custom Curriculum Design",
    description:
      "I design a proprietary 'Language Lab' for you. This is your custom-built architecture—whether it’s Eiken Prep, Business Negotiation, or Survival English—complete with curated systems.",
  },
  {
    number: "3",
    icon: "bi bi-rocket-takeoff",
    title: "The Switch",
    label: "Active Coaching & Execution",
    description:
      "This is where we execute. Active coaching sessions, real-world application, and continuous feedback loops move you from simply 'learning' to 'operating' in the target language.",
  },
];
</script>

<template>
  <section :class="['framework', `theme-${locale}`]">
    <div class="container">
      <h2 class="section-title">The English Lab</h2>
      <p class="section-subtitle">
        A Proprietary 3-Step Framework for Accelerated Mastery
      </p>

      <div class="steps-grid">
        <div v-for="(step, index) in steps" :key="index" class="step-card">
          <div class="step-meta">
            <span class="step-number">{{ step.number }}</span>
            <div class="step-icon">
              <i :class="step.icon" aria-hidden="true"></i>
            </div>
          </div>

          <div class="step-content">
            <h3 class="step-title">{{ step.title }}</h3>
            <span class="step-label">{{ step.label }}</span>
            <p class="step-description">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.framework {
  padding: 8rem 1.5rem;
  /* Ensure this matches your global transition timing */
  transition: background-color 0.4s ease;
  position: relative;
  overflow: hidden;
}

/* FIX: Mapping the theme classes to your global CSS Variables.
  Make sure these variables are defined in your assets/main.css 
*/
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

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-family: "DM Serif Display", serif;
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-dark);
}

.section-subtitle {
  font-family: "Source Sans 3", sans-serif;
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 6rem;
  opacity: 0.8;
  color: var(--text-dark);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  position: relative;
}

.step-card {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.step-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.step-number {
  font-family: "DM Serif Display", serif;
  font-size: 7rem;
  line-height: 1;
  color: var(--text-dark);
  opacity: 0.05;
  position: absolute;
  top: -20px;
}

.step-icon {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid var(--text-dark);
  border-radius: 20px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
}

.step-icon i {
  font-size: 2.5rem;
  color: var(--text-dark);
}

.step-title {
  font-family: "DM Serif Display", serif;
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
}

.step-label {
  font-family: "Source Sans 3", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  display: block;
}

.step-description {
  font-family: "Source Sans 3", sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

@media (max-width: 900px) {
  .steps-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .step-card {
    text-align: center;
  }

  .step-number {
    position: relative;
    font-size: 4rem;
    opacity: 0.1;
    top: 0;
  }

  .step-icon {
    margin-top: -20px;
  }
}
</style>
