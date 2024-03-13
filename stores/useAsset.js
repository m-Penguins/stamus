import { defineStore } from "pinia";

export const useAssets = defineStore("assets", {
  state: () => ({}),
  getters: {},
  actions: {
    useAsset(path) {
      const assets = import.meta.glob("~/assets/images/**/**", {
        eager: true,
        import: "default",
      });
      return assets["/assets/images/" + path];
    },
  },
});
