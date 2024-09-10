import { Button } from '@/shared/ui/components/Button'

interface Props {
  text: string
  disabled?: boolean
}

export default function MessageSendFloatingButton({ text, disabled }: Props) {
  return (
    <div className='fixed bottom-9 left-0 w-full px-8'>
      <Button
        type='button'
        className='w-full h-fit py-4 bg-[#35B6FF] text-white rounded-2xl font-bold'
        disabled={disabled}
      >
        {text}
      </Button>
    </div>
  )
}
