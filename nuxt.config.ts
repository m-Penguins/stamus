// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  router: {
    trailingSlash: false,
  },
  app: {
    head: {
      charset: "utf-8",
      htmlAttrs: {
        lang: "ru",
      },
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no",
      link: [
        { rel: "icon", type: "image/png", href: "/favicon/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
        {
          rel: "mask-icon",
          href: "/favicon/safari-pinned-tab.svg",
          color: "#232D5B",
        },
        {
          rel: "stylesheet",
          href: "/bvi.css",
          type: "text/css",
        },
      ],
      meta: [
        { name: "msapplication-TileColor", content: "#232D5B" },
        { name: "theme-color", content: "#ffffff" },
        { name: "msapplication-config", content: "/favicon/browserconfig.xml" },
      ],
      script: [
        {
          src: "/bvi.js",
          tagPosition: "bodyClose",
          type: "text/javascript",
          defer: true,
        },
      ],
    },
  },
  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-simple-robots",
    "@nuxtjs/sitemap",
    [
      "yandex-metrika-module-nuxt3",
      {
        id: "49742548",
        webvisor: true,
      },
    ],
    [
      "nuxt-mail",
      {
        message: [
          { name: "form", to: process.env.MAIL_TO },
          { name: "ndfl", to: process.env.MAIL_TO_TAXES },
          { name: "review", to: process.env.MAIL_TO_REVIEW },
        ],
        smtp: {
          host: "smtp.yandex.ru",
          port: 465,
          auth: {
            user: "dev@sloy.design",
            pass: process.env.MAIL_PASS,
          },
        },
      },
    ],
    "vue-yandex-maps/nuxt",
  ],
  yandexMetrika: {
    id: "49742548",
    // ...
  },
  site: {
    url: "https://stamus.ru",
    name: "STAMUS",
    trailingSlash: false,
  },
  sitemap: {
    sitemaps: {
      index: [{ sitemap: "https://stamus.ru/server/api/sitemap/index.xml" }],
    },
  },
  yandexMaps: {
    apikey: process.env.YANDEX_API_KEY,
  },
  css: ["@/assets/styles/global.scss"],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      baseUrl: process.env.BASE_URL,
    },
  },
  imports: {
    dirs: ["stores", "utils"],
  },
  image: {
    providers: {
      strapi: {
        provider: "~/providers/localImageSharp",
        options: {
          baseURL: `${process.env.BASE_URL}`,
        },
      },
    },
  },
});
