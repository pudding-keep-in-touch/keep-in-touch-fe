import React from 'react'

interface ReactionHeaderProps {
  type: string
}

const EmojiHeader: React.FC<ReactionHeaderProps> = React.memo(({ type }) => {
  return <h2 className='text-base font-semibold tracking-[-0.75px]'>{type}</h2>
})

EmojiHeader.displayName = 'EmojiHeader'

export default EmojiHeader
