import type { Duration } from 'date-fns'

import type { UserRankingsResponse, UserResponse } from '@/models/user'
import { api } from '@/services/api'
import { useCacheStore } from '@/stores/cache'

interface GetUserParameters {
  id?: number
  steamId?: string
  cacheDuration?: Duration
}

export const getUser = async ({
  id,
  steamId,
  cacheDuration
}: GetUserParameters) => {
  const cache = useCacheStore()
  const cacheKey = JSON.stringify({ id, steamId })
  const cacheHit = cache.getCache(cacheKey)
  if (cacheHit) {
    return cacheHit as UserRankingsResponse
  }

  const response = await (id
    ? api.get('users/id', { params: { id } })
    : api.get('users/steamid', { params: { SteamId: steamId } }))

  if (response.status === 200) {
    if (cacheDuration) {
      cache.setCache(cacheKey, response.data, cacheDuration)
    }
    return response.data as UserResponse
  } else {
    throw new Error(response.data.error)
  }
}

interface GetUserRankingsParameters {
  Limit?: number
  Offset?: number
  cacheDuration?: Duration
}

export const getUserRankings = async ({
  Limit,
  Offset,
  cacheDuration
}: GetUserRankingsParameters) => {
  const query = {
    Limit,
    Offset
  }

  const cache = useCacheStore()
  const cacheKey = JSON.stringify(query)
  const cacheHit = cache.getCache(cacheKey)
  if (cacheHit) {
    return cacheHit as UserRankingsResponse
  }

  const response = await api.get('users/rankings', { params: query })

  if (response.status === 200) {
    if (cacheDuration) {
      cache.setCache(cacheKey, response.data, cacheDuration)
    }
    return response.data as UserRankingsResponse
  } else {
    throw new Error(response.data.error)
  }
}
