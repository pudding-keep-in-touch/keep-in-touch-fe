// 쪽지함 리스트 보여주는
export type ListItem = {
  sentMessageCount: number
  nextCursor: Date
  messageList: [
    {
      messageId: string
      receiverId: string
      receiverNickname: string
      content: string
      status: string
      createdAt: string
    },
  ]
}

// reaction 구조 잡고 타입 재검토 필요
export type MessageType = 'sent' | 'received'
