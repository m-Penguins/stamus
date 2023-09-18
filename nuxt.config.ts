// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
   // ... other options
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  // plugins: [
  //   { src: '~/plugins/bvi.js', ssr: false } // Указываем путь к вашему плагину и отключаем серверный рендеринг (SSR) если необходимо
  // ],
})
