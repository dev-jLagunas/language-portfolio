<template>
  <div class="app-wrapper">
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
