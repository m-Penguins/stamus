import { defineStore } from 'pinia'

export const useAssets = defineStore('assets', {
  state: () => ({
  }),
  getters: {
  },
  actions: {
    useAsset(path) {
      const assets = import.meta.glob('~/assets/**/*', {
        eager: true,
        import: 'default',
      })
      // console.log(assets['/assets/' + path]);
      return assets['/assets/' + path]
    }
  },
})