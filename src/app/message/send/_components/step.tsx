import { cn } from '@/shared/lib/utils'

const steps = [1, 2, 3] as const

interface Props {
  active: (typeof steps)[number]
}

export default function MessageSendStep({ active }: Props) {
  return (
    <div className='flex items-center'>
      {steps.map((step) => (
        <>
          <div
            key={step}
            className={cn(
              'w-[30px] h-[30px] rounded-full border border-black flex items-center justify-center bg-[#4DDF22]',
              active !== step && 'opacity-30'
            )}
          >
            <span className='font-medium text-lg'>{step}</span>
          </div>
          <div className='w-2 h-px bg-[#4DDF22] last:hidden' />
        </>
      ))}
    </div>
  )
}
