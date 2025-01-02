import React from 'react'
import EmojiHeader from '@/features/messagebox/ui/components/EmojiHeader'
import EmojiList from '@/features/messagebox/ui/components/EmojiList'
import { EmojiProps } from '@/features/messagebox/_detail/model/messagebox.types'

interface EmojiSectionProps {
  grouped: Record<string, EmojiProps[]>
  emojiType: string
  selected: string[]
  onItemClick: (templateId: string) => void
}

const EmojiSection: React.FC<EmojiSectionProps> = React.memo(
  ({ grouped, emojiType, selected, onItemClick }) => {
    return (
      <div className='w-full flex flex-col py-[20px] border-b-[6px] border-b-gray-1'>
        <div className='px-6'>
          <EmojiHeader emojiType={emojiType} />
          <EmojiList
            items={grouped[emojiType]}
            selected={selected}
            onItemClick={onItemClick}
          />
        </div>
      </div>
    )
  }
)

EmojiSection.displayName = 'EmojiSection'
export default EmojiSection
