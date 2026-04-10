<script setup lang="ts">
const TOTAL_SECTIONS = 6;
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
      <LandingResumeTimeline />
      <LandingTheSocialProof />
      <LandingTheContactSection />
    </main>
  </div>
</template>
