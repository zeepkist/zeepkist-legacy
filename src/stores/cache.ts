import { add, type Duration } from 'date-fns'
import { defineStore } from 'pinia'

interface Cache {
  expiresAt: number
  data: Record<string, any>
}

export const useCacheStore = defineStore('cache', {
  state: () => ({
    cache: new Map<string, Cache>(JSON.parse(localStorage.myMap))
  }),
  actions: {
    getCache(key: string) {
      const hit = this.cache.get(key)

      if (hit && hit.expiresAt > Date.now()) {
        return hit.data
      }

      // If the cache is expired, delete it
      this.cache.delete(key)
      return
    },
    setCache(key: string, data: Cache, duration: Duration) {
      const expiresAt = add(new Date(), duration).getTime()
      this.cache.set(key, { expiresAt, data })
      JSON.stringify([...this.cache])
    },
    deleteCache(key: string) {
      this.cache.delete(key)
      JSON.stringify([...this.cache])
    }
  }
})
