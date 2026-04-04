<script setup>
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
  // Logic for Netlify Forms or API call
  console.log("System Entry Triggered:", formData);
};
</script>

<template>
  <section class="contact-diagnostic" :class="`theme-${$i18n.locale}`">
    <div class="container">
      <div class="split-layout">
        <div class="form-container">
          <span class="pre-title">Phase 04 // Entry</span>
          <h2 class="display-serif">Start the Audit.</h2>
          <p class="ui-text">
            Select your primary bottleneck to begin the architecture shift.
          </p>

          <form @submit.prevent="submitForm" class="audit-form">
            <div class="input-group">
              <input
                v-model="formData.name"
                type="text"
                placeholder="Name"
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
                <span>{{ goal }}</span>
              </label>
            </div>

            <textarea
              v-model="formData.message"
              placeholder="Briefly describe your current language stack..."
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
            <h3>Juan Lagunas</h3>
            <p class="role">Systems Architect & Cafe Owner</p>
            <p class="bio-text">
              Currently operating from the coast of Ishikawa. I balance the
              precision of UX design with the hospitality of a physical cafe. I
              don't just teach English; I build communication systems that
              scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-diagnostic {
  padding: 120px 20px;
  background-color: var(--bg-color, #f9f9f9);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.split-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: start;
}

/* Form Styling */
.pre-title {
  font-family: "Source Sans 3", sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: #888;
}

.display-serif {
  font-family: "DM Serif Display", serif;
  font-size: 3.5rem;
  margin: 0.5rem 0 1rem;
}

.audit-form {
  margin-top: 3rem;
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
  border: 2px solid var(--text-dark);
  font-family: "Source Sans 3", sans-serif;
  font-size: 1rem;
  outline: none;
}

.goal-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.goal-pill {
  cursor: pointer;
}

.goal-pill input {
  display: none;
}

.goal-pill span {
  display: block;
  padding: 8px 16px;
  border: 1px solid var(--text-dark);
  font-family: "Source Sans 3", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.goal-pill input:checked + span {
  background: var(--text-dark);
  color: white;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-btn {
  background: var(--text-dark);
  color: white;
  padding: 1.2rem;
  border: none;
  font-family: "Source Sans 3", sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: opacity 0.2s;
}

.submit-btn:hover {
  opacity: 0.9;
}

/* Identity Card Styling */
.identity-card {
  background: white;
  border: 2px solid var(--text-dark);
  position: sticky;
  top: 40px;
}

.map-visual {
  height: 200px;
  background: #e0e0e0; /* Placeholder for a stylized map image */
  background-image: url("https://st3.depositphotos.com/2559749/14580/v/450/depositphotos_145801721-stock-illustration-ishikawa-prefecture-map.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.location-tag {
  background: white;
  padding: 8px 16px;
  font-family: "Source Sans 3", sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #ff4d4d;
  border-radius: 50%;
  display: inline-block;
  animation: pulse 2s infinite;
}

.bio-content {
  padding: 2.5rem;
}

.mini-avatar {
  width: 60px;
  height: 60px;
  margin-bottom: 1.5rem;
}

.bio-content h3 {
  font-family: "DM Serif Display", serif;
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.role {
  font-family: "Source Sans 3", sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.7rem;
  color: #888;
  margin-bottom: 1.5rem;
}

.bio-text {
  font-family: "Source Sans 3", sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #444;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 900px) {
  .split-layout {
    grid-template-columns: 1fr;
  }
  .identity-card {
    position: static;
  }
}
</style>
