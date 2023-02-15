import axios from 'axios'

import { API_URL } from '@/configs'

export const api = axios.create({
  baseURL: API_URL
})

export const superLeagueApi = axios.create({
  baseURL: '/super-league/'
})
