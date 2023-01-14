import type { AxiosError } from 'axios'

import type { Record } from '@/models/record'
import { api } from '@/services/api'

export const getRecords = async () => {
  try {
    const response = await api.get('record')

    if (response.status === 200) return response.data as Record
    else {
      throw new Error(response.data.error)
    }
  } catch (error: AxiosError | any) {
    throw new Error(error)
  }
}

interface GetRecordParameters {
  id: number
}

export const getRecord = async ({ id }: GetRecordParameters) => {
  try {
    const response = await api.get('record', { params: { id } })

    if (response.status === 200) return response.data as Record
    else {
      throw new Error(response.data.error)
    }
  } catch (error: AxiosError | any) {
    throw new Error(error)
  }
}
