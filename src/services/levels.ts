import type { LevelResponse } from '@/models/level'
import { api } from '@/services/api'

interface GetLevelsParameters {
  Id?: number | string
  Author?: string
  Name?: string
  Uid?: string
  WorkshopId?: number | string
  Limit?: number
  Offset?: number
  Sort?: string
}

export const getLevels = async ({
  Id,
  Author,
  Name,
  Uid,
  WorkshopId,
  Limit,
  Offset,
  Sort
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
  const response = await api.get('levels', { params: query })

  if (response.status === 200) return response.data as LevelResponse
  else {
    throw new Error(response.data.error)
  }
}
