import React from 'react'
import EmojiHeader from '@/features/messagebox/ui/EmojiHeader'
import EmojiList from '@/features/messagebox/ui/EmojiList'
import { MessageType } from '@/shared/types/common.types'
import { EmojiProps } from '@/features/messagebox/model/messagebox.types'

interface EmojiSectionProps {
  messageType: MessageType
  grouped: Record<string, EmojiProps[]>
  type: string
  selected: string[]
  onItemClick: (templateId: string) => void
}

const EmojiSection: React.FC<EmojiSectionProps> = React.memo(
  ({ messageType, grouped, type, selected, onItemClick }) => {
    return (
      <div className='w-full flex flex-col py-[20px] border-b-[6px] border-b-gray-1'>
        <div className='px-6'>
          <EmojiHeader type={type} />
          <EmojiList
            items={grouped[type]}
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
