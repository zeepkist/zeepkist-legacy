import type { AxiosError } from 'axios'

import type { UserResponse, UsersResponse } from '@/models/user'
import { api } from '@/services/api'

interface GetUserParameters {
  id?: number
  steamId?: string
}

export const getUser = async ({ id, steamId }: GetUserParameters) => {
  try {
    const response = await (id
      ? api.get('users/id', { params: { id } })
      : api.get('users/steamid', { params: { SteamId: steamId } }))

    if (response.status === 200) return response.data as UserResponse
    else {
      throw new Error(response.data.error)
    }
  } catch (error: AxiosError | any) {
    throw new Error(error)
  }
}

interface GetUsersParameters {
  Limit?: number
  Offset?: number
}

export const getUsers = async ({ Limit, Offset }: GetUsersParameters) => {
  try {
    const query = {
      Limit,
      Offset
    }
    const response = await api.get('users', { params: query })

    if (response.status === 200) return response.data as UsersResponse
    else {
      throw new Error(response.data.error)
    }
  } catch (error: AxiosError | any) {
    throw new Error(error)
  }
}
