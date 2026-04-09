<template>
  <div class="hero-content">
    <h1 class="hero-title">{{ $t("hero.content.title") }}</h1>
    <p class="hero-copy">
      {{ $t("hero.content.copy") }}
    </p>
    <button class="hero-btn">{{ $t("hero.content.cta") }}</button>
  </div>
</template>

<style scoped>
.hero-content {
  text-align: center;
  z-index: 20;
  margin-top: -8rem;
  width: 100%;
  padding-inline: var(--space-unit);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1.1;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.hero-copy {
  font-family: var(--font-main);
  font-size: 1.1rem;
  color: var(--text-dark);
  margin-top: -0.5rem;
  line-height: 1.3;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-main);
  font-weight: 900;
  padding: 1rem 2.5rem;
  background: var(--text-dark);
  color: var(--text-light);
  border: none;
  /* Maintains your 8px aesthetic while utilizing system font/color */
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.hero-btn:hover {
  transform: translateY(-3px);
  /* Integrating system shadow for the hover "pop" */
  box-shadow: var(--shadow-md);
}

/* =========================
   MEDIA QUERIES
   ========================= */
@media (width >= 768px) {
  .hero-title {
    /* Scale logic mapped to system display tokens */
    font-size: 4rem;
  }

  .hero-copy {
    font-size: 1.25rem;
  }
}

@media (width >= 1024px) {
  .hero-title {
    font-size: 5.5rem;
  }

  .hero-copy {
    margin-inline: auto;
    padding-inline: 4rem;
  }
}

@media (width >= 1440px) {
  .hero-title {
    font-size: 7rem;
  }
}
</style>
