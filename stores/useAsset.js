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
      return assets['/assets/' + path]
    }
  },
})