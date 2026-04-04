<script setup>
const testimonials = [
  {
    name: "Hiroki T.",
    role: "Project Manager",
    image: "/images/characters/char-business-man.png",
    story:
      "I had almost given up on my TOEFL score after three failed attempts. Juan didn't just teach me English; he taught me a system to manage the test pressure. Knowing he understood my native language gave me the confidence to finally push through.",
  },
  {
    name: "Elena R.",
    role: "Graduate Student",
    image: "/images/characters/char-student.png",
    story:
      "Moving abroad is terrifying. Juan coached me through the academic requirements, but having a teacher who actually understood the logistics of a global move made all the difference. He is a systems architect for your life, not just your speech.",
  },
  {
    name: "Kenji S.",
    role: "Business Director",
    image: "/images/characters/char-traveller.png",
    story:
      "I needed to lead meetings with our European branch. Juan focused on 'Business EQ'. He understands the nuances of how we communicate, which allowed him to bridge the gap between my thoughts and my English delivery perfectly.",
  },
  {
    name: "Saki W.",
    role: "Parent",
    image: "/images/characters/char-young-student.png",
    story:
      "Most lessons for kids are just games. Juan's approach is different—it's about natural acquisition. My daughter is starting to initiate conversations on her own because the 'Language Lab' system actually makes sense to her.",
  },
];
</script>

<template>
  <section class="testimonials">
    <div class="container">
      <div class="intro">
        <h2 class="title">Success Stories</h2>
        <p class="subtitle">Proof of the System in Action</p>
      </div>

      <div class="testimonial-list">
        <div
          v-for="(t, index) in testimonials"
          :key="index"
          class="testimonial-item"
        >
          <div class="avatar-wrap">
            <img :src="t.image" :alt="t.name" class="avatar" />
          </div>
          <div class="content">
            <p class="story">“{{ t.story }}”</p>
            <div class="meta">
              <span class="name">{{ t.name }}</span>
              <span class="divider">/</span>
              <span class="role">{{ t.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials {
  padding: 10rem 1.5rem;
  background: white;
}

.container {
  max-width: 900px; /* Narrower container for better readability */
  margin: 0 auto;
}

.intro {
  margin-bottom: 6rem;
}

.title {
  font-family: "DM Serif Display", serif;
  font-size: 3.5rem;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
}

.subtitle {
  font-family: "Source Sans 3", sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 700;
  opacity: 0.4;
}

.testimonial-list {
  display: flex;
  flex-direction: column;
  gap: 8rem; /* Large gaps to let each story breathe */
}

.testimonial-item {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

/* Offset every second item for visual interest */
.testimonial-item:nth-child(even) {
  flex-direction: row-reverse;
  text-align: right;
}

.avatar-wrap {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  background: #f0f0f0; /* Soft circle behind the character */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin-top: 10px; /* Slight offset for character framing */
}

.content {
  flex: 1;
}

.story {
  font-family: "DM Serif Display", serif;
  font-size: 1.6rem;
  line-height: 1.4;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  font-style: italic;
}

.meta {
  font-family: "Source Sans 3", sans-serif;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Align meta info for reversed items */
.testimonial-item:nth-child(even) .meta {
  justify-content: flex-end;
}

.name {
  font-weight: 700;
  font-size: 1.1rem;
}

.divider {
  opacity: 0.3;
}

.role {
  opacity: 0.6;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .testimonials {
    padding: 6rem 1.5rem;
  }

  .testimonial-item,
  .testimonial-item:nth-child(even) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }

  .testimonial-item:nth-child(even) .meta {
    justify-content: center;
  }

  .story {
    font-size: 1.3rem;
  }

  .avatar-wrap {
    width: 100px;
    height: 100px;
  }
}
</style>
