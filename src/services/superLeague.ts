import ky from 'ky'

import type {
  Metadata,
  MetadataEvents,
  SeasonEvent,
  Standing
} from '@/models/superLeague.js'

const api = ky.create({
  prefixUrl: '/api/super-league/'
})

export const getSeasons = async () => {
  const response = await api.get('metadata.json')
  return response.json() as Promise<Metadata[]>
}

export const getSeason = async (season: string) => {
  const response = await api.get(`${season}/metadata.json`)
  return response.json() as Promise<MetadataEvents>
}

export const getSeasonStandings = async (season: string) => {
  const response = await api.get(`${season}/standings.json`)
  return response.json() as Promise<Standing[]>
}

export const getEvent = async (season: string, event: string) => {
  const response = await api.get(`${season}/${event}.json`)
  return response.json() as Promise<SeasonEvent>
}
