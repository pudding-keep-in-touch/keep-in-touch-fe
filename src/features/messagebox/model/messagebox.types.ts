// import { MessageType } from "@/shared/types/common.types"
import { MessageType } from '../_detail/model/messagebox.types'

export type MessageBoxType = {
  messageId: number
}
// export type ExtendedMessageType = MessageType | 'reaction'

type questionContainer = {
  questionId: number
  content: string
}
type emotionContainer = {
  emotionId: number
  name: string
  emoji: string
}

type reactionContainer = {
  reactionId: number
  content: string
  type: string
  emoji: string
}

// 받은 쪽지 상세 조회 타입
// export interface MessageDetail {
//   messageId: number
//   type: string
//   receiverId: number
//   receiverNickname: string
//   content: string
//   emotion?: emotionContainer
//   question: questionContainer
//   reactions: reactionContainer[]
//   status?: string
//   createdAt: string
// }

export interface MessageDetail {
  messageId: number
  type: string
  receiverId: number
  receiverNickname: string
  content: string
  question: {
    questionId: number
    content: string
  }
  reactions: {
    reactionId: number
    content: string
    type: string
    emoji: string
  }[]
  status?: string
  createdAt: string
}

type Message = {
  messageId: number
  receiverId: number
  receiverNickname: string
  content: string
  status?: string
  createdAt: string
}
// 받은 쪽지 리스트 조회 타입
export interface MessageResponse {
  received_message_count: number
  nextCursor: string | null
  messageList: Message[]
}
export interface useGetMessageListProps {
  userId: number
  type: MessageType
  cursor?: Date | null
  limit?: number
  order?: string
}

type Item = {
  id: number
  emoji: string
  name: string
}

export type DataType = {
  감사: Item[]
  사과: Item[]
  응원: Item[]
  화해: Item[]
}

export type EmojiProps = {
  category: keyof DataType
}
