import type { AxiosError } from 'axios'

import type { User } from '@/models/user'
import { api } from '@/services/api'

interface GetUserParameters {
  id: number
}

export const getUser = async ({ id }: GetUserParameters) => {
  try {
    const response = await api.get('user', { params: { id } })

    if (response.status === 200) return response.data as User
    else {
      throw new Error(response.data.error)
    }
  } catch (error: AxiosError | any) {
    throw new Error(error)
  }
}
