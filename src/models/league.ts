export interface LeagueStanding {
  username: string
  steamId: string
  totalPoints: number
}

export type LeagueUser = [
  string,
  {
    username: string
    totalPoints: number
  }
]

export type LeagueLevel = [
  string,
  {
    username: string
    steamId: string
    time: number
    points: number
  }
]

export interface LeagueEvent {
  users: LeagueUser[]
  levels: LeagueLevel[]
}
