import { add, type Duration } from 'date-fns'
import { defineStore } from 'pinia'

interface Cache {
  expiresAt: number
  data: Record<string, any>
}

const restoreCache = () => {
  const parsedCache = JSON.parse(localStorage.getItem('cache') || '[]')
  return new Map<string, Cache>(parsedCache || [])
}

const persistCache = (cache: Map<string, Cache>) => {
  localStorage.setItem('cache', JSON.stringify([...cache]))
}

export const useCacheStore = defineStore('cache', {
  state: () => ({
    cache: restoreCache()
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
      persistCache(this.cache)
    },
    deleteCache(key: string) {
      this.cache.delete(key)
      persistCache(this.cache)
    }
  }
})
