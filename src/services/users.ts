import type { AxiosError } from 'axios'

import type { User } from '@/models/user'
import { api } from '@/services/api'

interface GetUserParameters {
  id?: number
  steamId?: string
}

export const getUser = async ({ id, steamId }: GetUserParameters) => {
  try {
    const response = await (id
      ? api.get('user/id', { params: { id } })
      : api.get('user/steamid', { params: { SteamId: steamId } }))

    if (response.status === 200) return response.data as User
    else {
      throw new Error(response.data.error)
    }
  } catch (error: AxiosError | any) {
    throw new Error(error)
  }
}
