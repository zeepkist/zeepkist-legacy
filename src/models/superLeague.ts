interface User {
  username: string
  team?: string
  steamId: string
}

export interface MetadataEvent extends Record<string, string> {
  name: string
  workshopId: string
}

export interface MetadataEvents {
  [key: string]: {
    [key: string]: MetadataEvent
  }
}

export interface MetadataSeason {
  events?: MetadataEvents
  points?: number[]
  finishPoints?: number
}

export type Metadata = [string, MetadataSeason]

export interface Standing extends User {
  totalPoints: number
}

export interface EventLevelStanding extends User {
  time: number
  points: number
}

export interface EventLevel {
  level: string
  standings: EventLevelStanding[]
}

export interface SeasonEvent {
  users: Standing[]
  levels: EventLevel[]
}
