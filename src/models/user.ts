export interface User {
  id: number
  steamId: string
  steamName: string
}

export interface UserResponse extends User {}

export interface UsersResponse {
  totalAmount: number
  users: User[]
}
