import React from 'react'
import { EmojiProps } from '@/features/messagebox/model/messagebox.types'

interface EmojiItemProps {
  item: EmojiProps
  isSelected: boolean
  onItemClick: (templateId: string) => void
}

const EmojiItem: React.FC<EmojiItemProps> = React.memo(
  ({ item, isSelected, onItemClick }) => {
    return (
      <div onClick={() => onItemClick(item.templateId)}>
        <div className='w-full flex h-full'>
          <div className='flex-none'>
            <div
              className={`${isSelected ? 'selected-emoji' : 'bg-white border-[#C5C5C5]'} 
                    w-full p-[12px] h-[35px] text-[21px] rounded-[60px] flex items-center cursor-pointer 
                    border-[0.5px] hover:bg-[#35B6FF] hover:bg-opacity-40 hover:border-[#35B6FF] gap-[4px]`}
            >
              {item.emoji}
              <div className='w-full flex text-[15px] font-semibold leading-[68.1%] tracking-[-2%]'>
                {item.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
EmojiItem.displayName = 'EmojiItem'
export default EmojiItem
