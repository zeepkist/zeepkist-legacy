import { defineStore } from 'pinia'

import type { Authentication } from '~/models/authentication'
import { refresh } from '~/services/gtr'
import { getStorage, removeStorage, setStorage } from '~/utils'

const id = 'authentication'
const cache = getStorage<Authentication>(id)

export const useAuthenticationStore = defineStore({
  id,
  state: (): Authentication =>
    cache || {
      UserId: undefined,
      SteamId: undefined,
      AccessToken: undefined,
      AccessExpiry: undefined,
      RefreshToken: undefined,
      RefreshExpiry: undefined
    },
  actions: {
    login(auth: Authentication) {
      this.UserId = auth.UserId
      this.SteamId = auth.SteamId
      this.AccessToken = auth.AccessToken
      this.AccessExpiry = auth.AccessExpiry
      this.RefreshToken = auth.RefreshToken
      this.RefreshExpiry = auth.RefreshExpiry
      setStorage(id, auth)
    },
    logout() {
      removeStorage(id)
      this.UserId = undefined
      this.SteamId = undefined
      this.AccessToken = undefined
      this.AccessExpiry = undefined
      this.RefreshToken = undefined
      this.RefreshExpiry = undefined
    },
    async refresh() {
      console.debug('Refreshing token')
      if (this.RefreshExpiry && new Date(this.RefreshExpiry) < new Date()) {
        console.debug('Refresh token expired, logging out')
        this.logout()
      } else if (this.RefreshToken && this.SteamId) {
        console.debug('Refresh token valid, refreshing')
        this.login(await refresh(this.SteamId, this.RefreshToken))
      } else {
        console.debug('No refresh token, logging out')
        this.logout()
      }
    }
  }
})
