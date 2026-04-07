<script setup lang="ts">
import TheContactSection from "./components/landing/TheContactSection.vue";
</script>

<template>
  <div class="app-wrapper">
    <main class="app">
      <TheNavbar />
      <ReusableStatsSection />
      <LandingTheHero />
      <LandingWhoITeach />
      <LandingTheFramework />
      <LandingTheTestimonials />
      <LandingTheSocialProof />
      <TheMobileNavbar />
      <TheContactSection />
      <TheFooter />
    </main>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  /* Move the background color here so it's the absolute bottom layer */
  background-color: #f2f2f2;
}

.app-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  /* Force this to be the parent stacking context */
  z-index: 0;
}

.app {
  position: relative;
  /* IMPORTANT: If any child section has a background color, 
     it will cover the icons. Keep the main container transparent. */
  background: transparent;
  z-index: 2;
}

/* Temporary Debug: If you still see nothing, 
   uncomment this to force the texture to the front */
/* .texture-layer {
  z-index: 9999 !important;
  pointer-events: none;
} 
*/
</style>
