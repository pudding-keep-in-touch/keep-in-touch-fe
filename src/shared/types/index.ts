export interface MainLayoutProps {
  children: React.ReactNode
}

export interface DmList {
  id: number
  senderId: number
  content: string
  emotion: {
    name: string
    emoji: string
  }
  isRead: boolean
  createdAt: string
}

export interface HomeResponse {
  data: {
    isOwner: boolean
    dmList: DmList[]
  }
}
