// 쪽지함 리스트 보여주는
export type ListItem = {
  sentMessageCount: number
  nextCursor: Date
  messageList: [
    {
      messageId: number
      receiverId: number
      receiverNickname: string
      content: string
      status: string
      createdAt: string
    },
  ]
}
