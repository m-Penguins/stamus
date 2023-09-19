// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // ... other options
  modules: [
    "@pinia/nuxt",
  ],
  css: [
    "@/assets/styles/global.scss",
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
  imports: {
    dirs: ["stores", "utils"],
  },
  // plugins: [
  //   { src: '~/plugins/bvi.js', ssr: false },
  // ]
});


// import { defineNuxtPlugin } from 'nuxt';

// export default defineNuxtPlugin(function (nuxtApp) {
//   // Your plugin code here
// });
