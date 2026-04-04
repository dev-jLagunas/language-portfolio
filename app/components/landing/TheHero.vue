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
      </div>

      <div class="hero-content">
        <h1 class="hero-title">
          Master the Art of the <br /><span class="accent"
            >Language Switch</span
          >
        </h1>
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
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 1rem;
  transition: background-color 0.4s ease;
  overflow: hidden;
}

.theme-en {
  background-color: var(--color-en);
}
.theme-es {
  background-color: var(--color-es);
}
.theme-jp {
  background-color: var(--color-jp);
}
.theme-fr {
  background-color: var(--color-fr);
}

.hero-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; /* Tightened space between stage and text */
}

/* --- Stage Adjustments --- */
.hero-stage {
  position: relative;
  height: 380px; /* Tighter height */
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: -2rem; /* Overlap slightly with text */
}

.character-juan {
  position: relative;
  z-index: 10;
  margin-left: 60px;
}

.img-juan {
  height: 320px;
  object-fit: contain;
}

.character-guest {
  position: absolute;
  left: 10%;
  bottom: 0;
  transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: translateX(-200%);
}

.character-guest.entering,
.character-guest.request,
.character-guest.response {
  transform: translateX(0);
}

.character-guest.leaving {
  transform: translateX(-200%);
}

.img-guest {
  height: 280px;
  object-fit: contain;
}

/* --- Text Adjustments --- */
.hero-content {
  text-align: center;
  max-width: 800px;
  z-index: 5;
}

.hero-title {
  font-family: "DM Serif Display", serif;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  line-height: 1;
  color: var(--text-dark);
  margin-bottom: 1rem;
}

.accent {
  text-decoration: underline;
  text-underline-offset: 8px;
  text-decoration-thickness: 3px;
}

.hero-copy {
  font-family: "Source Sans 3", sans-serif;
  font-size: 1.15rem;
  color: var(--text-dark);
  margin: 0 auto 1.5rem;
  line-height: 1.4;
  max-width: 600px;
}

.hero-btn {
  font-family: "Source Sans 3", sans-serif;
  font-weight: 700;
  padding: 0.8rem 2rem;
  background: var(--text-dark);
  color: white;
  border: none;
  border-radius: 50px; /* Pill shape for cleaner look */
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.8s ease;
}

/* --- Bubble Adjustments --- */
.bubble {
  position: absolute;
  background: white;
  padding: 0.75rem 1.2rem;
  border-radius: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Source Sans 3", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-dark);
  min-width: 140px;
  white-space: nowrap;
}

.bubble::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid white;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
}

.juan-bubble {
  top: -20px;
  right: 20%;
}
.guest-bubble {
  top: -20px;
  left: 50%;
}

/* --- Tablet/Desktop Full Width Tweaks --- */
@media (min-width: 768px) {
  .hero-container {
    max-width: 1200px;
  }
  .hero-stage {
    height: 450px;
  }
  .img-juan {
    height: 400px;
  }
  .img-guest {
    height: 350px;
  }
  .hero-copy {
    font-size: 1.3rem;
  }
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px) translateX(-50%);
}
</style>
