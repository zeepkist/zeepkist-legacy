import type { Level } from '@/models/level'
import type { User } from '@/models/user'

export interface RecordRecord {
  id: number
  dateCreated: string
  time: number
  splits: number[]
  ghostUrl: string
  screenshotUrl: string
  isBest: boolean
  gameVersion: string
  user: User
  level: Level
}

export interface Record {
  totalAmount: number
  records: RecordRecord[]
}
