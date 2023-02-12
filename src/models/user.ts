export interface User {
  id: number
  steamId: string
  steamName: string
}

export interface UserRanking {
  user: User
  amountOfWorldRecords: number
  position: number
}

export interface UserResponse extends User {}

export interface UserRankingsResponse {
  totalAmount: number
  rankings: UserRanking[]
}
