// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // ... other options
  modules: [
    "@pinia/nuxt",
    [
      "nuxt-mail",
      {
        message: {
          to: process.env.MAIL_TO,
        },
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
  ],
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
  plugins: [{ src: "@/plugins/yandex-map.client", mode: "client" }],
  // plugins: [
  //   { src: '~/plugins/bvi.js', ssr: false },
  // ]
});

// import { defineNuxtPlugin } from 'nuxt';

// export default defineNuxtPlugin(function (nuxtApp) {
//   // Your plugin code here
// });
