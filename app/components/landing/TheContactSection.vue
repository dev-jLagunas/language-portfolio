<script setup>
const { locale, t } = useI18n();
const { $gsap } = useNuxtApp();
const sectionRef = ref(null);
const isSubmitted = ref(false); // New reactive state
let ctx;

const goals = ["business", "academic", "fluency", "design"];

const formData = reactive({
  name: "",
  email: "",
  goal: "",
  message: "",
});

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const submitForm = () => {
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({
      "form-name": "contact-diagnostic",
      ...formData,
    }),
  })
    .then(() => {
      isSubmitted.value = true; // Swap the UI
      // Reset form data for potential resubmission
      formData.name = "";
      formData.email = "";
      formData.goal = "";
      formData.message = "";
    })
    .catch((error) => alert("System Error: " + error));
};

const resetForm = () => {
  isSubmitted.value = false;
};

onMounted(() => {
  ctx = $gsap.context(() => {
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
    data-step="6"
  >
    <div class="container">
      <div class="split-layout">
        <div class="form-container">
          <span class="pre-title animate-in">{{ t("contact.pre_title") }}</span>
          <h2 class="display-serif animate-in">{{ t("contact.title") }}</h2>

          <Transition name="form-swap" mode="out-in">
            <div v-if="!isSubmitted" key="form-view">
              <p class="ui-text animate-in">
                {{ t("contact.subtitle") }}
              </p>

              <form
                name="contact-diagnostic"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                @submit.prevent="submitForm"
                class="audit-form animate-in"
              >
                <input
                  type="hidden"
                  name="form-name"
                  value="contact-diagnostic"
                />
                <p class="hidden">
                  <label
                    >Don’t fill this out if you’re human:
                    <input name="bot-field"
                  /></label>
                </p>

                <div class="input-group">
                  <input
                    v-model="formData.name"
                    name="name"
                    type="text"
                    :placeholder="t('contact.placeholders.name')"
                    required
                    minlength="2"
                  />
                  <input
                    v-model="formData.email"
                    name="email"
                    type="email"
                    :placeholder="t('contact.placeholders.email')"
                    required
                  />
                </div>

                <div class="goal-selector">
                  <label
                    v-for="goalKey in goals"
                    :key="goalKey"
                    class="goal-pill"
                  >
                    <input
                      type="radio"
                      v-model="formData.goal"
                      :value="goalKey"
                      name="goal"
                      required
                    />
                    <span class="pill-btn">{{
                      t(`contact.goals.${goalKey}`)
                    }}</span>
                  </label>
                </div>

                <textarea
                  v-model="formData.message"
                  name="message"
                  :placeholder="t('contact.placeholders.message')"
                  required
                  minlength="10"
                ></textarea>

                <button type="submit" class="submit-btn">
                  {{ t("contact.cta") }} <span>→</span>
                </button>
              </form>
            </div>

            <div v-else key="success-view" class="success-card">
              <div class="success-visual">
                <img
                  src="/images/avatars/avatar-sitting.png"
                  alt="Success"
                  class="success-avatar"
                />
              </div>
              <h3 class="success-title">{{ t("contact.success.title") }}</h3>
              <p class="success-text">{{ t("contact.success.subtitle") }}</p>
              <button @click="resetForm" class="b-button reset-btn">
                {{ t("contact.success.cta") }}
              </button>
            </div>
          </Transition>
        </div>

        <div class="identity-card">
          <div class="map-visual">
            <div class="location-tag">
              <span class="dot"></span> {{ t("contact.identity.location") }}
            </div>
            <img
              src="/images/visuals/ishikawa-map-brutalist.png"
              alt="Ishikawa Japan Map"
              class="custom-map-img"
            />
          </div>

          <div class="bio-content">
            <img
              src="/images/avatars/avatar-pointing.png"
              alt="Juan Lagunas"
              class="mini-avatar"
            />
            <h3 class="bio-name">Juan Lagunas</h3>
            <p class="role">{{ t("contact.identity.role") }}</p>
            <p class="bio-text">
              {{ t("contact.identity.bio") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* -------------------------
   LAYOUT & THEME
   ------------------------- */
.contact-diagnostic {
  padding: var(--section-padding);
  position: relative;
  z-index: 45;
  transition: background-color 0.4s ease;
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

/* -------------------------
   FORM ELEMENTS
   ------------------------- */
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
  background: var(--text-light);
  border: var(--brutalist-border);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-main);
  font-size: 1rem;
  font-weight: 600;
  outline: none;
}

.goal-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.goal-pill input {
  display: none;
}

.pill-btn {
  display: block;
  padding: 10px 18px;
  border: 2px solid var(--text-dark);
  background: var(--text-light);
  font-family: var(--font-main);
  font-weight: 800;
  font-size: 0.85rem;
  cursor: pointer;
}

.goal-pill input:checked + .pill-btn {
  background: var(--text-dark);
  color: var(--text-light);
  transform: translate(2px, 2px);
}

.submit-btn {
  background: var(--text-dark);
  color: var(--text-light);
  padding: 1.5rem;
  border: none;
  font-family: var(--font-main);
  font-weight: 900;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all 0.2s;
}

.submit-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.3);
}

/* -------------------------
   SUCCESS CARD
   ------------------------- */
.success-card {
  background: var(--text-light);
  border: var(--brutalist-border-thick);
  box-shadow: var(--shadow-xl);
  padding: 4rem 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-avatar {
  height: 180px;
  margin-bottom: 2rem;
  filter: drop-shadow(var(--shadow-md));
}

.success-title {
  font-family: var(--font-display);
  font-size: 3rem;
  margin-bottom: 1rem;
}

.success-text {
  font-family: var(--font-main);
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 450px;
  margin-bottom: 2.5rem;
}

.reset-btn {
  background: var(--text-dark);
  color: var(--text-light);
  padding: 1rem 2rem;
}

/* -------------------------
   TRANSITIONS
   ------------------------- */
.form-swap-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.form-swap-leave-active {
  transition: all 0.3s ease-in;
}
.form-swap-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.form-swap-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* -------------------------
   IDENTITY CARD
   ------------------------- */
.identity-card {
  background: var(--text-light);
  border: var(--brutalist-border-thick);
  box-shadow: var(--shadow-xl);
  position: sticky;
  top: 120px;
  overflow: hidden;
}

.map-visual {
  height: 280px;
  background-color: #eee;
  position: relative;
  display: flex;
  justify-content: center;
  border-bottom: var(--brutalist-border-thick);
}

.custom-map-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.location-tag {
  position: absolute;
  top: 20px;
  z-index: 5;
  background: var(--text-light);
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

.location-tag .dot {
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
}

.bio-name {
  font-family: var(--font-display);
  font-size: 2rem;
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
}

@media (width <= 1024px) {
  .split-layout {
    grid-template-columns: 1fr;
  }
  .identity-card {
    position: static;
    max-width: 600px;
  }
  .input-group {
    grid-template-columns: 1fr;
  }
}

.hidden {
  display: none;
}
</style>
