import MessageSendStep from '../../_components/step'
import MessageInput from './_components/messageInput'
import MessageWriteNextButton from './_components/nextButton'

export default function Page() {
  return (
    <>
      <div className='mt-[30px] mb-5'>
        <MessageSendStep active={2} />
      </div>

      <p className='font-medium text-lg mb-10'>내용을 작성하세요.</p>

      <MessageInput />

      <MessageWriteNextButton />
    </>
  )
}
