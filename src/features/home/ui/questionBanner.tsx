import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay } from 'swiper/modules'

// swiper/css
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

type QuestionBannerType = {
  id: number
  description: string
}

interface QuestionBannerProps {
  randomMockData: QuestionBannerType[]
}

export const QuestionBanner = ({ randomMockData }: QuestionBannerProps) => {
  const coverflowEffectConfig = {
    slideShadows: false,
    rotate: 0,
    stretch: 0,
    depth: 0,
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
          >
            {randomMockData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className='flex justify-center items-center h-full'>
                  <span className='text-[#6A7382] text-base'>
                    {item.description}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className='w-[40px] h-[40px] absolute right-2 rounded-full bg-[#35B6FF] flex justify-center items-center'>
            <img src='/cross_shape.svg' alt='cross icon' />
          </button>
        </div>
      </div>
    </div>
  )
}
