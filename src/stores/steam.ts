import { defineStore } from 'pinia'

export const useSteamStore = defineStore({
  id: 'steam',
  state: () => ({
    steamId: localStorage.getItem('steamId') || ''
  }),
  actions: {
    setSteamId(steamId: string) {
      this.steamId = steamId
      localStorage.setItem('steamId', steamId)
    },
    logout() {
      this.steamId = ''
      localStorage.removeItem('steamId')
    }
  }
})
