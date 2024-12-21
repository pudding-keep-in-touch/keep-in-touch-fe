export interface DmList {
  id: number
  senderId: number
  receiverId: string
  content: string
  emotion: {
    name: string
    emoji: string
  }
  isRead: boolean
  comments: object
  createdAt: string
}
