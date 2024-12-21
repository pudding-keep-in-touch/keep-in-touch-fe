import { DirectMessage, EmotionOption, User } from '@/shared/types/common.types'

export interface FriendUser {
  id: number
  nickname: string
}

export interface HomeData {
  isOwner: boolean
  loginUser: User
  dmList: DirectMessage[] | null
  friendUser: FriendUser | null
  emotions: EmotionOption[] | null
}

export interface QuestionData {
  questionId: string
  content: string
  isHidden: boolean
  createdAt: string
}
