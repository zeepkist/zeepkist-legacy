import type { AxiosError } from 'axios'

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
}

export const getLevels = async ({
  Id,
  Author,
  Name,
  Uid,
  WorkshopId,
  Limit,
  Offset
}: GetLevelsParameters = {}) => {
  try {
    const query = {
      Id,
      Author,
      Name,
      Uid,
      WorkshopId,
      Limit,
      Offset
    }
    const response = await api.get('level', { params: query })

    if (response.status === 200) return response.data as LevelResponse
    else {
      throw new Error(response.data.error)
    }
  } catch (error: AxiosError | any) {
    throw new Error(error)
  }
}
