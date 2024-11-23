interface MessageBoardProps {
  receiverNickname: string
  content: string
}

const MessageBoard: React.FC<MessageBoardProps> = ({
  receiverNickname,
  content,
}) => {
  return (
    <div className='backdrop-blur-md bg-white/50 w-full h-full min-h-[380px] rounded-2xl px-6 py-5'>
      <p className='text-gray-4 font-semibold text-lg mb-4'>{`To. ${receiverNickname}`}</p>
      <p className='text-[#191F28] break-all whitespace-pre-wrap text-base leading-[150%] tracking-[-2%]'>
        {content}
      </p>
    </div>
  )
}

export default MessageBoard
