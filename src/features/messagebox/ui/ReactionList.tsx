import { EmojiProps } from '@/features/messagebox/model/messagebox.types'

const ReactionList = ({ data }: { data: EmojiProps }) => {
  return (
    <div className='w-full flex h-full'>
      <div className='flex-none'>
        <div className='w-full p-[12px] h-[35px] text-[21px] bg-white rounded-[60px] flex items-center cursor-pointer border-[0.5px] hover:bg-[#35B6FF] hover:bg-opacity-40 hover:border-[#35B6FF]  border-[#C5C5C5] gap-[4px]'>
          {data.emoji}
          <div className='w-full flex text-[15px] font-semibold leading-[68.1%] tracking-[-2%]'>
            {data.content}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReactionList
