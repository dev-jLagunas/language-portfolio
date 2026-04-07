<script setup>
// 1. Define the conversation pairs
const conversations = [
  {
    studentImg: "/images/characters/char-student.png",
    studentText: "I need help with my Eiken score!",
    juanText: "No problem. Let's build a system.",
  },
  {
    studentImg: "/images/characters/char-traveller.png",
    studentText: "I'm traveling to London next month!",
    juanText: "Excting! Let's prep your travel English.",
  },
  {
    studentImg: "/images/characters/char-business-man.png",
    studentText: "I have a big presentation on Friday.",
    juanText: "We'll nail that pitch together.",
  },
];

const currentIndex = ref(0);
const isJuanTalking = ref(false);
const isTransitioning = ref(false);

const startCycle = async () => {
  // 1. Student speaks
  isJuanTalking.value = false;
  await new Promise((r) => setTimeout(r, 2500));

  // 2. Juan speaks
  isJuanTalking.value = true;
  await new Promise((r) => setTimeout(r, 2500));

  // 3. Slide out/in
  isTransitioning.value = true;
  await new Promise((r) => setTimeout(r, 800)); // Wait for slide exit

  currentIndex.value = (currentIndex.value + 1) % conversations.length;
  isTransitioning.value = false;

  // Restart
  startCycle();
};

onMounted(() => {
  startCycle();
});
</script>

<template>
  <div class="hero-stage">
    <Transition name="slide-pair" mode="out-in">
      <div :key="currentIndex" class="conversation-pair">
        <div class="char-container">
          <Transition name="pop">
            <div
              v-show="!isJuanTalking && !isTransitioning"
              class="speech-bubble bubble-left"
            >
              "{{ conversations[currentIndex].studentText }}"
            </div>
          </Transition>
          <img
            :src="conversations[currentIndex].studentImg"
            class="avatar-img"
            alt="Student"
          />
        </div>

        <div class="char-container">
          <Transition name="pop">
            <div
              v-show="isJuanTalking && !isTransitioning"
              class="speech-bubble bubble-right"
            >
              "{{ conversations[currentIndex].juanText }}"
            </div>
          </Transition>
          <img
            src="/images/avatars/avatar-thumbs-up.png"
            class="avatar-img"
            alt="Juan"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.hero-stage {
  width: 100%;
  height: 350px;
  position: relative;
  overflow: hidden;
}

.conversation-pair {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  margin-inline: auto;
}

.char-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-img {
  height: 280px;
  width: auto;
  display: block;
}

/* --- Blocky Bubble Styles --- */
.speech-bubble {
  position: absolute;
  top: -65px;
  background: #ffffff;
  padding: 0.75rem 1rem;
  border: 2px solid var(--text-dark);
  font-family: var(--font-main);
  font-weight: 800;
  font-size: 0.85rem;
  white-space: nowrap;
  box-shadow: 4px 4px 0px var(--text-dark);
  z-index: 10;
}

.speech-bubble::after {
  content: "";
  position: absolute;
  bottom: -11px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 9px solid var(--text-dark);
}

.bubble-left {
  top: -10%;
}

.bubble-right {
  top: -10%;
}
/* --- Slide Transition (Left to Right) --- */
.slide-pair-enter-active,
.slide-pair-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-pair-enter-from {
  transform: translateX(100%); /* Enter from right */
  opacity: 0;
}

.slide-pair-leave-to {
  transform: translateX(-100%); /* Exit to left */
  opacity: 0;
}

/* --- Bubble Pop Transition --- */
.pop-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-leave-active {
  transition: all 0.2s ease-in;
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.5) translateY(10px);
}
.pop-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* --- Desktop Logic (768px+) --- */
@media (width >= 768px) {
  .hero-stage {
    width: 100%;
  }

  .conversation-pair {
    gap: 10px;
  }
  .avatar-img {
    height: 380px;
  }

  .bubble-left {
    top: 15%;
    right: 70%;
    left: auto;
  }

  .bubble-right {
    top: 15%;
    left: 70%;
    right: auto;
  }

  /* Pointer flips for desktop side-positioning */
  .bubble-left::after {
    bottom: auto;
    top: 20px;
    right: -10px;
    left: auto;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 9px solid var(--text-dark);
    border-right: none;
  }

  .bubble-right::after {
    bottom: auto;
    top: 20px;
    left: -10px;
    right: auto;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 9px solid var(--text-dark);
    border-left: none;
  }
}

@media (width >= 1024px) {
  .avatar-img {
    height: 450px;
  }
}
</style>
