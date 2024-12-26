'use client'

import useIsVisible from '@/shared/hooks/useIsVisible'
import { QuestionLayout } from '@/shared/ui/layouts/QuestionLayout'
import { QuestionsCard } from '@/features/home/ui/questionsCard'
import Tooltip from '@/features/home/ui/tooltip'
import LinkShareButton from '@/features/home/ui/linkShareButton'
import React from 'react'
import Image from 'next/image'
import { useGetQuestionList, usePostQuestionHidden } from './api/api'
import { QuestionData } from '@/features/home/model/home.types'
interface QuestionDetailProps {
  questionId: string
  userId: string
}

export default function QuestionDetail({
  questionId,
  userId,
}: QuestionDetailProps) {
  const [detailQuestion, setDetailQuestion] = React.useState<QuestionData[]>()
  const [, isVisible] = useIsVisible({
    options: { threshold: 0, rootMargin: '0px' },
    initialState: false,
  })
  const [isHidden, setIsHidden] = React.useState(false)

  const { data } = useGetQuestionList({ userId })
  const { mutateAsync, isPending, isError } = usePostQuestionHidden()

  const handleToggle = async (isToggle: boolean) => {
    try {
      console.log('Mutation payload:', { questionId, isHidden: isToggle })
      setIsHidden(isToggle) // 상태 업데이트
      const response = await mutateAsync({
        questionId,
        isHidden: isToggle,
      })

      if (!response) {
        console.error('Response is empty:', response)
      }
    } catch (error) {
      console.error('Failed to toggle question visibility:', error)
    }
  }

  React.useEffect(() => {
    const filterData = data?.filter((item) => item.questionId === questionId)
    setDetailQuestion(filterData)
    if (filterData?.length) {
      setIsHidden(filterData[0].isHidden) // 초기 상태 설정
    }
  }, [data, questionId])

  return (
    <QuestionLayout isVisible={isVisible} isHome={false} userId={userId}>
      {/* <div className='w-full h-screen flex flex-col relative'> */}
      <div className='flex-grow w-full h-screen pt-[82px] h-815:pb-[200px] overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
        <div className='w-full px-[24px]'>
          <div className='flex-grow w-full'>
            {detailQuestion?.map((question) => (
              <QuestionsCard
                key={question.questionId}
                userId={userId}
                questionId={questionId}
                isHidden={question.isHidden}
                description={question.content}
                createdAt={question.createdAt}
                isHome={false}
                title='질문'
              />
            ))}

            <div className='flex flex-col mt-5 mb-4 gap-2'>
              <h3 className='font-semibold text-[16px] tracking-[-0.75px]'>
                숨기기 설정
              </h3>
              <p className='font-medium text-[12px] leading-[130%] tracking-[-0.75px] text-[#6B7684]'>
                질문 숨기기를 설정하면 전체 리스트 공유 시 해당 질문이 노출되지
                않습니다.
              </p>
            </div>
            {!isHidden ? (
              <button
                onClick={() => handleToggle(true)}
                className='flex w-[159px] py-2 w-320:w-full h-[47px] justify-between items-center px-4 bg-gray-1 rounded-2xl'
              >
                <Image
                  src='/icon_show.svg'
                  alt='show icon'
                  width={30}
                  height={30}
                />
                <span className='font-medium text-[14px] leading-[22px] tracking-[-0.43px] text-gray-3'>
                  이 질문 숨기기
                </span>
              </button>
            ) : (
              <button
                onClick={() => handleToggle(false)}
                className='flex w-[198px] py-2 w-320:w-full h-[47px] justify-between items-center px-4 bg-[#C5C5C5] rounded-2xl'
              >
                <Image
                  src='/icon_hide.svg'
                  alt='hide icon'
                  width={30}
                  height={30}
                />
                <span className='font-medium text-[14px] leading-[22px] tracking-[-0.43px] text-gray-3'>
                  숨김 처리된 질문입니다
                </span>
              </button>
            )}
          </div>
        </div>

        {/* 공유 버튼 */}
      </div>

      <div className='sticky flex justify-center items-start bottom-[100px] left-0 w-full p-[16px] pt-0'>
        <Tooltip>
          <LinkShareButton
            userId={userId}
            questionId={questionId}
            disabled={isPending || isError}
          />
        </Tooltip>
      </div>
    </QuestionLayout>
  )
}
