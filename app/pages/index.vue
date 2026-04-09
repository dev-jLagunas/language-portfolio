<script setup lang="ts">
const TOTAL_SECTIONS = 5;
</script>

<template>
  <div>
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
    </main>
  </div>
</template>
