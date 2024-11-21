import { useQuery } from '@tanstack/react-query'
import { useGetMessageListProps } from '@/features/messagebox/model/messagebox.types'
import { baseQuery } from '@/shared/api/baseQuery'

interface useGetMessageDetailProps {
  messageId: number
}
interface MessageResponse {
  received_message_count: number
  nextCursor: string | null // nextCursor 이거 타입 확인 필요, Date로 변경 가능성 O
  messageList: Array<{
    messageId: number
    receiverId: number
    receiverNickname: string
    content: string
    createdAt: string
  }>
}

const mockData = {
  received_message_count: 3,
  nextCursor: '2024-11-15T08:08:38.654Z',
  messageList: [
    {
      messageId: 1,
      receiverId: 11,
      receiverNickname: 'John Doe',
      content: 'Hello!',
      createdAt: '2024-10-01',
    },
    {
      messageId: 2,
      receiverId: 11,
      receiverNickname: 'John Doe',
      content: 'How are you?',
      createdAt: '2024-10-02',
    },
    {
      messageId: 3,
      receiverId: 11,
      receiverNickname: 'John Doe',
      content: 'Goodbye!',
      createdAt: '2024-10-03',
    },
  ],
}

// 목 데이터 테스트
export const useGetMessageList = ({
  userId,
  type,
  cursor,
  limit,
  order,
}: useGetMessageListProps) => {
  return useQuery<MessageResponse, Error>({
    queryKey: ['getMessageList', userId, type],
    queryFn: async () => {
      return mockData
    },
    enabled: true,
  })
}

// export const useGetMessageList = ({
//   userId,
//   type,
//   cursor,
//   limit,
//   order,
// }: useGetMessageListProps) => {
//   return useQuery<MessageResponse, Error>({
//     queryKey: ['getMessageList', userId, type, cursor],
//     queryFn: async () => {
//       const { data } = await baseQuery.get(
//         `/v2/users/${userId}/messages?type=${type}&cursor=${cursor}&limit=${limit}&order=${order}`,
//         {
//           params: {
//             type,
//             cursor,
//             limit,
//             order,
//           },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
//           },
//         }
//       )
//       return data
//     },
//     enabled: true,
//   })
// }

// mock 데이터 테스트
export const useGetMessageDetail = ({
  messageId,
}: useGetMessageDetailProps) => {
  return useQuery({
    queryKey: ['getDetailMessage', messageId],
    // queryFn: async () => {
    //   const { data } = await baseQuery.get(`/v2/messages/${messageId}`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
    //     },
    //   })
    //   return data
    queryFn: async () => {
      return mockData
    },
  })
}
