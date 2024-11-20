export const Nav = () => {
  return (
    <div className='w-full h-[84px] bg-gray-1 shadow-md bottom-0 flex justify-between items-center px-[120px] absolute z-10'>
      <button className='flex flex-col items-center text-gray-500 gap-1'>
        <img src='/nav_home.svg' className='w-6 h-6' alt='Home' />
        <span className='text-[11px] font-semibold text-[#6B7684]'>홈</span>
      </button>
      <button className='flex flex-col items-center text-blue-500 gap-1'>
        <img src='/nav_message.svg' className='w-6 h-6' alt='Messages' />
        <span className='text-[11px] font-semibold text-[#6B7684]'>쪽지함</span>
      </button>
    </div>
  )
}
