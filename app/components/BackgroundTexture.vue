<script setup>
const { $gsap } = useNuxtApp();
const container = ref(null);
let ctx;

const icons = [
  { name: "book-bg-icon.png", top: "10%", left: "5%", rotate: -15 },
  { name: "zoom-call-bg-icon.png", top: "25%", left: "82%", rotate: 12 },
  { name: "notepad-bg-icon.png", top: "45%", left: "8%", rotate: -5 },
  { name: "headphones-bg-icon.png", top: "65%", left: "88%", rotate: 10 },
  { name: "earth-headphones-bg-icon.png", top: "80%", left: "12%", rotate: -8 },
];

onMounted(() => {
  // context() ensures all animations are scoped and easily cleaned up
  ctx = $gsap.context(() => {
    $gsap.utils.toArray(".bg-icon").forEach((icon) => {
      $gsap.fromTo(
        icon,
        {
          opacity: 0,
          scale: 0.5,
          y: 40,
        },
        {
          opacity: 0.1, // Very subtle "watermark" feel
          scale: 2,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: icon,
            start: "top 95%", // Starts reveal as it enters the bottom of the screen
            toggleActions: "play none none reverse",
          },
        },
      );
    });
  }, container.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <div ref="container" class="texture-layer" aria-hidden="true">
    <img
      v-for="(icon, index) in icons"
      :key="index"
      :src="`/images/bg-icons/${icon.name}`"
      class="bg-icon"
      :style="{
        top: icon.top,
        left: icon.left,
        transform: `rotate(${icon.rotate}deg)`,
      }"
    />
  </div>
</template>

<style scoped>
.texture-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  min-height: 100%;
  /* Keep z-index high enough to see, but pointer-events: none is the key */
  z-index: 10;
  pointer-events: none;
  overflow: hidden;
}

.bg-icon {
  position: absolute;
  width: clamp(100px, 12vw, 160px);
  height: auto;
  opacity: 0; /* Handled by GSAP */
  filter: grayscale(100%) contrast(0.8);
}
</style>
