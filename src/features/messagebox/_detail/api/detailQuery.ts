import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  MessageResponse,
  useGetMessageListProps,
  usePatchMessageStatusProps,
  usePostEmojiProps,
  EmojiProps,
} from '@/features/messagebox/_detail/model/messagebox.types'
import { baseQuery } from '@/shared/api/baseQuery'

// 쪽지 리스트
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

// 쪽지 상세
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

// 반응 템플릿
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

// 쪽지 상태 변경
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

// 반응 보내기
export const usePostEmoji = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['postEmoji'],
    mutationFn: async ({ messageId, templateIds }: usePostEmojiProps) => {
      const { data } = await baseQuery.post(
        `/v2/messages/${messageId}/reactions`,
        { templateIds },
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
      console.log('이모지 등록 성공')
    },
    onError: (error) => {
      console.error('이모지 등록 실패: ', error)
    },
  })
}

// 안읽은 반응, 메세지 여부
export const useGetUnreadCount = () => {
  return useQuery({
    queryKey: ['getUnreadCount'],
    queryFn: async () => {
      const data = await baseQuery.get(`/v2/messages/unread`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('keep_in_touch_token')}`,
        },
      })
      return data
    },
  })
}
