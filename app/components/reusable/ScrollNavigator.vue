<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps<{ total: number }>();
const activeIndex = ref(0);

// Navigator is only visible if we are in a tracked section (activeIndex > 0)
const isVisible = computed(() => activeIndex.value >= 1);

let observer: IntersectionObserver | null = null;

function scrollToSection(index: number) {
  const target = document.querySelector(
    `[data-step="${index}"]`,
  ) as HTMLElement | null;

  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Resets the index to 0 when at the very top of the page
const handleTopDetection = () => {
  if (window.scrollY < 100) {
    activeIndex.value = 0;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleTopDetection);

  const sections = document.querySelectorAll<HTMLElement>("[data-step]");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Only update index if the section is truly in the "active" middle zone
        if (!entry.isIntersecting) return;

        const index = Number(entry.target.getAttribute("data-step"));
        if (!isNaN(index)) activeIndex.value = index;
      });
    },
    {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    },
  );

  sections.forEach((el) => observer!.observe(el));
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleTopDetection);
  observer?.disconnect();
  observer = null;
});
</script>

<template>
  <Transition name="pop-in">
    <nav
      v-show="isVisible"
      class="step-navigator"
      aria-label="Section navigation"
    >
      <div class="indicator-stack">
        <button
          v-for="n in total"
          :key="n"
          @click="scrollToSection(n)"
          :class="['step-box', { 'is-active': n === activeIndex }]"
          :aria-label="`Scroll to section ${n}`"
        >
          <span class="step-label">0{{ n }}</span>
        </button>
      </div>

      <div class="step-counter">
        <span class="current">{{ activeIndex }}</span>
        <span class="divider">/</span>
        <span class="total">{{ total }}</span>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
.step-navigator {
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  pointer-events: none;
}

.pop-in-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pop-in-leave-active {
  transition: all 0.3s ease-in;
}

.pop-in-enter-from,
.pop-in-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(40px) scale(0.8);
}

.indicator-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  pointer-events: auto;
}

.step-box {
  width: 12px;
  height: 32px;
  background: var(--text-light);
  border: var(--brutalist-border);
  cursor: pointer;
  position: relative;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  padding: 0;

  &:hover {
    background: #eee;
    transform: translateX(-4px);
    box-shadow: 4px 0px 0px var(--text-dark);
  }

  &.is-active {
    background: var(--text-dark);
    height: 48px;
    transform: translateX(-6px);
    box-shadow: 6px 0px 0px rgba(0, 0, 0, 0.2);
  }
}

.step-label {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 1rem;
  font-family: var(--font-main);
  font-weight: 900;
  font-size: 0.7rem;
  color: var(--text-dark);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  white-space: nowrap;
}

.step-box:hover .step-label,
.step-box.is-active .step-label {
  opacity: 1;
}

.step-counter {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 900;
  color: var(--text-dark);
  display: flex;
  align-items: center;
  gap: 4px;
  background: var(--text-light);
  padding: 4px 8px;
  border: var(--brutalist-border);
  box-shadow: var(--shadow-sm);
  pointer-events: auto;
}

.divider {
  opacity: 0.3;
  font-size: 0.8rem;
}

/* =========================
   MEDIA QUERIES
   ========================= */
@media (width <= 1024px) {
  .step-navigator {
    right: 1rem;
  }

  .step-box {
    width: 8px;
    height: 24px;

    &.is-active {
      height: 36px;
    }
  }
}

@media (width <= 600px) {
  .step-navigator {
    display: none;
  }
}
</style>
