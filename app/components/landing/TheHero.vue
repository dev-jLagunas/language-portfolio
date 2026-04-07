<script setup>
const { locale } = useI18n();
</script>

<template>
  <section :class="['hero', `theme-${locale}`]">
    <div class="hero-container">
      <LandingHeroAnimation />
      <LandingHeroContent />
    </div>
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
}

.hero-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}

@media (width >= 600px) {
  .hero-container {
    margin-top: 4rem;
  }
}
</style>
