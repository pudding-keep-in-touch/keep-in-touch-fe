import { MessageType } from '../_detail/model/messagebox.types'

export type MessageBoxType = {
  messageId: string
}
export type Reactions = {
  reactionId: string
  content: string
  type: string
  emoji: string
}
// 쪽지 상세 조회
export interface MessageDetail {
  messageId: string
  type: string
  receiverId: string
  receiverNickname: string
  content: string
  question?: {
    questionId: string
    content: string
  }
  emotion?: {
    emotionId: string
    name: string
    emoji: string
  }
  reactions?: {
    reactionId: string
    content: string
    type: string
    emoji: string
  }[]
  status?: string
  createdAt: Date | null
}

type reaction = {
  readAt: Date | null
  createdAt: Date | null
}
export type Message = {
  messageId: string
  receiverId: string
  receiverNickname: string
  content: string
  status?: string
  createdAt: Date | null
  readAt?: Date | null
  reactionInfo?: reaction | null
}

// 쪽지 리스트 조회
export interface MessageResponse {
  receivedMessageCount?: number
  sentMessageCount?: number
  unreadMessageCount?: number // 받은 쪽지만
  nextCursor: Date | null
  messageList: Message[]
}
export interface useGetMessageListProps {
  userId: string
  type: MessageType
  cursor?: Date | null
  limit?: number
  order?: string
}

export type EmojiProps = {
  reactionTemplateId: string
  type: string
  content: string
  emoji: string
}

export type EmojiResponse = {
  status: number
  message: string
  data: {
    templateId: string
    type: string
    content: string
    emoji: string
  }
}

export interface usePatchMessageStatusProps {
  messageId: string
  status: string
}

export interface usePostEmojiProps {
  messageId: string
  templateIds: string[]
}
