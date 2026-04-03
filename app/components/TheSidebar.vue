<script setup>
defineProps({
  isOpen: Boolean,
});

defineEmits(["close"]);
</script>

<template>
  <Transition name="slide">
    <div v-if="isOpen" class="sidebar-container">
      <aside class="sidebar">
        <button class="sidebar__close" @click="$emit('close')">×</button>
        <p>side content goes here</p>
      </aside>

      <img
        src="/images/avatars/avatar-pointing.png"
        class="sidebar-avatar"
        alt="Pointing Avatar"
      />
    </div>
  </Transition>
</template>

<style scoped>
.sidebar-container {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
}

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  background: white;
  padding: 2rem;
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
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

.sidebar-avatar {
  position: absolute;
  bottom: 5%;
  right: 0;
  object-fit: contain;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.4s ease;
}

.slide-enter-active .sidebar,
.slide-leave-active .sidebar {
  transition: transform 0.4s ease;
}

.slide-enter-active .sidebar-avatar,
.slide-leave-active .sidebar-avatar {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-enter-from .sidebar,
.slide-leave-to .sidebar {
  transform: translateX(-100%);
}

.slide-enter-from .sidebar-avatar,
.slide-leave-to .sidebar-avatar {
  transform: translateX(100%);
}

.slide-enter-to .sidebar-avatar {
  transform: translateX(-20px);
}

/* --- MOBILE BREAKPOINT (320px to 425px) --- */
@media (320px <= width <= 425px) {
  .sidebar {
    width: 240px;
  }
  .sidebar-avatar {
    height: 180px;
  }
}

/* --- TABLET BREAKPOINT (426px to 767px) --- */
@media (426px <= width <= 767px) {
  .sidebar {
    width: 320px;
  }
  .sidebar-avatar {
    height: 280px;
  }
}
</style>
