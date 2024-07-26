// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  serverMiddleware: [
    "~/server/middleware/redirect-www.ts",
    "~/server/middleware/trailing-slash.global",
  ],
  routeRules: {
    "/5otzivov": { redirect: "/leave-review" },
    "/chelyustno-licevoj-hirurgii/": {
      redirect: "/chelyustno-liczevaya-hirurgiya",
    },
    "/chelyustno-licevoj-hirurgii/consultation/": {
      redirect: "/chelyustno-liczevaya-hirurgiya",
    },
    "/detskaya-stomatologiya/crown/": {
      redirect: "/detskaya-stomatologiya/koronki-dlya-detej",
    },
    "/detskaya-stomatologiya/detskaya-hirurgiya/": {
      redirect: "/detskaya-stomatologiya/",
    },
    "/detskaya-stomatologiya/detskaya-hirurgiya/udalenie-molochnogo-zuba/": {
      redirect: "/detskaya-stomatologiya/udalenie-molochnogo-zuba",
    },
    "/detskaya-stomatologiya/lechenie-molochnykh-zubov/": {
      redirect: "/detskaya-stomatologiya/lechenie-molochnyh-zubov",
    },
    "/detskaya-stomatologiya/lechenie-molochnykh-zubov/lechenie-kariesa/": {
      redirect: "/detskaya-stomatologiya/lechenie-kariesa-molochnyh-zubov",
    },
    "/detskaya-stomatologiya/lechenie-pulpita/": {
      redirect: "/detskaya-stomatologiya/lechenie-pulpita-molochnyh-zubov",
    },
    "/osteotomiya-chelyusti/": {
      redirect: "/chelyustno-liczevaya-hirurgiya/orthognathic",
    },
    "/perelom-chelyusti/": {
      redirect: "/chelyustno-liczevaya-hirurgiya/Lechenie-pereloma-chelyusti",
    },
    "/plastika-uzdechki-guby/": {
      redirect: "/detskaya-stomatologiya/plastika-uzdechki-guby",
    },
    "/plastika-uzdechki-yazyka/": {
      redirect: "/detskaya-stomatologiya/plastika-uzdechki-yazyka",
    },
    "/rhinoplasty/": {
      redirect: "/chelyustno-liczevaya-hirurgiya/rhinoplasty",
    },
    "/sedation/": {
      redirect: "/detskaya-stomatologiya/lechenie-zubov-pod-sedaciej",
    },
    "/snimok-trg/": { redirect: "/uslugi/snimok-trg" },
    "/staff-detstvo/": { redirect: "/team?page=1&position=2" },
    "/staff-ortodonty/": { redirect: "/team?page=1&position=1" },
    "/tomografiya-zuba/": { redirect: "/uslugi/panoramnyj-snimok-zubov" },
    "/uslugi/dental-prosthetics/crown/": {
      redirect: "/uslugi/dental-prosthetics",
    },
    "/uslugi/dental-prosthetics/crown/na-implanty/": {
      redirect: "/uslugi/koronki-na-implanty",
    },
    "/uslugi/dental-prosthetics/removable-dentures/": {
      redirect: "/uslugi/semnye-protezy",
    },
    "/uslugi/dental-prosthetics/veneers/": { redirect: "/uslugi/viniry" },
    "/uslugi/dental-prosthetics/veneers/emax/": { redirect: "/uslugi/viniry" },
    "/general": { redirect: "leave-review" },
    "/uslugi/dental-prosthetics/veneers/keramicheskie/": {
      redirect: "/uslugi/keramicheskie-koronki",
    },
    "/uslugi/gigiena/chistka-zubnogo-kamnya/": { redirect: "/uslugi/gigiena" },
    "/uslugi/gigiena/ultrazvukovaya-chistka-zubov/": {
      redirect: "/uslugi/gigiena",
    },
    "/uslugi/implantationstar/": { redirect: "/uslugi/implantaciya" },
    "/uslugi/implantationstar/one-stage-implantation/": {
      redirect: "/uslugi/odnomomentnaya-implantaciya",
    },
    "/uslugi/orthodontics/aligners/": { redirect: "/uslugi/elajnery" },
    "/uslugi/orthodontics/samoligiruyushchie-brekety/": {
      redirect: "/uslugi/samoligiruyushchie-brekety",
    },
    "/uslugi/surgery/udalenie-zuba-mudrosti/": {
      redirect: "/uslugi/udalenie-zuba-mudrosti",
    },
    "/uslugi/therapy/": { redirect: "/uslugi" },
    "/uslugi/therapy/microscope/": {
      redirect: "/uslugi/lechenie-zubov-pod-mikroskopom",
    },
    "/detskaya-stomatologiya/lechenie-zubov-pod-narkozom/": {
      redirect: "/detskaya-stomatologiya/lechenie-zubov-pod-sedaciej",
    },
    "/dms/": { redirect: "/business" },
    "/otzivy/": { redirect: "/reviews" },
    "/staff/": { redirect: "/team" },
    "/price/": { redirect: "/prices" },
    "/rhinoplasty/": {
      redirect: "/chelyustno-liczevaya-hirurgiya/rhinoplasty",
    },
    "/sale/": { redirect: "/discounts" },
    "/sedation/": {
      redirect: "/lechenie-zubov-pod-narkozom/lechenie-zubov-vo-sne",
    },
    "/uslugi/orthodontics/lingual-braces/": { redirect: "/uslugi/brekety" },
  },
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
  // robots: {
  //   credits: false,
  // },
  modules: [
    "@nuxt/image",
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
