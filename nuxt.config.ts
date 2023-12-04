// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // ... other options
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'http://176.99.11.245:1338/uploads/bvi_min_c859dc6023.css', type: 'text/css' }
    ],
    script: [
      { src: 'http://176.99.11.245:1338/uploads/bvi_min_4122b9d8da.js' },
      {
        src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        type: "text/javascript"
      },
    ]
  },
  modules: [
    "@pinia/nuxt",
    [
      "nuxt-mail",
      {
        message: [
          { name: "form", to: process.env.MAIL_TO },
          { name: "ndfl", to: process.env.MAIL_TO_TAXES },
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
