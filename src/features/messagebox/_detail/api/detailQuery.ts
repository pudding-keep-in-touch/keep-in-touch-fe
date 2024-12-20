import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  EmojiProps,
  MessageDetail,
  MessageResponse,
  useGetMessageListProps,
} from '@/features/messagebox/model/messagebox.types'
import { baseQuery } from '@/shared/api/baseQuery'

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
        params.append('cursor', cursor.toString())
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
export const useGetMessageDetail = ({ messageId }: { messageId: string }) => {
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
    reactionTemplateId: '1',
    emoji: '😊',
    content: '고마워',
    type: '감사',
  },
  {
    reactionTemplateId: '2',
    emoji: '🥰',
    content: '덕분이야',
    type: '감사',
  },
  {
    reactionTemplateId: '3',
    emoji: '😘',
    content: '최고야',
    type: '감사',
  },
  {
    reactionTemplateId: '4',
    emoji: '🥹',
    content: '감동이야',
    type: '감사',
  },
  {
    reactionTemplateId: '5',
    emoji: '🤭',
    content: '너밖에 없어',
    type: '감사',
  },
  {
    reactionTemplateId: '6',
    emoji: '🥲',
    content: '내가 더 잘할게',
    type: '사과',
  },
  {
    reactionTemplateId: '7',
    emoji: '😔',
    content: '잘못했어',
    type: '사과',
  },
  {
    reactionTemplateId: '8',
    emoji: '🥹',
    content: '죄인이오',
    type: '사과',
  },
  {
    reactionTemplateId: '9',
    emoji: '😭',
    content: '반성하는 중',
    type: '사과',
  },
  {
    reactionTemplateId: '10',
    emoji: '🥺',
    content: '미안해',
    type: '사과',
  },
  {
    reactionTemplateId: '11',
    emoji: '😎',
    content: '화이팅',
    type: '응원',
  },
  {
    reactionTemplateId: '12',
    emoji: '🤩',
    content: '멋있어',
    type: '응원',
  },
  {
    reactionTemplateId: '13',
    emoji: '👏',
    content: '고생 많았어',
    type: '응원',
  },
  {
    reactionTemplateId: '14',
    emoji: '💪',
    content: '응원할게',
    type: '응원',
  },
  {
    reactionTemplateId: '15',
    emoji: '🍀',
    content: '행운을 빌어요',
    type: '응원',
  },
  {
    reactionTemplateId: '16',
    emoji: '☺️',
    content: '그럴 수 있지',
    type: '화해',
  },
  {
    reactionTemplateId: '17',
    emoji: '🤗',
    content: '괜찮아',
    type: '화해',
  },
  {
    reactionTemplateId: '18',
    emoji: '😁',
    content: '잘 부탁해',
    type: '화해',
  },
  {
    reactionTemplateId: '19',
    emoji: '😤',
    content: '나한테 잘해',
    type: '화해',
  },
  {
    reactionTemplateId: '20',
    emoji: '😉',
    content: '한 번만 봐줄게',
    type: '화해',
  },
]

// export const useGetEmoji = () => {
//   return useQuery({
//     queryKey: ['getEmoji'],
//     queryFn: async () => {
//       return emojis
//     },
//   })
// }

// 본 테스트
export const useGetEmoji = () => {
  return useQuery({
    queryKey: ['getEmoji'],
    queryFn: async () => {
      const data = await baseQuery.get<EmojiProps[]>(
        `/v2/reactions/templates`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
          },
        }
      )
      return data
    },
  })
}

interface usePatchMessageStatusProps {
  messageId: string
  status: string
}
export const usePatchMessageStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['patchMessageStatus'],
    mutationFn: async ({ messageId, status }: usePatchMessageStatusProps) => {
      const { data } = await baseQuery.patch(
        `/v2/messages/${messageId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
          },
        }
      )
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getDetailMessage'] })
      console.log('상태 변경 성공')
    },
    onError: (error) => {
      console.error('상태 변경 실패: ', error)
    },
  })
}
