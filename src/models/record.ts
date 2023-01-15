import type { Level } from '@/models/level'
import type { User } from '@/models/user'

export interface LevelRecord {
  id: number
  dateCreated: string
  time: number
  splits: number[]
  ghostUrl: string
  screenshotUrl: string
  isBest: boolean
  isValid: boolean
  isWorldRecord: boolean
  gameVersion: string
  user: User
  level: Level
}

export interface RecordResponse {
  totalAmount: number
  records: LevelRecord[]
}
