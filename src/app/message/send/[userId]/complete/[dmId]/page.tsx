import Image from 'next/image'
import MoveButton from './_components/moveButton'

export default function Page({
  params: { dmId },
}: {
  params: { dmId: string }
}) {
  return (
    <>
      <div className='mt-auto'>
        <div className='flex justify-center items-center flex-col gap-5'>
          <Image src='/Radio.svg' alt='radio' width={45} height={45} />
          <p className='font-medium text-xl text-center'>
            친구에게 쪽지 보내기를
            <br />
            완료하였습니다!
          </p>
        </div>
      </div>

      <div className='mt-auto w-full flex justify-center items-center flex-col gap-5'>
        <MoveButton dmId={dmId} />
      </div>
    </>
  )
}
