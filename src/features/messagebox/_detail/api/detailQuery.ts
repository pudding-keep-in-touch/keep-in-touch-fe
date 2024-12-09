import { useQuery } from '@tanstack/react-query'
import {
  MessageDetail,
  MessageResponse,
  useGetMessageListProps,
} from '@/features/messagebox/model/messagebox.types'
import { baseQuery } from '@/shared/api/baseQuery'

// 받은 쪽지 리스트
const receivedMockData = {
  receivedMessageCount: 4,
  nextCursor: new Date('2024-11-15T08:08:38.654Z'),
  messageList: [
    {
      messageId: '1',
      receiverId: '1',
      receiverNickname: 'John Doe',
      content: 'Hello!',
      status: 'reported',
      createdAt: new Date('2024-09-01'),
      readAt: new Date('2024-09-04'),
    },
    {
      messageId: '2',
      receiverId: '1',
      receiverNickname: 'John Doe',
      content: 'How are you?',
      status: 'normal',
      createdAt: new Date('2024-09-02'),
      readAt: null,
    },
    {
      messageId: '3',
      receiverId: '1',
      receiverNickname: 'John Doe',
      content: 'Goodbye!',
      status: 'hidden',
      createdAt: new Date('2024-09-03'),
      readAt: new Date('2024-09-06'),
    },
    {
      messageId: '4',
      receiverId: '1',
      receiverNickname: 'John Doe',
      content: 'Hello!',
      status: 'normal',
      createdAt: new Date('2024-09-04'),
      readAt: new Date('2024-09-07'),
    },
  ],
}

// 보낸 쪽지 리스트
const sentMockData = {
  sentMessageCount: 3,
  nextCursor: new Date('2024-11-15T08:08:38.654Z'),
  messageList: [
    {
      messageId: '1',
      receiverId: '1',
      receiverNickname: 'Jisu Kim',
      content: '보낸쪽지 상세 1안녕1',
      createdAt: new Date('2024-09-02'),
      reactionInfo: {
        readAt: null,
        createdAt: new Date('2024-09-02T08:08:38.654'),
      },
    },
    {
      messageId: '2',
      receiverId: '1',
      receiverNickname: 'Jisu Kim',
      content: '보낸 쪽지 상세 2언제 만날래??!!!',
      createdAt: new Date('2024-09-02'),
      reactionInfo: {
        readAt: null,
        createdAt: new Date('2024-09-02T08:08:38.654'),
      },
    },
    {
      messageId: '3',
      receiverId: '1',
      receiverNickname: 'Jisu Kim',
      content: '보낸 쪽지 상세 3 연말 파티하자',
      createdAt: new Date('2024-09-02'),
      reactionInfo: {
        readAt: null,
        createdAt: new Date('2024-09-02T08:08:38.654'),
      },
    },
    // {
    //   messageId: '4',
    //   receiverId: '1',
    //   receiverNickname: 'Jisu Kim',
    //   content: '보낸 쪽지 상세 4 코스튬도 입어?',
    //   createdAt: new Date('2024-09-05'),
    //   reactionInfo: {
    //     readAt: null,
    //     createdAt: new Date('2024-09-02T08:08:38.654'),
    //   },
    // },
  ],
}

// 받은 쪽지 상세
const receivedDetailMockData = {
  status: 200,
  message: '쪽지 조회 성공',
  data: {
    messageId: '1',
    type: 'received',
    receiverId: '1',
    receiverNickname: '제인',
    content:
      '내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성내용작성',
    question: {
      questionId: '1',
      content: '질문 남겨주라',
    },
    reactions: [
      // {
      //   reactionId: '1',
      //   content: '고마워',
      //   type: '감사',
      //   emoji: '🖤',
      // },
      // {
      //   reactionId: '2',
      //   content: '미안해',
      //   type: '사과',
      //   emoji: '💙',
      // },
      // {
      //   reactionId: '3',
      //   content: '궁금해',
      //   type: '응원',
      //   emoji: '💛',
      // },
      // {
      //   reactionId: '4',
      //   content: '만나서 얘기하자',
      //   type: '사과',
      //   emoji: '🧡',
      // },
      // {
      //   reactionId: '5',
      //   content: '너밖에 없어',
      //   type: '감사',
      //   emoji: '🤍',
      // },
    ],
    status: 'normal',
    createdAt: new Date('2024-09-02'),
  },
}

// 보낸 쪽지 상세
const sentDetailMockData = {
  status: 200,
  message: '쪽지 조회 성공',
  data: {
    messageId: '1',
    type: 'sent',
    receiverId: '11',
    receiverNickname: 'Jisu Kim',
    content: '보낸 쪽지 상세 - content',
    emotion: {
      emotionId: 1,
      name: '응원과 감사',
      emoji: '🌟',
    },
    reactions: [
      {
        reactionId: '1',
        content: '감사감사합니다~',
        type: '감사',
        emoji: '🧐',
      },
    ],
    createdAt: new Date('2024-09-02'),
  },
}
// 쪽지 리스트 api
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
      const baseUrl = `/v2/users/${userId}/messages?type=${type}`
      const params = new URLSearchParams()
      if (cursor) {
        params.append('cursor', cursor)
      }
      if (limit) {
        params.append('limit', limit.toString())
      }
      if (order) {
        params.append('order', order)
      }

      const url = params.toString()
        ? `${baseUrl}&${params.toString()}`
        : baseUrl

      try {
        const { data } = await baseQuery.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
          },
        })
        if (!data) {
          throw new Error('No data received')
        }
        return data
      } catch (error) {
        console.error('Error fetching messages:', error)
        throw Error
      }
    },
    placeholderData: (previousData) => previousData,
    staleTime: 1000,
  })
}

// 쪽지 상세 api
export const useGetMessageDetail = ({ messageId }: { messageId: number }) => {
  return useQuery({
    queryKey: ['getDetailMessage', messageId],
    queryFn: async () => {
      const { data } = await baseQuery.get(`/v2/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
        },
      })
      return data
    },
  })
}

const emojis = [
  {
    templateId: '1',
    type: '감사',
    emoji: '😊',
    content: '고마워',
  },
  {
    templateId: '2',
    type: '감사',
    emoji: '🥰',
    content: '덕분이야',
  },
  {
    templateId: '3',
    type: '감사',
    emoji: '😘',
    content: '최고야',
  },
  {
    templateId: '4',
    type: '감사',
    emoji: '🥹',
    content: '감동이야',
  },
  {
    templateId: '5',
    type: '감사',
    emoji: '🤭',
    content: '너밖에 없어',
  },
  {
    templateId: '6',
    type: '사과',
    emoji: '🥲',
    content: '내가 더 잘할게',
  },
  {
    templateId: '7',
    type: '사과',
    emoji: '😔',
    content: '잘못했어',
  },
  {
    templateId: '8',
    type: '사과',
    emoji: '🥹',
    content: '죄인이오',
  },
  {
    templateId: '9',
    type: '사과',
    emoji: '😭',
    content: '반성하는 중',
  },
  {
    templateId: '10',
    type: '사과',
    emoji: '🥺',
    content: '미안해',
  },
  {
    templateId: '11',
    type: '응원',
    emoji: '😎',
    content: '화이팅',
  },
  {
    templateId: '12',
    type: '응원',
    emoji: '🤩',
    content: '멋있어',
  },
  {
    templateId: '13',
    type: '응원',
    emoji: '👏',
    content: '고생 많았어',
  },
  {
    templateId: '14',
    type: '응원',
    emoji: '💪',
    content: '응원할게',
  },
  {
    templateId: '15',
    type: '응원',
    emoji: '🍀',
    content: '행운을 빌어요',
  },
  {
    templateId: '16',
    type: '화해',
    emoji: '☺️',
    content: '그럴 수 있지',
  },
  {
    templateId: '17',
    type: '화해',
    emoji: '🤗',
    content: '괜찮아',
  },
  {
    templateId: '18',
    type: '화해',
    emoji: '😁',
    content: '잘 부탁해',
  },
  {
    templateId: '19',
    type: '화해',
    emoji: '😤',
    content: '나한테 잘해',
  },
  {
    templateId: '20',
    type: '화해',
    emoji: '😉',
    content: '한 번만 봐줄게',
  },
]

export const useGetEmoji = () => {
  return useQuery({
    queryKey: ['getEmoji'],
    queryFn: async () => {
      return emojis
    },
  })
}

// 본 테스트
// export const getEmojis = () => {
//   return useQuery({
//     queryKey: ['getEmoji'],
//     queryFn: async () => {
//       const { data } = await baseQuery.get(`/v2/reactions/templates`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
//         },
//       })
//       return data
//     },
//   })
// }
