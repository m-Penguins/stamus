import { defineStore } from 'pinia'

export const useModalsStore = defineStore('modal', {
  state: () => ({
    isOpen: false
  }),
  getters: {
    getStateModal: (state) => state.isOpen
  },
  actions: {
    switchModalState(value) {
      this.isOpen = value
    }
  },
})