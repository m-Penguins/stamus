// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // ... other options
  modules: [
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
  imports: {
    dirs: ["stores", "utils"],
  },
});
