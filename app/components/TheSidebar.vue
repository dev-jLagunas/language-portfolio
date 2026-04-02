<script setup>
defineProps({
  isOpen: Boolean,
});

defineEmits(["close"]);
</script>

<template>
  <Transition name="slide">
    <aside v-if="isOpen" class="sidebar">
      <button class="sidebar__close" @click="$emit('close')">×</button>
      <p>side content goes here</p>
    </aside>
  </Transition>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: white;
  z-index: 1000;
  padding: 2rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
}

.sidebar__close {
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
}

/* Transition Animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
