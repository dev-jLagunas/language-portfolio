<script setup>
const { locale } = useI18n();

const helpRequests = [
  {
    image: "/images/characters/char-student.png",
    text: "I need help with my Eiken score!",
    response: "That is no problem.",
  },
  {
    image: "/images/characters/char-traveller.png",
    text: "I need to prepare for my trip.",
    response: "I've got you covered!",
  },
  {
    image: "/images/characters/char-business-man.png",
    text: "I have a big presentation coming up.",
    response: "Let's nail that pitch.",
  },
  {
    image: "/images/characters/char-young-student.png",
    text: "I want to speak English like a pro.",
    response: "We'll get you there!",
  },
];

const currentIndex = ref(0);
const phase = ref("entering");
const currentResponse = ref("How can I help you?");

const startAnimationLoop = () => {
  phase.value = "entering";
  currentResponse.value = "How can I help you?";

  setTimeout(() => {
    phase.value = "request";

    setTimeout(() => {
      phase.value = "response";
      currentResponse.value = helpRequests[currentIndex.value].response;

      setTimeout(() => {
        phase.value = "leaving";

        setTimeout(() => {
          currentIndex.value = (currentIndex.value + 1) % helpRequests.length;
          startAnimationLoop();
        }, 800);
      }, 2200);
    }, 1800);
  }, 800);
};

onMounted(() => {
  startAnimationLoop();
});
</script>

<template>
  <section :class="['hero', `theme-${locale}`]">
    <div class="hero-container">
      <div class="hero-stage">
        <div :class="['character-guest', phase]">
          <Transition name="fade">
            <div v-if="phase === 'request'" class="bubble guest-bubble">
              {{ helpRequests[currentIndex].text }}
            </div>
          </Transition>
          <img
            :src="helpRequests[currentIndex].image"
            class="img-guest"
            alt="Student"
          />
        </div>

        <div class="character-juan">
          <Transition name="fade">
            <div v-if="phase !== 'leaving'" class="bubble juan-bubble">
              {{ currentResponse }}
            </div>
          </Transition>
          <img
            src="/images/avatars/avatar-thumbs-up.png"
            alt="Juan Lagunas"
            class="img-juan"
          />
        </div>
      </div>

      <div class="hero-content">
        <h1 class="hero-title">English Instructor</h1>
        <p class="hero-copy">
          Personalized coaching for high-agency professionals and students. From
          Eiken prep to business presentations, I build the systems you need to
          communicate with confidence.
        </p>
        <button class="hero-btn">Start Your Journey</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  padding-top: 80px; /* Offset for fixed navbar */
  overflow: hidden;
  transition: background-color 0.4s ease;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
}

/* --- The Stage --- */
.hero-stage {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 350px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 1rem;
}

.character-juan {
  position: relative;
  z-index: 10;
}

.img-juan {
  height: 300px;
  width: auto;
  display: block;
}

.character-guest {
  position: absolute;
  /* Positioned relative to the center of the stage */
  left: 50%;
  bottom: 0;
  transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  /* Initial state: Hidden to the left */
  transform: translateX(-250%);
  opacity: 0;
}

/* Animation States */
.character-guest.entering,
.character-guest.request,
.character-guest.response {
  transform: translateX(-140%); /* Adjusted to sit next to Juan */
  opacity: 1;
}

.character-guest.leaving {
  transform: translateX(-250%);
  opacity: 0;
}

.img-guest {
  height: 260px;
  width: auto;
}

/* --- Content --- */
.hero-content {
  text-align: center;
  max-width: 700px;
  z-index: 20;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 4rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
}

.hero-copy {
  font-family: var(--font-main);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: var(--text-dark);
}

.hero-btn {
  font-family: var(--font-main);
  font-weight: 800;
  padding: 1rem 2.5rem;
  background: var(--text-dark);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.hero-btn:hover {
  transform: scale(1.05);
}

/* --- Speech Bubbles --- */
.bubble {
  position: absolute;
  background: white;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: var(--font-main);
  font-weight: 700;
  font-size: 0.85rem;
  white-space: nowrap;
  z-index: 50;
}

/* Simple speech bubble tail */
.bubble::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid white;
}

.juan-bubble {
  top: -10px;
  left: 50%;
  transform: translateX(-20%);
}

.guest-bubble {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

/* Desktop Scaling */
@media (min-width: 768px) {
  .hero-stage {
    height: 420px;
  }
  .img-juan {
    height: 380px;
  }
  .img-guest {
    height: 330px;
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px) translateX(-50%);
}
</style>
