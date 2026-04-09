<script setup>
// Purely architectural now; background logic moved to static CSS
</script>

<template>
  <section class="hero-canvas">
    <div class="system-grid"></div>

    <div class="canvas-specs left-specs">
      <span class="spec-line">LOC // {{ $t("hero.specs.location") }}</span>
      <span class="spec-line">EDU // {{ $t("hero.specs.education") }}</span>
      <span class="spec-line">BIO // {{ $t("hero.specs.bio") }}</span>
    </div>

    <div class="canvas-specs right-specs">
      <span class="spec-line">LVL // {{ $t("hero.specs.level") }}</span>
      <span class="spec-line">EXP // {{ $t("hero.specs.experience") }}</span>
      <span class="spec-line">TYPE // {{ $t("hero.specs.type") }}</span>
    </div>

    <div class="content-wrapper">
      <LandingHeroAnimation />
      <LandingHeroContent />
    </div>
  </section>
</template>

<style scoped>
.hero-canvas {
  width: 100%;
  position: relative;
  background-color: var(--bg-main);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* --- 1. The Fading Grid --- */
.system-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image:
    linear-gradient(var(--text-dark) 1px, transparent 1px),
    linear-gradient(90deg, var(--text-dark) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.03;

  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

/* --- 2. Technical Metadata (The "About Me" Specs) --- */
.canvas-specs {
  display: none;
  position: absolute;
  top: 220px;
  flex-direction: column;
  gap: 10px;
  z-index: 2;
  pointer-events: none;
}

.spec-line {
  font-family: var(--font-main);
  font-size: 0.65rem;
  font-weight: 900;
  color: var(--text-dark);
  opacity: 0.35;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

/* --- 3. Main Container --- */
.content-wrapper {
  max-width: 1400px; /* Aligns with system container width */
  width: 100%;
  margin: 0 auto;
  padding-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 5;
}

/* =========================
   MEDIA QUERIES
   ========================= */
@media (width >= 1024px) {
  .canvas-specs {
    display: flex;
  }
  .left-specs {
    left: 4rem;
  }
  .right-specs {
    right: 4rem;
    text-align: right;
  }
}

@media (width <= 768px) {
  .content-wrapper {
    padding-top: 5rem;
  }
}
</style>
