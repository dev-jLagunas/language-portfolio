// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/main.css"],
  srcDir: "app/",
  modules: ["@nuxtjs/i18n", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      "DM Serif Display": [400, 700, 900],
      "Source Sans 3": [400, 700], // A clean sans-serif for UI/Body text
    },
    download: true,
    inject: true,
  },
  i18n: {
    langDir: "locales",
    defaultLocale: "en",
    strategy: "prefix_except_default",
    locales: [
      { code: "en", iso: "en-US", file: "en.json" },
      { code: "es", iso: "es-ES", file: "es.json" },
      { code: "jp", iso: "ja-JP", file: "jp.json" },
      { code: "fr", iso: "fr-FR", file: "fr.json" },
    ],
  },
});
