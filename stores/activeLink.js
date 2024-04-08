import { defineStore } from 'pinia'

export const useActuveLink = defineStore('activeLink', {
  state: () => (
    {
      isActiveLink: true
    }
  ),
  getters: {
    getActiveLink: (state) => state.isActiveLink
  },
  actions: {
    togglerLink(index) {
      this.isActiveLink = index
    }
  },
})