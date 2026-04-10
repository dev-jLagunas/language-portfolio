// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/main.css"],
  srcDir: "app/",
  modules: ["@nuxtjs/i18n", "@nuxtjs/google-fonts", "@nuxt/icon"],

  app: {
    head: {
      title: "Juan Lagunas | English Teacher & Coach",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Expert English coaching for professionals and serious students. Master the logic of language through a linguistic-first approach and move your life forward.",
        },
        {
          name: "keywords",
          content:
            "English coach Japan, business English, TOEIC preparation, linguistic coaching, learn English Ishikawa, professional English teacher, Juan Lagunas",
        },
        // Open Graph / Facebook
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://jlag-english.netlify.app/" },
        {
          property: "og:title",
          content: "Juan Lagunas | Expert English Coaching",
        },
        {
          property: "og:description",
          content:
            "Straightforward, high-level English instruction for people serious about their progress. No fluff, just results.",
        },
        { property: "og:image", content: "https://i.imgur.com/JRSlPLS.png" },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:url", content: "https://jlag-english.netlify.app/" },
        {
          name: "twitter:title",
          content: "Juan Lagunas | English Teacher & Coach",
        },
        {
          name: "twitter:description",
          content:
            "Move your life forward with better English. Specialist coaching using linguistic strategy.",
        },
        { name: "twitter:image", content: "https://i.imgur.com/JRSlPLS.png" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://jlag-english.netlify.app/" },
      ],
    },
  },

  googleFonts: {
    families: {
      "DM Serif Display": [400, 700, 900],
      "Source Sans 3": [400, 700],
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
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  nitro: {
    prerender: {
      routes: ["/"],
    },
  },
});
