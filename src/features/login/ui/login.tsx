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
  const coverflowEffectConfig = {
    slideShadows: false,
    rotate: 0,
    stretch: 0,
    depth: 0,
  }

  return (
    <div className='w-full h-screen flex flex-col justify-start items-center relative'>
      <div className='w-full h-full overflow-y-auto h-815:overflow-y-scroll h-815:scrollbar-hide'>
        <div className='mt-[82px] h-815:mb-[178px]'>
          <Swiper
            // direction='vertical'
            modules={[EffectCoverflow, Autoplay, Pagination]}
            //   autoplay={{ delay: 5000, disableOnInteraction: false }}
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
        <div className='font-medium bottom-0 p-[18px] w-full h-fit flex flex-col gap-2 mt-auto mb-[30px] leading-[130%] tracking-[-1px] absolute z-10'>
          <KakaoButton />
          <GoogleButton />
        </div>
      </div>
    </div>
  )
}
