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
  margin-top: -2rem;
  width: 100%;
  padding-inline: 1rem;
}

.hero-title {
  font-family: var(--font-display);
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.hero-copy {
  font-family: var(--font-main);
  font-size: 1.1rem;
  color: var(--text-dark);
  margin-top: -1rem;
  line-height: 1.2;
}

.hero-btn {
  font-family: var(--font-main);
  font-weight: 800;
  padding: 1rem 2.5rem;
  background: var(--text-dark);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 2rem;
  transition: transform 0.3s ease;
}

.hero-btn:hover {
  transform: scale(1.05);
}

@media (width >= 768px) {
  .hero-title {
    font-size: 5rem;
  }
  .hero-copy {
    font-size: 1.25rem;
  }
}

@media (width >= 1024px) {
  .hero-title {
    font-size: 7rem;
  }

  .hero-copy {
    width: 75%;
    margin-inline: auto;
  }
}
</style>
