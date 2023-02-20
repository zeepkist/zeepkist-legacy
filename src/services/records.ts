import type { Duration } from 'date-fns'

import type { RecordResponse } from '@/models/record'
import { api } from '@/services/api'
import { useCacheStore } from '@/stores/cache'

const cache = useCacheStore()

interface GetRecordsParameters {
  LevelId?: number | string
  LevelUid?: string
  LevelWorkshopId?: number | string
  UserSteamId?: number | string
  UserId?: number | string
  BestOnly?: boolean
  ValidOnly?: boolean
  InvalidOnly?: boolean
  WorldRecordOnly?: boolean
  GameVersion?: string
  Sort?: string
  Limit?: number
  Offset?: number
  cacheDuration?: Duration
}

export const getRecords = async ({
  LevelId,
  LevelUid,
  LevelWorkshopId,
  UserSteamId,
  UserId,
  BestOnly,
  ValidOnly,
  InvalidOnly,
  WorldRecordOnly,
  GameVersion,
  Sort,
  Limit,
  Offset,
  cacheDuration
}: GetRecordsParameters = {}) => {
  const query = {
    LevelId,
    LevelUid,
    LevelWorkshopId,
    UserSteamId,
    UserId,
    BestOnly,
    ValidOnly,
    InvalidOnly,
    WorldRecordOnly,
    GameVersion,
    Sort,
    Limit,
    Offset
  }

  const cacheKey = JSON.stringify(query)
  const cacheHit = cache.getCache(cacheKey)
  if (cacheHit) {
    return cacheHit as RecordResponse
  }

  const response = await api.get('records', { params: query })

  if (response.status === 200) {
    if (cacheDuration) {
      cache.setCache(cacheKey, response.data, cacheDuration)
    }
    return response.data as RecordResponse
  } else {
    throw new Error(response.data.error)
  }
}
