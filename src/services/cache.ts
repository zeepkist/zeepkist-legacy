import {
  getRecords,
  type RecordsParameters,
  type RecordsResponse
} from '@zeepkist/gtr-api'
import type { Duration } from 'date-fns'

import { useCacheStore } from '@/stores/cache'

export const getCachedRecords = async (
  parameters: RecordsParameters,
  duration: Duration
) => {
  const cache = useCacheStore()
  const cacheKey = `${getRecords.name}-${JSON.stringify(parameters)}`

  const cacheHit = cache.getCache(cacheKey)
  if (cacheHit) {
    return cacheHit as RecordsResponse
  }

  const response = await getRecords(parameters)

  cache.setCache(cacheKey, response, duration)

  return response
}
