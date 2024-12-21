// 스피너 컴포넌트
export const Spinner: React.FC = () => {
  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
    </div>
  )
}
