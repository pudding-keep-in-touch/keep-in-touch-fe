export interface MainLayoutProps {
  children: React.ReactNode
}

export type MessageType = 'sent' | 'received'

export type VarietyType = 'thanks' | 'honestTalk'

export interface User {
  id: number
  nickname: string
  email: string
}

export interface Emotion {
  name: string
  emoji: string
}

export interface EmotionOption {
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
