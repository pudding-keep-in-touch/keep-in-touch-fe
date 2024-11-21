export type MessageBoxType = {
  messageId: number
}
export type BoxType = 'inbox' | 'outbox'

export type MessageType = 'sent' | 'received'
interface Message {
  messageId: number
  receiverId: number
  receiverNickname: string
  content: string
  status?: string
  createdAt: string
}

// export interface MessageResponse {
//   received_message_count: number
//   nextCursor: string | null
//   messageList: Message[]
// }

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
