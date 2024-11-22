'use client'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

export const NavigationBar = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className='fixed bottom-0 w-full max-w-[32rem] bg-[#F7F7FC] mr-auto ml-auto'>
      <div className='w-full h-[50px] flex items-center z-50 pt-[10px]'>
        <div className='flex justify-center w-full gap-[97px]'>
          <button onClick={() => router.push('/')}>
            {pathname === '/' ? (
              <div className='flex flex-col items-center gap-[3px]'>
                <Image
                  src='/navbar_home_after.svg'
                  alt='home_icon'
                  width={24}
                  height={24}
                  style={{ width: 24, height: 24 }}
                />
                <div className='flex justify-center font-semibold text-[13px] leading-none text-[#1f1f1f] '>
                  홈
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center gap-[3px]'>
                <Image
                  src='/navbar_home_before.svg'
                  alt='home_icon'
                  width={24}
                  height={24}
                  style={{ width: 24, height: 24 }}
                />
                <div className='flex justify-center font-semibold text-[13px] leading-none text-[#6b7684]'>
                  홈
                </div>
              </div>
            )}
          </button>

          <button onClick={() => router.push('/messagebox')}>
            {pathname.startsWith('/messagebox') ? (
              <div className='flex flex-col items-center gap-[4px]'>
                <Image
                  src='/navbar_msgbox_after.svg'
                  alt='messagebox_icon'
                  width={18}
                  height={23}
                  style={{ width: 18, height: 23 }}
                />
                <div className='font-semibold text-[13px] leading-none text-[#1f1f1f]'>
                  쪽지함
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center gap-[4px]'>
                <Image
                  src='/navbar_msgbox_before.svg'
                  alt='messagebox_icon'
                  width={18}
                  height={23}
                  style={{ width: 18, height: 23 }}
                />
                <div className='font-semibold text-[13px] leading-none text-[#6b7684]'>
                  쪽지함
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
