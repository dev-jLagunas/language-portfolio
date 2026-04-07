<script setup>
const isVisible = ref(false);

const checkScroll = () => {
  isVisible.value = window.scrollY > 400;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<template>
  <button
    v-show="isVisible"
    class="brutal-top-btn"
    @click="scrollToTop"
    aria-label="Back to top"
  >
    <span class="arrow">↑</span>
  </button>
</template>

<style scoped>
.brutal-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 56px;
  height: 56px;
  z-index: 1000;
  cursor: pointer;

  /* Lite-Brutalist Essentials */
  background-color: white;
  color: var(--text-dark);
  border: 4px solid var(--text-dark);
  box-shadow: 8px 8px 0px var(--text-dark);

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.arrow {
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1;
}

/* Hover: Scale up and shift shadow */
.brutal-top-btn:hover {
  background-color: var(--text-dark);
  color: white;
  transform: translate(-4px, -4px);
  box-shadow: 12px 12px 0px rgba(0, 0, 0, 0.2);
}

/* Active: The "Thud" - Pressed into the UI */
.brutal-top-btn:active {
  transform: translate(6px, 6px);
  box-shadow: 0px 0px 0px transparent;
}

@media (max-width: 768px) {
  .brutal-top-btn {
    bottom: 20px;
    right: 20px;
    width: 48px;
    height: 48px;
    border-width: 3px;
    box-shadow: 6px 6px 0px var(--text-dark);
  }
}
</style>
