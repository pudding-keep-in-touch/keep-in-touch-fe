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

export interface HomeResponse {
  data: {
    isOwner: boolean
    dmList: DmList[]
  }
}

export interface ReceivedMessageApiResponse {
  messages: DmList[]
  nextPage: number | null
}
