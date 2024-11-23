import { useQuery } from '@tanstack/react-query'
import {
  MessageDetail,
  MessageResponse,
  useGetMessageListProps,
} from '@/features/messagebox/model/messagebox.types'
// import { baseQuery } from '@/shared/api/baseQuery'

// 받은 쪽지 리스트
const receivedMockData = {
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

// 보낸 쪽지 리스트
const sentMockData = {
  sentMessageCount: 3,
  nextCursor: '2024-11-15T08:08:38.654',
  messageList: [
    {
      messageId: 1,
      receiverId: 1,
      receiverNickname: 'Jisu Kim',
      content: '안녕, 너가 토이 프로젝트를 배포까지 하다니 진짜 대단하다..!!',
      status: 'normal',
      createdAt: '2024-09-02',
    },
    {
      messageId: 2,
      receiverId: 1,
      receiverNickname: 'Jisu Kim',
      content: '안녕, 너가 토이 프로젝트를 배포까지 하다니 진짜 대단하다..!!',
      status: 'normal',
      createdAt: '2024-09-02',
    },
    {
      messageId: 3,
      receiverId: 1,
      receiverNickname: 'Jisu Kim',
      content: '안녕, 너가 토이 프로젝트를 배포까지 하다니 진짜 대단하다..!!',
      status: 'normal',
      createdAt: '2024-09-02',
    },
  ],
}

// 받은 쪽지 상세
const receivedDetailMockData = {
  messageId: 1,
  type: 'received',
  receiverId: 11,
  receiverNickname: '제인',
  content: '질문에 대한 상세 대답',
  question: {
    questionId: 1,
    content: '상세임 여기',
  },
  reactions: [
    {
      reactionId: 1,
      content: '고마워',
      type: '감사',
      emoji: '🖤',
    },
    {
      reactionId: 2,
      content: '미안해',
      type: '사과',
      emoji: '💙',
    },
    {
      reactionId: 3,
      content: '항상 응원해',
      type: '응원',
      emoji: '💛',
    },
    {
      reactionId: 4,
      content: '만나서 얘기하자',
      type: '사과',
      emoji: '🧡',
    },
    {
      reactionId: 5,
      content: '너밖에 없어',
      type: '감사',
      emoji: '🤍',
    },
  ],
  status: 'normal',
  createdAt: '2024-09-02',
}

// 보낸 쪽지 상세
const sentDetailMockData = {
  status: 200,
  message: '쪽지 조회 성공',
  data: {
    messageId: 1,
    type: 'sent',
    receiverId: 11,
    receiverNickname: 'Jisu Kim',
    content: '안녕, 너가 토이 프로젝트를 배포까지 하다니 진짜 대단하다..!!',
    emotion: {
      emotionId: 1,
      name: '응원과 감사',
      emoji: '🌟',
    },
    reactions: [
      {
        reactionId: 1,
        content: '감사감사합니다~',
        type: '감사',
        emoji: '🧐',
      },
    ],
    createdAt: '2024-09-02',
  },
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
    queryKey: ['getMessageList', userId, type, cursor, limit, order],
    queryFn: async () => {
      return receivedMockData
    },
    enabled: true,
  })
}

// 본 테스트
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
export const useGetMessageDetail = ({ messageId }: { messageId: number }) => {
  return useQuery<MessageDetail, Error>({
    queryKey: ['getDetailMessage', messageId],
    queryFn: async () => {
      return receivedDetailMockData
    },
  })
}

// 본 테스트
// export const useGetMessageDetail = ({ messageId }: MessageDetail) => {
//   return useQuery({
//     queryKey: ['getDetailMessage', messageId],
//     queryFn: async () => {
//       const { data } = await baseQuery.get(`/v2/messages/${messageId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
//         },
//       })
//       return data
//     },
//   })
// }
