// 스피너 컴포넌트
export const Spinner: React.FC = () => {
  return (
    <div className='absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center w-full h-full z-200'>
      <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}
