'use client'
import { MessageType } from '@/features/messagebox/_detail/model/messagebox.types'
import MessageDetail from '@/features/messagebox/ui/MessageDetail'
import MessageDetailLayout from '@/features/messagebox/_detail/ui/MessageDetailLayout'
import { VarietyType } from '@/shared/types/common.types'

export default function Page({
  params: { userId, type, messageId, variety },
}: {
  params: {
    userId: number
    type: MessageType
    messageId: number
    variety: VarietyType
  }
}) {
  return (
    <MessageDetailLayout
      messageType={type}
      variety={variety}
      messageId={messageId}
    >
      <MessageDetail userId={userId} messageId={messageId} messageType={type} />
    </MessageDetailLayout>
  )
}
