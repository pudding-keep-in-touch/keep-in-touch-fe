import HomeIcon from '@/features/home/icons/homeIcon'
import MessageIcon from '@/features/home/icons/messageIcon'
import { usePathname, useRouter } from 'next/navigation'

import React from 'react'

interface NavProps {
  type: string
  userId: string
  isNew: boolean
  messageType: string
}

export const Nav = ({ type, userId, isNew, messageType }: NavProps) => {
  const router = useRouter()
  const pathname = usePathname()
  // 활성 탭 상태 관리
  const [activeTab, setActiveTab] = React.useState<string>('')

  const tabs = [
    {
      id: 0,
      link: `/home/${userId}`,
      imageUrl: '/nav_home.svg',
      label: '홈',
      Icon: HomeIcon, // 아이콘 컴포넌트 직접 포함
    },
    {
      id: 1,
      link: `/messagebox/${userId}`,
      imageUrl: '/nav_message.svg',
      label: 'My 퐁',
      Icon: MessageIcon, // 아이콘 컴포넌트 직접 포함
    },
  ]

  // 초기 진입 시 활성 탭 설정
  React.useEffect(() => {
    if (pathname) {
      setActiveTab(pathname) // 경로가 있을 때 활성 탭 업데이트
    }
  }, [pathname])

  return (
    <div
      className={`sticky w-full h-[84px] shadow-custom-top bottom-0 flex justify-center items-start px-[10px] pt-3 z-10 gap-[97px] rounded-tl-[16px] rounded-tr-[16px] ${type === 'home' ? 'bg-white' : 'bg-gray-1'}`}
    >
      {tabs.map((tab) => {
        const isActive =
          activeTab ===
          (tab.id === 0
            ? tab.link
            : messageType
              ? `/messagebox/${userId}/${messageType}`
              : tab.link)
        return (
          <>
            <button
              key={tab.id}
              className='flex flex-col items-center text-gray-500 gap-1'
              onClick={() => {
                router.push(tab.link)
                setActiveTab(tab.link) // 버튼 클릭 시 활성 탭 업데이트
              }}
            >
              {isNew && tab.label === 'My 퐁' && (
                <div className='absolute bottom-[55px] max-w-[56px] w-full h-[50px] z-[16]'>
                  <div className='relative flex justify-center items-center w-[56px] h-[24px] bg-[#35B6FF] rounded-[4px]'>
                    <p className='text-[#F3F3F9] text-[10px] font-normal leading-[20px] tracking-[-0.1px] text-left'>
                      퐁 도착!
                    </p>

                    <div className='absolute right-[65%] bottom-[3px]'>
                      <svg
                        className='absolute'
                        width='16'
                        height='8'
                        viewBox='0 0 16 8'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M8 8L0 0H16L8 8Z' fill='#35B6FF' />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              {/* 아이콘 색상 적용 */}
              <tab.Icon changeColor={isActive ? '#35B6FF' : '#BDBDBD'} />
              <span
                className={`text-[11px] font-semibold ${
                  isActive ? 'text-[#35B6FF]' : 'text-[#6B7684]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          </>
        )
      })}
    </div>
  )
}
