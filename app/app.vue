<script setup>
const { currentTheme, isChangingLanguage } = useTheme();
</script>

<template>
  <div
    :class="[
      'app-wrapper',
      currentTheme,
      { 'is-transitioning': isChangingLanguage },
    ]"
  >
    <TheNavbar />
    <TheMobileNavbar />

    <NuxtPage />

    <TheFooter />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  background-color: #f2f2f2;
  color: var(--text-dark);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  z-index: 0;
  transition: background-color 0.4s ease;
}

.app-wrapper.is-transitioning {
  opacity: 0.8;
}

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

.app {
  position: relative;
  background: transparent;
  z-index: 2;
}

html {
  scroll-behavior: smooth;
}
</style>
