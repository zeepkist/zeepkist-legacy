import type { AxiosError } from 'axios'

import type { Record } from '@/models/record'
import { api } from '@/services/api'

interface GetRecordsParameters {
  LevelId?: number | string
  LevelUid?: string
  LevelWorkshopId?: number | string
  UserSteamId?: number | string
  UserId?: number | string
  BestOnly?: boolean
  ValidOnly?: boolean
  WorldRecordOnly?: boolean
  Limit?: number
  Offset?: number
}

export const getRecords = async ({
  LevelId,
  LevelUid,
  LevelWorkshopId,
  UserSteamId,
  UserId,
  BestOnly,
  ValidOnly = true,
  WorldRecordOnly,
  Limit,
  Offset
}: GetRecordsParameters = {}) => {
  try {
    const query = {
      LevelId,
      LevelUid,
      LevelWorkshopId,
      UserSteamId,
      UserId,
      BestOnly,
      ValidOnly,
      WorldRecordOnly,
      Limit,
      Offset
    }
    const response = await api.get('record', { params: query })

    if (response.status === 200) return response.data as Record
    else {
      throw new Error(response.data.error)
    }
  } catch (error: AxiosError | any) {
    throw new Error(error)
  }
}
