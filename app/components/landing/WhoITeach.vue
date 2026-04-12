<script setup>
const { t, locale } = useI18n();
const { currentTheme, isChangingLanguage } = useTheme();
const { $gsap } = useNuxtApp();
const container = ref(null);
let ctx;

const students = [
  {
    key: "hobbyist",
    image: "/images/characters/avatar-grandma.webp",
    tags: ["tag1", "tag2", "tag3"],
    icon: "ph:coffee-bold",
  },
  {
    key: "professional",
    image: "/images/characters/avatar-businesswoman.webp",
    tags: ["tag1", "tag2", "tag3"],
    icon: "ph:briefcase-bold",
  },
  {
    key: "explorer",
    image: "/images/characters/avatar-expat.webp",
    tags: ["tag1", "tag2", "tag3"],
    icon: "ph:airplane-tilt-bold",
  },
  {
    key: "next_gen",
    image: "/images/characters/avatar-prof.webp",
    tags: ["tag1", "tag2", "tag3"],
    icon: "ph:student-bold",
  },
  {
    key: "test_taker",
    image: "/images/characters/char-student.webp",
    tags: ["tag1", "tag2", "tag3"],
    icon: "ph:exam-bold",
    imageClass: "scale-down",
  },
];

watch(locale, async () => {
  await nextTick();
  ScrollTrigger.refresh();
});

onMounted(() => {
  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".student-card");

    cards.forEach((card, index) => {
      const inner = card.querySelector(".card-inner");
      const imgTarget = card.querySelector(".avatar-target");

      // Determine direction: Even = Left (-X), Odd = Right (+X)
      const xOffset = index % 2 === 0 ? -150 : 150;

      // Card Slide + Perspective Reveal
      $gsap.fromTo(
        inner,
        {
          x: xOffset,
          opacity: 0,
          rotationY: index % 2 === 0 ? -15 : 15, // Subtle Y rotation based on side
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "top 65%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );

      // Image Parallax
      $gsap.fromTo(
        imgTarget,
        { y: -15 },
        {
          y: 15,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
  }, container.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section ref="container" class="teach-section" id="who-i-help" data-step="1">
    <div class="content-limit">
      <h2 class="section-title">{{ t("who.section_title") }}</h2>

      <div class="grid-wrapper">
        <div
          v-for="(student, index) in students"
          :key="index"
          class="student-card"
        >
          <div
            :class="[
              'card-inner',
              currentTheme,
              { 'is-transitioning': isChangingLanguage },
            ]"
          >
            <div class="card-header">
              <div class="header-id">
                <Icon name="ph:identification-card-bold" class="ui-icon" />
                <span>ID-0{{ index + 1 }}</span>
              </div>
              <div class="header-icon-box">
                <Icon :name="student.icon" class="profile-icon" />
              </div>
            </div>

            <div class="card-body">
              <div class="image-compartment">
                <div class="crosshair top-left"></div>
                <div class="crosshair bottom-right"></div>
                <img
                  :src="student.image"
                  :alt="t(`who.students.${student.key}.title`)"
                  :class="['avatar-target', student.imageClass]"
                />
              </div>

              <div class="content-compartment">
                <h3 class="card-title">
                  {{ t(`who.students.${student.key}.title`) }}
                </h3>
                <p class="card-text">
                  {{ t(`who.students.${student.key}.description`) }}
                </p>
                <div class="tag-group">
                  <div
                    v-for="tagKey in student.tags"
                    :key="tagKey"
                    class="tag-box"
                  >
                    <span>{{
                      t(`who.students.${student.key}.tags.${tagKey}`)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.teach-section {
  position: relative;
  background-color: var(--bg-main);
  padding: 5rem var(--space-unit);
  z-index: 5;
  perspective: 1200px;
  overflow-x: hidden; /* Prevents slide-in from causing horizontal scroll */
}

.content-limit {
  max-width: 1000px;
  margin: 0 auto;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-align: center;
  color: var(--text-dark);
  margin-bottom: 3rem;
  text-transform: uppercase;
}

.grid-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.student-card {
  width: 100%;
  display: flex;
  justify-content: center;
}

.card-inner {
  position: relative;
  width: 100%;
  border: var(--brutalist-border-thick);
  box-shadow: 8px 8px 0px var(--text-dark);
  display: flex;
  flex-direction: column;
  background: white;
  transform-style: preserve-3d;
}

/* Theme Colors */
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--brutalist-border-thick);
  background: var(--text-light);
}

.header-id {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-family: var(--font-main);
  font-weight: 900;
  font-size: 0.75rem;
}

.header-icon-box {
  padding: 0.5rem 1rem;
  border-left: var(--brutalist-border-thick);
  background: var(--text-dark);
  color: var(--text-light);
}

.card-body {
  display: grid;
  grid-template-columns: 300px 1fr;
}

.image-compartment {
  position: relative;
  border-right: var(--brutalist-border-thick);
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 10px 10px;
}

.avatar-target {
  width: 100%;
  max-width: 200px;
  height: auto;
  filter: drop-shadow(4px 4px 0px rgba(0, 0, 0, 0.1));
}

.avatar-target.scale-down {
  max-width: 130px;
}

.content-compartment {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  font-family: var(--font-display);
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.card-text {
  font-family: var(--font-main);
  font-size: 1.05rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-box {
  background: var(--text-light);
  padding: 0.3rem 0.7rem;
  border: 2px solid var(--text-dark);
  font-family: var(--font-main);
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
}

/* CROSSHAIRS */
.crosshair {
  position: absolute;
  width: 12px;
  height: 12px;
}
.top-left {
  top: 8px;
  left: 8px;
  border-top: 2px solid var(--text-dark);
  border-left: 2px solid var(--text-dark);
}
.bottom-right {
  bottom: 8px;
  right: 8px;
  border-bottom: 2px solid var(--text-dark);
  border-right: 2px solid var(--text-dark);
}

/* =========================
   MOBILE RESPONSIVE FIX
   ========================= */
@media (width <= 850px) {
  .teach-section {
    padding: 4rem 1rem;
  }
  .grid-wrapper {
    gap: 3rem;
  }
  .card-body {
    grid-template-columns: 1fr;
  }

  .image-compartment {
    border-right: none;
    border-bottom: var(--brutalist-border-thick);
    padding: 1rem;
    height: 180px;
  }

  .avatar-target {
    max-width: 140px;
  }
  .avatar-target.scale-down {
    max-width: 100px;
  }

  .content-compartment {
    padding: 1.5rem 1.25rem;
    text-align: center;
  }

  .card-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .card-text {
    font-size: 0.95rem;
    margin-bottom: 1rem;
    line-height: 1.4;
  }
  .tag-group {
    justify-content: center;
  }
}

@media (width <= 400px) {
  .image-compartment {
    height: 140px;
  }
  .avatar-target {
    max-width: 110px;
  }
  .card-title {
    font-size: 1.3rem;
  }
}
</style>
