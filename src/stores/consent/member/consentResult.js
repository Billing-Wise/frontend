import { defineStore } from 'pinia'

export const useConsentResultStore = defineStore('consentResult', {
  state: () => ({
    infoMap: {}
  }),
  actions: {
    setInfo(contractId, info) {
      this.infoMap[contractId] = info
    },
    getInfo(contractId) {
      return this.infoMap[contractId] || null
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: sessionStorage,
        paths: ['infoMap']
      }
    ]
  }
})