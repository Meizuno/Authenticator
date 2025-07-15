// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: false,
  srcDir: "src/",

  app: {
    rootAttrs: {
      class: "h-full",
    },
    head: {
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no viewport-fit=cover",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  modules: ["@nuxt/eslint", "@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  imports: {
    dirs: ["database"],
  },
});
