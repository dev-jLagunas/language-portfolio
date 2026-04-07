<script setup>
import { ref, onMounted } from "vue";

const { t } = useI18n();

const conversations = [
  {
    key: "eiken",

    studentImg: "/images/characters/char-student.png",
  },

  {
    key: "travel",

    studentImg: "/images/characters/char-traveller.png",
  },

  {
    key: "business",

    studentImg: "/images/characters/char-business-man.png",
  },
];

const currentIndex = ref(0);

const isJuanTalking = ref(false);

const isTransitioning = ref(false);

const getQueuePosition = (index) => {
  const diff = index - currentIndex.value;

  const len = conversations.length;

  return `pos-${(diff + len) % len}`;
};

const startCycle = async () => {
  isJuanTalking.value = false;

  await new Promise((r) => setTimeout(r, 2500));

  isJuanTalking.value = true;

  await new Promise((r) => setTimeout(r, 2500));

  isTransitioning.value = true;

  await new Promise((r) => setTimeout(r, 800));

  currentIndex.value = (currentIndex.value + 1) % conversations.length;

  isTransitioning.value = false;

  startCycle();
};

onMounted(() => {
  startCycle();
});
</script>

<template>
  <div class="hero-stage">
    <div class="conversation-pair">
      <div class="student-queue">
        <div
          v-for="(conv, index) in conversations"
          :key="index"
          :class="[
            'char-container',

            'student-wrapper',

            getQueuePosition(index),
          ]"
        >
          <Transition name="pop">
            <div
              v-show="
                currentIndex === index && !isJuanTalking && !isTransitioning
              "
              class="speech-bubble bubble-left student-bubble"
            >
              "{{ t(`hero.stage.${conv.key}.student`) }}"
            </div>
          </Transition>

          <img
            :src="conv.studentImg"
            class="avatar-img"
            :alt="t('hero.stage.alt_student')"
          />
        </div>
      </div>

      <div class="char-container juan-wrapper">
        <Transition name="pop">
          <div
            v-show="isJuanTalking && !isTransitioning"
            class="speech-bubble bubble-right juan-bubble"
          >
            "{{ t(`hero.stage.${conversations[currentIndex].key}.juan`) }}"
          </div>
        </Transition>

        <img
          src="/images/avatars/avatar-thumbs-up.png"
          class="avatar-img juan-img"
          alt="Juan"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-stage {
  width: 100%;

  height: 400px;

  position: relative;
}

.conversation-pair {
  display: flex;

  align-items: flex-end;

  justify-content: center;

  gap: 20px;

  width: 100%;

  height: 100%;

  margin-inline: auto;

  padding-bottom: 10px; /* Ground level */
}

/* --- Queue Layout Logic --- */

.student-queue {
  position: relative;

  width: 180px; /* Anchors the active student's width */

  height: 100%;

  display: flex;

  align-items: flex-end;

  justify-content: center;
}

.student-wrapper {
  position: absolute;

  bottom: 0;

  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);

  transform-origin: bottom center;
}

.char-container {
  display: flex;

  flex-direction: column;

  align-items: center;
}

.avatar-img {
  height: 280px;

  width: auto;

  display: block;
}

/* Juan's Constant Subtle Animation */

@keyframes subtle-breathe {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

.juan-img {
  animation: subtle-breathe 4s ease-in-out infinite;
}

/* --- Mobile Queue Positions (<768px) --- */

.pos-0 {
  opacity: 1;

  transform: translateX(0) scale(1);

  z-index: 3;
}

/* pos-1 (incoming) & pos-2 (outgoing) hide to the left */

.pos-1,
.pos-2 {
  opacity: 0;

  transform: translateX(-150px) scale(0.9);

  z-index: 1;

  pointer-events: none;
}

/* --- Blocky Bubble Styles --- */

.speech-bubble {
  position: absolute;

  top: -65px;

  padding: 0.75rem 1rem;

  border: 2px solid var(--text-dark);

  font-family: var(--font-main);

  font-weight: 800;

  font-size: 0.85rem;

  white-space: nowrap;

  box-shadow: 4px 4px 0px var(--text-dark);

  z-index: 10;
}

/* Custom Backgrounds */

.student-bubble {
  background: #f2f2f2; /* Pastel Orange */
}

.juan-bubble {
  background: #f2f2f2;
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

    margin-top: -6rem;
  }

  .conversation-pair {
    gap: 40px;
  }

  .student-queue {
    width: 250px;
  }

  .avatar-img {
    height: 380px;
  }

  /* Desktop Queue Positions: The Lineup */

  .pos-0 {
    opacity: 1;

    transform: translateX(0) scale(1);

    filter: brightness(1);

    z-index: 3;
  }

  .pos-1 {
    opacity: 1;

    transform: translateX(-80px) scale(0.9);

    filter: brightness(0.85); /* Creates depth shadow */

    z-index: 2;
  }

  .pos-2 {
    opacity: 1;

    transform: translateX(-160px) scale(0.8);

    filter: brightness(0.7); /* Deepest in line */

    z-index: 1;
  }

  /* Bubble Positioning */

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

  /* Spread the line out a bit more for ultra-wide */

  .pos-1 {
    transform: translateX(-100px) scale(0.9);
  }

  .pos-2 {
    transform: translateX(-200px) scale(0.8);
  }
}
</style>
