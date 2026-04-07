<script setup>
const { locale } = useI18n();
const { $gsap } = useNuxtApp();
const sectionRef = ref(null);
let ctx;

const goals = [
  "Business EQ / Soft Skills",
  "Academic / Eiken Prep",
  "General Fluency Architecture",
  "Design & Creative Coaching",
];

const formData = reactive({
  name: "",
  email: "",
  goal: "",
  message: "",
});

const submitForm = () => {
  console.log("System Entry Triggered:", formData);
};

onMounted(() => {
  ctx = $gsap.context(() => {
    // Reveal the header and form fields
    $gsap.from(".animate-in", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: ".split-layout",
        start: "top 80%",
      },
    });

    // Reveal the identity card separately with a bit more "thud"
    $gsap.from(".identity-card", {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".identity-card",
        start: "top 85%",
      },
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section
    ref="sectionRef"
    :class="['contact-diagnostic', `theme-${locale}`]"
    id="contact"
  >
    <div class="container">
      <div class="split-layout">
        <div class="form-container">
          <span class="pre-title animate-in">Final Phase // Deployment</span>
          <h2 class="display-serif animate-in">Need an English coach?</h2>
          <p class="ui-text animate-in">
            Identify your primary bottleneck to begin the architecture shift.
          </p>

          <form @submit.prevent="submitForm" class="audit-form animate-in">
            <div class="input-group">
              <input
                v-model="formData.name"
                type="text"
                placeholder="Full Name"
                required
              />
              <input
                v-model="formData.email"
                type="email"
                placeholder="Email Address"
                required
              />
            </div>

            <div class="goal-selector">
              <label v-for="goal in goals" :key="goal" class="goal-pill">
                <input
                  type="radio"
                  v-model="formData.goal"
                  :value="goal"
                  name="goal"
                />
                <span class="pill-btn">{{ goal }}</span>
              </label>
            </div>

            <textarea
              v-model="formData.message"
              placeholder="Describe your current language stack or goals..."
            ></textarea>

            <button type="submit" class="submit-btn">
              Execute System Switch <span>→</span>
            </button>
          </form>
        </div>

        <div class="identity-card">
          <div class="map-visual">
            <div class="location-tag">
              <span class="dot"></span> Ishikawa, Japan
            </div>
          </div>

          <div class="bio-content">
            <img
              src="/images/avatars/avatar-pointing.png"
              alt="Juan Lagunas"
              class="mini-avatar"
            />
            <h3 class="bio-name">Juan Lagunas</h3>
            <p class="role">Systems Architect & Coach</p>
            <p class="bio-text">
              Operating from the coast of Ishikawa. I balance the precision of
              UX design with high-agency language coaching. I don't just teach
              English; I build communication systems that scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-diagnostic {
  padding: 120px 1.5rem;
  position: relative;
  z-index: 45; /* Sits between content and footer */
  transition: background-color 0.4s ease;
}

/* Theme Integration */
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

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.split-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 5rem;
  align-items: start;
}

/* Form Styling */
.pre-title {
  display: block;
  font-family: var(--font-main);
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--text-dark);
  opacity: 0.6;
}

.display-serif {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin: 0.5rem 0 1.5rem;
  color: var(--text-dark);
}

.ui-text {
  font-family: var(--font-main);
  font-size: 1.15rem;
  color: var(--text-dark);
  opacity: 0.8;
  margin-bottom: 3rem;
}

.audit-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

input,
textarea {
  padding: 1.2rem;
  background: white;
  border: 3px solid var(--text-dark);
  box-shadow: 4px 4px 0px var(--text-dark);
  font-family: var(--font-main);
  font-size: 1rem;
  font-weight: 600;
  outline: none;
}

.goal-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 0.5rem 0;
}

.goal-pill input {
  display: none;
}

.pill-btn {
  display: block;
  padding: 10px 18px;
  border: 2px solid var(--text-dark);
  background: white;
  font-family: var(--font-main);
  font-size: 0.85rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
}

.goal-pill input:checked + .pill-btn {
  background: var(--text-dark);
  color: white;
  transform: translate(2px, 2px);
}

textarea {
  min-height: 140px;
}

.submit-btn {
  background: var(--text-dark);
  color: white;
  padding: 1.5rem;
  border: none;
  font-family: var(--font-main);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.submit-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.3);
}

/* Identity Card */
.identity-card {
  background: white;
  border: 4px solid var(--text-dark);
  box-shadow: 15px 15px 0px var(--text-dark);
  position: sticky;
  top: 120px;
}

.map-visual {
  height: 220px;
  background-color: #eee;
  background-image: url("https://st3.depositphotos.com/2559749/14580/v/450/depositphotos_145801721-stock-illustration-ishikawa-prefecture-map.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 4px solid var(--text-dark);
}

.location-tag {
  background: white;
  padding: 10px 20px;
  border: 2px solid var(--text-dark);
  font-family: var(--font-main);
  font-weight: 900;
  font-size: 0.8rem;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dot {
  width: 10px;
  height: 10px;
  background: #ff4d4d;
  border-radius: 50%;
}

.bio-content {
  padding: 3rem;
}

.mini-avatar {
  width: 80px;
  height: 80px;
  margin-bottom: 1.5rem;
  border: 2px solid var(--text-dark);
  border-radius: 50%;
  background: #f2f2f2;
}

.bio-name {
  font-family: var(--font-display);
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.role {
  font-family: var(--font-main);
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 1.5rem;
}

.bio-text {
  font-family: var(--font-main);
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}

@media (max-width: 1024px) {
  .split-layout {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  .identity-card {
    position: static;
    max-width: 600px;
  }
  .input-group {
    grid-template-columns: 1fr;
  }
}
</style>
