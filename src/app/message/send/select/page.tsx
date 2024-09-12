import Image from 'next/image'
import MessageSendStep from '../_components/step'
import MessageSendSelect from './_components/select'
import MessageSendNextButton from './_components/nextButton'

export default function Page() {
  return (
    <>
      <div className='mt-[30px] mb-5'>
        <MessageSendStep active={1} />
      </div>

      <p className='font-semibold text-lg mb-10'>쪽지 타입을 선택해 주세요!</p>

      <MessageSendSelect />

      <MessageSendNextButton />
    </>
  )
}
