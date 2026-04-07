<script setup lang="ts">
const TOTAL_SECTIONS = 5;
</script>

<template>
  <div class="app-wrapper">
    <TheNavbar />
    <TheMobileNavbar />
    <ReusableScrollNavigator :total="TOTAL_SECTIONS" />
    <ReusableBackToTop />

    <main class="app">
      <ReusableStatsSection />
      <LandingTheHero />

      <LandingWhoITeach />
      <LandingTheFramework />
      <LandingTheTestimonials />
      <LandingTheSocialProof />
      <LandingTheContactSection />

      <TheFooter />
    </main>
  </div>
</template>

<style>
/* Reset and Global Base */
html,
body {
  margin: 0;
  padding: 0;
  background-color: #f2f2f2;
  color: var(--text-dark);
  /* Smoothing for the Brutalist sharp lines */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  z-index: 0;
}

.app {
  position: relative;
  background: transparent;
  z-index: 2;
}

/* Ensure smooth scrolling across the whole OS context */
html {
  scroll-behavior: smooth;
}
</style>
