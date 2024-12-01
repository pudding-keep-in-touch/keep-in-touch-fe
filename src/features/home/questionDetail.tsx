'use client'

import useIsVisible from '@/shared/hooks/useIsVisible'
import { QuestionLayout } from '@/shared/ui/layouts/QuestionLayout'
import { QuestionsCard } from '@/features/home/ui/questionsCard'
import Tooltip from '@/features/home/ui/tooltip'
import LinkShareButton from '@/features/home/ui/linkShareButton'
import React from 'react'
import Image from 'next/image'

interface QuestionDetailProps {
  questionId: string
  userId: number
}

export default function QuestionDetail({
  questionId,
  userId,
}: QuestionDetailProps) {
  const [toggle, setToggle] = React.useState(false)
  const [visibleRef, isVisible] = useIsVisible({
    options: { threshold: 0, rootMargin: '0px' },
    initialState: false,
  })

  const onClickToggle = () => {
    setToggle((prev) => !prev)
  }

  return (
    <QuestionLayout isVisible={isVisible} isHome={false} userId={userId}>
      {/* <div className='w-full h-screen flex flex-col relative'> */}
      <div className='flex-grow w-full h-screen pt-[82px] h-815:pb-[200px] overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
        <div className='w-full px-[24px]'>
          <div className='flex-grow w-full'>
            <QuestionsCard
              userId={userId}
              questionId={questionId}
              title='질문'
              description={`10년지기 친구들아 ㅎㅎ 나의 어떤 점이 너`}
              isHome={false}
            />
            <div className='flex flex-col mt-5 mb-4 gap-2'>
              <h3 className='font-semibold text-[16px] tracking-[-0.75px]'>
                숨기기 설정
              </h3>
              <p className='font-medium text-[12px] leading-[130%] tracking-[-0.75px] text-[#6B7684]'>
                질문 숨기기를 설정하면 전체 리스트 공유 시 해당 질문이 노출되지
                않습니다.
              </p>
            </div>
            {!toggle ? (
              <button
                onClick={onClickToggle}
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
                onClick={onClickToggle}
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
          <LinkShareButton userId={userId} />
        </Tooltip>
      </div>
    </QuestionLayout>
  )
}
