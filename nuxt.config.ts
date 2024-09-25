// https://nuxt.com/docs/api/configuration/nuxt-config
import compression from "compression";

export default defineNuxtConfig({
  devtools: { enabled: false },
  serverMiddleware: [
    "~/server/middleware/redirect-www.ts",
    "~/server/middleware/trailing-slash.global",
  ],
  buildModules: [
    [
      "@nuxt-modules/compression",
      {
        algorithm: "brotliCompress",
      },
    ],
  ],
  compression: {
    algorithm: "brotliCompress",
  },
  routeRules: {
    "/5otzivov": { redirect: { to: "/leave-review", statusCode: 301 } },
    "/chelyustno-licevoj-hirurgii/": {
      redirect: { to: "/chelyustno-liczevaya-hirurgiya", statusCode: 301 },
    },
    "/chelyustno-licevoj-hirurgii/consultation/": {
      redirect: { to: "/chelyustno-liczevaya-hirurgiya", statusCode: 301 },
    },
    "/detskaya-stomatologiya/crown/": {
      redirect: {
        to: "/detskaya-stomatologiya/koronki-dlya-detej",
        statusCode: 301,
      },
    },
    "/detskaya-stomatologiya/detskaya-hirurgiya/": {
      redirect: { to: "/detskaya-stomatologiya/", statusCode: 301 },
    },
    "/detskaya-stomatologiya/detskaya-hirurgiya/udalenie-molochnogo-zuba/": {
      redirect: {
        to: "/detskaya-stomatologiya/udalenie-molochnogo-zuba",
        statusCode: 301,
      },
    },
    "/detskaya-stomatologiya/lechenie-molochnykh-zubov/": {
      redirect: {
        to: "/detskaya-stomatologiya/lechenie-molochnyh-zubov",
        statusCode: 301,
      },
    },
    "/detskaya-stomatologiya/lechenie-molochnykh-zubov/lechenie-kariesa/": {
      redirect: {
        to: "/detskaya-stomatologiya/lechenie-kariesa-molochnyh-zubov",
        statusCode: 301,
      },
    },
    "/detskaya-stomatologiya/lechenie-pulpita/": {
      redirect: {
        to: "/detskaya-stomatologiya/lechenie-pulpita-molochnyh-zubov",
        statusCode: 301,
      },
    },
    "/osteotomiya-chelyusti/": {
      redirect: {
        to: "/chelyustno-liczevaya-hirurgiya/orthognathic",
        statusCode: 301,
      },
    },
    "/perelom-chelyusti/": {
      redirect: {
        to: "/chelyustno-liczevaya-hirurgiya/Lechenie-pereloma-chelyusti",
        statusCode: 301,
      },
    },
    "/plastika-uzdechki-guby/": {
      redirect: {
        to: "/detskaya-stomatologiya/plastika-uzdechki-guby",
        statusCode: 301,
      },
    },
    "/plastika-uzdechki-yazyka/": {
      redirect: {
        to: "/detskaya-stomatologiya/plastika-uzdechki-yazyka",
        statusCode: 301,
      },
    },
    "/rhinoplasty/": {
      redirect: {
        to: "/chelyustno-liczevaya-hirurgiya/rhinoplasty",
        statusCode: 301,
      },
    },
    "/sedation/": {
      redirect: {
        to: "/detskaya-stomatologiya/lechenie-zubov-pod-sedaciej",
        statusCode: 301,
      },
    },
    "/snimok-trg/": {
      redirect: { to: "/uslugi/snimok-trg", statusCode: 301 },
    },
    "/staff-detstvo/": {
      redirect: { to: "/team?page=1&position=2", statusCode: 301 },
    },
    "/staff-ortodonty/": {
      redirect: { to: "/team?page=1&position=1", statusCode: 301 },
    },
    "/tomografiya-zuba/": {
      redirect: { to: "/uslugi/panoramnyj-snimok-zubov", statusCode: 301 },
    },
    "/uslugi/dental-prosthetics/crown/": {
      redirect: { to: "/uslugi/dental-prosthetics", statusCode: 301 },
    },
    "/uslugi/dental-prosthetics/crown/na-implanty/": {
      redirect: { to: "/uslugi/koronki-na-implanty", statusCode: 301 },
    },
    "/uslugi/dental-prosthetics/removable-dentures/": {
      redirect: { to: "/uslugi/semnye-protezy", statusCode: 301 },
    },
    "/uslugi/dental-prosthetics/veneers/": {
      redirect: { to: "/uslugi/viniry", statusCode: 301 },
    },
    "/uslugi/dental-prosthetics/veneers/emax/": {
      redirect: { to: "/uslugi/viniry", statusCode: 301 },
    },
    "/general": {
      redirect: { to: "/leave-review", statusCode: 301 },
    },
    "/uslugi/dental-prosthetics/veneers/keramicheskie/": {
      redirect: { to: "/uslugi/keramicheskie-koronki", statusCode: 301 },
    },
    "/uslugi/gigiena/chistka-zubnogo-kamnya/": {
      redirect: { to: "/uslugi/gigiena", statusCode: 301 },
    },
    "/uslugi/gigiena/ultrazvukovaya-chistka-zubov/": {
      redirect: { to: "/uslugi/gigiena", statusCode: 301 },
    },
    "/uslugi/implantationstar/": {
      redirect: { to: "/uslugi/implantaciya", statusCode: 301 },
    },
    "/uslugi/implantationstar/one-stage-implantation/": {
      redirect: { to: "/uslugi/odnomomentnaya-implantaciya", statusCode: 301 },
    },
    "/uslugi/orthodontics/aligners/": {
      redirect: { to: "/uslugi/elajnery", statusCode: 301 },
    },
    "/uslugi/orthodontics/samoligiruyushchie-brekety/": {
      redirect: { to: "/uslugi/samoligiruyushchie-brekety", statusCode: 301 },
    },
    "/uslugi/surgery/udalenie-zuba-mudrosti/": {
      redirect: { to: "/uslugi/udalenie-zuba-mudrosti", statusCode: 301 },
    },
    "/uslugi/therapy/": {
      redirect: { to: "/uslugi", statusCode: 301 },
    },
    "/uslugi/therapy/microscope/": {
      redirect: {
        to: "/uslugi/lechenie-zubov-pod-mikroskopom",
        statusCode: 301,
      },
    },
    "/detskaya-stomatologiya/lechenie-zubov-pod-narkozom/": {
      redirect: {
        to: "/detskaya-stomatologiya/lechenie-zubov-detyam-vo-sne",
        statusCode: 301,
      },
    },
    "/dms/": {
      redirect: { to: "/business", statusCode: 301 },
    },
    "/otzivy/": {
      redirect: { to: "/reviews", statusCode: 301 },
    },
    "/staff/": {
      redirect: { to: "/team", statusCode: 301 },
    },
    "/price/": {
      redirect: { to: "/prices", statusCode: 301 },
    },
    "/sale/": {
      redirect: { to: "/discounts", statusCode: 301 },
    },
    "/uslugi/orthodontics/lingual-braces/": {
      redirect: { to: "/uslugi/brekety", statusCode: 301 },
    },
  },
  router: {
    trailingSlash: false,
    middleware: ["redirect"],
  },
  nitro: {
    compressPublicAssets: true,
    middleware: {
      // Добавляем middleware для сжатия
      compression: compression(),
    },
    routeRules: {
      "/_nuxt/**": {
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
      },
      "/images/**": {
        headers: { "Cache-Control": "public, max-age=31536000, immutable" },
      },
    },
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
          href: "/bvi.min.css",
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
        {
          src: "/roistat.js",
          tagPosition: "bodyClose",
          type: "text/javascript",
        },
      ],
    },
  },
  // robots: {
  //   credits: false,
  // },
  modules: [
    "@nuxt/image",
    // "nuxt-purgecss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    // "nuxt-simple-robots",
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
