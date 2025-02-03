import React from 'react'

interface ReactionHeaderProps {
  emojiType: string
}

const EmojiHeader: React.FC<ReactionHeaderProps> = React.memo(
  ({ emojiType }) => {
    return (
      <h2 className='text-base font-semibold tracking-[-0.75px]'>
        {emojiType}
      </h2>
    )
  }
)

EmojiHeader.displayName = 'EmojiHeader'

export default EmojiHeader
