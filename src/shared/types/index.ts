export interface MainLayoutProps {
  children: React.ReactNode
}

interface User {
  id: number
  nickname: string
  email: string
}

interface Emotion {
  name: string
  emoji: string
}

interface FriendUser {
  id: number
  nickname: string
}

interface EmotionOption {
  id: number
  name: string
  emoji: string
}

export interface DirectMessage {
  id: number
  senderId: number
  receiverId: number
  content: string
  emotion: Emotion
  comment: string | null
  isRead: boolean
  createdAt: string
}

export interface HomeData {
  isOwner: boolean
  loginUser: User
  dmList: DirectMessage[] | null
  friendUser: FriendUser | null
  emotions: EmotionOption[] | null
}
