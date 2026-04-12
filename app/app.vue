<script setup>
const { currentTheme } = useTheme();
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <div :class="['app-wrapper', isMounted ? currentTheme : 'theme-en']">
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

.app-wrapper.theme-en {
  background-color: var(--color-en);
}
.app-wrapper.theme-es {
  background-color: var(--color-es);
}
.app-wrapper.theme-jp {
  background-color: var(--color-jp);
}
.app-wrapper.theme-fr {
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
