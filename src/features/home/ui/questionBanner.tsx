import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay } from 'swiper/modules'
import { Swiper as SwiperClass } from 'swiper' // Swiper 클래스 가져오기

// swiper/css
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type QuestionBannerType = {
  id: number
  description: string
}

interface QuestionBannerProps {
  randomMockData: QuestionBannerType[]
  userId: string
}

export const QuestionBanner = ({
  randomMockData,
  userId,
}: QuestionBannerProps) => {
  const [currentDescription, setCurrentDescription] = React.useState('')
  const router = useRouter()

  const coverflowEffectConfig = {
    slideShadows: false,
    rotate: 0,
    stretch: 0,
    depth: 0,
  }

  // Swiper가 활성화된 슬라이드의 description 업데이트
  const handleSlideChange = (swiper: SwiperClass) => {
    const activeIndex = swiper.realIndex // Swiper의 활성 슬라이드 index
    setCurrentDescription(randomMockData[activeIndex]?.description || '')
  }

  const onClickRandomQuestionWriting = () => {
    localStorage.setItem('description', currentDescription)
    // 작성 페이지로 이동하며 description 전달
    router.push(`/home/${userId}/write`)
  }

  return (
    <div className='w-full h-[58px] px-[24px] bottom-0 translate-y-[70%] absolute z-[1]'>
      <div
        className='relative flex flex-col rounded-lg overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='w-full h-[58px] border-solid border-[1px] border-[#D0E4FF] bg-[#F6F7FC] rounded-[30px] flex justify-center items-center relative'>
          <Swiper
            direction='vertical'
            modules={[EffectCoverflow, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            slidesPerView='auto'
            speed={500}
            effect='coverflow'
            coverflowEffect={coverflowEffectConfig}
            className='w-full h-[58px]'
            onSlideChange={handleSlideChange} // 슬라이드 변경 이벤트
          >
            {randomMockData.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className='flex justify-center items-center h-full'>
                    <span className='text-[#6A7382] text-base'>
                      {item.description}
                    </span>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <button
            onClick={onClickRandomQuestionWriting} // 버튼 클릭 시 페이지 이동
            className='z-10 cursor-pointer w-[40px] h-[40px] absolute right-2 rounded-full bg-[#35B6FF] flex justify-center items-center'
          >
            <Image
              src='/cross_shape.svg'
              alt='cross icon'
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
