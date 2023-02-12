import type { AxiosError } from 'axios'

import type { RecordResponse } from '@/models/record'
import { api } from '@/services/api'

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
      InvalidOnly,
      WorldRecordOnly,
      GameVersion,
      Sort,
      Limit,
      Offset
    }
    const response = await api.get('records', { params: query })

    if (response.status === 200) return response.data as RecordResponse
    else {
      throw new Error(response.data.error)
    }
  } catch (error: AxiosError | any) {
    throw new Error(error)
  }
}
