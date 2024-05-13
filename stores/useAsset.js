<<<<<<< HEAD
import { defineStore } from "pinia";

export const useAssets = defineStore("assets", {
  state: () => ({}),
  getters: {},
  actions: {
    useAsset(path) {
      const assets = import.meta.glob("~/assets/images/**/*", {
        eager: true,
        import: "default",
      });
      return assets["/assets/" + path];
    },
  },
});
=======
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
>>>>>>> a32cc7504d371827e54429370578101f655096b2
