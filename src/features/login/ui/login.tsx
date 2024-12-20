'use client'

import GoogleButton from '@/features/login/ui/googleButton'
import KakaoButton from '@/features/login/ui/kakaoButton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules'

// swiper/css
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { OnBoardingStep } from './onBoardingStep'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { decodeJwt } from 'jose'

const onBoardingMockData = [
  {
    id: 1,
    title: '나의 마음 전하기',
    description: '친구가 공유한 질문에 답해보세요!',
    imageUrl: '/onboarding_step1.svg',
  },
  {
    id: 2,
    title: '질문 공유하기',
    description: '질문을 만들어 링크를 공유하세요!',
    imageUrl: '/onboarding_step2.svg',
  },
]

export const Login = () => {
  const router = useRouter()
  const coverflowEffectConfig = {
    slideShadows: false,
    rotate: 0,
    stretch: 0,
    depth: 0,
  }

  const [cookies] = useCookies(['keep_in_touch_token', 'keep_in_touch_user_id'])
  const pathname = usePathname()
  const [loading, setLoading] = React.useState(true) // 로딩 상태 관리
  const [isChecked, setIsChecked] = React.useState(false)

  React.useEffect(() => {
    const checkToken = async () => {
      const token = cookies.keep_in_touch_token
      const userId = cookies.keep_in_touch_user_id

      if (!token || !userId) {
        redirectToLogin()
        return
      }

      try {
        // JWT 디코딩
        const { exp } = decodeJwt(token)
        const currentTime = Math.floor(Date.now() / 1000) // 현재 시간 (초 단위)

        // 만료 시간 확인
        if (exp && exp < currentTime) {
          console.warn('Token has expired.')
          redirectToLogin()
          return
        }
      } catch (error) {
        console.error('Invalid token:', error)
        redirectToLogin()
        return
      }

      // 유효한 토큰과 유저 ID가 있는 경우
      setLoading(false)
      router.push(`/home/${userId}`)
    }

    const redirectToLogin = () => {
      if (pathname === '/login') {
        setLoading(false)
        return
      }
      setTimeout(() => {
        router.replace('/login')
      }, 2000)
      setLoading(false)
    }

    checkToken()
  }, [
    cookies.keep_in_touch_token,
    cookies.keep_in_touch_user_id,
    pathname,
    router,
  ])

  if (loading) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center bg-white box-border'>
        <p>login Loading...</p>
      </div>
    )
  }

  return (
    <div className='relative w-full h-screen-safe z-0 bg-light-background pb-safe-bottom'>
      <div className='w-full h-full overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
        <div className='mt-[82px] h-815:mb-[178px]'>
          <Swiper
            // direction='vertical'
            modules={[EffectCoverflow, Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            slidesPerView='auto'
            speed={500}
            effect='coverflow'
            coverflowEffect={coverflowEffectConfig}
            className='w-full h-full relative'
            pagination={{
              el: '.swiper-pagination', // 외부에서 관리
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
            }}
          >
            {onBoardingMockData.map((item) => (
              <SwiperSlide key={item.id} className='relative'>
                <OnBoardingStep
                  stepNum={item.id}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                />
              </SwiperSlide>
            ))}

            {/* 커스텀 위치 */}
            <div className='swiper-pagination absolute left-0 w-full flex justify-center'></div>
          </Swiper>
        </div>
      </div>
      <div className='sticky w-full bottom-0 flex flex-col justify-center items-start px-[10px] py-[20px] pt-3 gap-[14px] rounded-tl-[16px] rounded-tr-[16px] z-20'>
        {/* TODO : 카카오 로그인 API 완성되면 추가해야함 */}
        <KakaoButton />
        <GoogleButton />
      </div>
    </div>
  )
}
