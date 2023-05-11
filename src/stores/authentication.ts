import { defineStore } from 'pinia'

import type { Authentication } from '~/models/authentication'
import { getStorage, removeStorage, setStorage } from '~/utils'

const id = 'authentication'

export const useAuthenticationStore = defineStore({
  id,
  state: () => ({
    ...(getStorage<Authentication>(id) ?? {
      UserId: undefined,
      SteamId: undefined,
      AccessToken: undefined,
      AccessExpiry: undefined,
      RefreshToken: undefined,
      RefreshExpiry: undefined
    })
  }),
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
    }
  }
})
