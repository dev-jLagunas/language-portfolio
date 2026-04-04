<script setup>
const currentYear = new Date().getFullYear();

const footerNav = {
  labs: [
    { name: "The English Lab", link: "/" },
    { name: "UX Design Portfolio", link: "#" },
    { name: "Systems Architecture", link: "#" },
  ],
  social: [
    { name: "YouTube", link: "#" },
    { name: "Instagram", link: "#" },
    { name: "Behance", link: "#" },
    { name: "Medium", link: "#" },
  ],
  legal: [
    { name: "Privacy Policy", link: "/privacy" },
    { name: "Terms of Service", link: "/terms" },
  ],
};
</script>

<template>
  <footer class="main-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="brand-column">
          <h2 class="footer-logo">THE<br />ENGLISH<br />LAB<span>.</span></h2>
          <p class="brand-mission">
            Bridging the gap between linguistic theory and functional systems.
            Designed and operated in Ishikawa, Japan.
          </p>
        </div>

        <div class="nav-group">
          <div class="nav-column">
            <span class="column-title">The Labs</span>
            <ul>
              <li v-for="item in footerNav.labs" :key="item.name">
                <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="nav-column">
            <span class="column-title">Network</span>
            <ul>
              <li v-for="item in footerNav.social" :key="item.name">
                <a :href="item.link" target="_blank" rel="noopener">{{
                  item.name
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          © {{ currentYear }} Juan Lagunas. All rights reserved.
        </div>

        <div class="legal-links">
          <NuxtLink
            v-for="item in footerNav.legal"
            :key="item.name"
            :to="item.link"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <div class="tech-stack">
          Built with <strong>Nuxt 4</strong> & <strong>Netlify</strong>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  background-color: var(--text-dark);
  color: #ffffff;
  padding: 100px 20px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  margin-bottom: 80px;
}

/* Brand Column */
.footer-logo {
  font-family: "DM Serif Display", serif;
  font-size: 2.5rem;
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}

.footer-logo span {
  color: #ff4d4d; /* Subtle accent dot */
}

.brand-mission {
  font-family: "Source Sans 3", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #aaa;
  max-width: 320px;
}

/* Nav Groups */
.nav-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.column-title {
  display: block;
  font-family: "Source Sans 3", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #666;
  margin-bottom: 1.5rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  margin-bottom: 0.75rem;
}

ul li a {
  font-family: "Source Sans 3", sans-serif;
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;
}

ul li a:hover {
  color: #888;
}

/* Bottom Bar */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Source Sans 3", sans-serif;
  font-size: 0.85rem;
  color: #666;
}

.legal-links {
  display: flex;
  gap: 2rem;
}

.legal-links a {
  color: #666;
  text-decoration: none;
}

.tech-stack strong {
  color: #fff;
  font-weight: 700;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .legal-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
