<script setup>
import { ref, onMounted } from "vue";

const { t } = useI18n();

const conversations = [
  {
    key: "eiken",

    studentImg: "/images/characters/char-student.webp",
  },

  {
    key: "travel",

    studentImg: "/images/characters/char-traveller.webp",
  },

  {
    key: "business",

    studentImg: "/images/characters/char-business-man.webp",
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
          src="/images/avatars/avatar-thumbs-up.webp"
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
  padding-bottom: 10px;
  margin-top: -6rem;
}

/* --- Queue Layout Logic (Preserved) --- */
.student-queue {
  position: relative;
  width: 180px;
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

.juan-img {
  margin-right: 1rem;
}

@media (width >= 425px) {
  .juan-img {
    margin-right: 3rem;
  }
}

/* --- Mobile Queue Positions --- */
.pos-0 {
  opacity: 1;
  transform: translateX(0) scale(1);
  z-index: 3;
}

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
  border: var(--brutalist-border);
  font-family: var(--font-main);
  font-weight: 800;
  font-size: 0.85rem;
  white-space: nowrap;
  box-shadow: var(--shadow-sm);
  background: var(--bg-main);
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    bottom: -11px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 9px solid var(--text-dark);
  }
}

.bubble-left {
  top: -10%;
  left: -30px;
  transform: rotate(-15deg);
}

.bubble-right {
  top: -7%;
  right: 10px;
  transform: rotate(15deg);
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

/* =========================
   MEDIA QUERIES (768px+)
   ========================= */
@media (width >= 768px) {
  .hero-stage {
    margin-top: -3rem;
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

  /* Desktop Queue lineup logic preserved */
  .pos-0 {
    opacity: 1;
    transform: translateX(0) scale(1);
    filter: brightness(1);
    z-index: 3;
  }

  .pos-1 {
    opacity: 1;
    transform: translateX(-80px) scale(0.9);
    filter: brightness(0.85);
    z-index: 2;
  }

  .pos-2 {
    opacity: 1;
    transform: translateX(-160px) scale(0.8);
    filter: brightness(0.7);
    z-index: 1;
  }

  /* Bubble Re-positioning */
  .bubble-left {
    top: 2%;
    left: -175px;
    transform: rotate(0deg);

    &::after {
      bottom: auto;
      top: 20px;
      right: -10px;
      left: auto;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 9px solid var(--text-dark);
      border-right: none;
    }
  }

  .bubble-right {
    top: -19%;
    right: 25px;
    transform: rotate(0deg);

    &::after {
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
}

/* =========================
   MEDIA QUERIES (1024px+)
   ========================= */
@media (width >= 1024px) {
  .hero-stage {
    margin-top: 0;
  }
  .avatar-img {
    height: 450px;
  }

  .pos-1 {
    transform: translateX(-100px) scale(0.9);
  }

  .pos-2 {
    transform: translateX(-200px) scale(0.8);
  }

  .bubble-left {
    top: 8%;
    left: -200px;
  }

  .bubble-right {
    right: 125px;
    top: -27%;
  }
}

@media (width >= 1440px) {
  .bubble-right {
    right: 250px;
  }
}
</style>
