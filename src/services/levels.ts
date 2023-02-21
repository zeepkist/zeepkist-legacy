import type { Duration } from 'date-fns'

import type { LevelResponse } from '@/models/level'
import { api } from '@/services/api'
import { useCacheStore } from '@/stores/cache'

interface GetLevelsParameters {
  Id?: number | string
  Author?: string
  Name?: string
  Uid?: string
  WorkshopId?: number | string
  Limit?: number
  Offset?: number
  Sort?: string
  cacheDuration?: Duration
}

export const getLevels = async ({
  Id,
  Author,
  Name,
  Uid,
  WorkshopId,
  Limit,
  Offset,
  Sort,
  cacheDuration
}: GetLevelsParameters = {}) => {
  const query = {
    Id,
    Author,
    Name,
    Uid,
    WorkshopId,
    Limit,
    Offset,
    Sort
  }

  const cache = useCacheStore()
  const cacheKey = JSON.stringify(query)
  const cacheHit = cache.getCache(cacheKey)
  if (cacheHit) {
    return cacheHit as LevelResponse
  }

  const response = await api.get('levels', { params: query })

  if (response.status === 200) {
    if (cacheDuration) {
      cache.setCache(cacheKey, response.data, cacheDuration)
    }
    return response.data as LevelResponse
  } else {
    throw new Error(response.data.error)
  }
}
