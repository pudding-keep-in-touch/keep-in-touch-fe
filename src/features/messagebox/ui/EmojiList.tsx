import React from 'react'
import EmojiItem from '@/features/messagebox/ui/EmojiItem'
import { EmojiProps } from '@/features/messagebox/model/messagebox.types'

interface EmojiListProps {
  items: EmojiProps[]
  selected: string[]
  onItemClick: (templateId: string) => void
}

const EmojiList: React.FC<EmojiListProps> = React.memo(
  ({ items, selected, onItemClick }) => {
    return (
      <div className='flex w-full flex-wrap gap-2 pt-[20px]'>
        {items.map((item) => (
          <EmojiItem
            key={item.templateId}
            item={item}
            isSelected={selected.includes(item.templateId)}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    )
  }
)
EmojiList.displayName = 'EmojiList'

export default EmojiList
