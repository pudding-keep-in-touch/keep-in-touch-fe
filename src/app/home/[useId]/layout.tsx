interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-white border-l border-r border-[#D0E4FF] box-border'>
      {children}
    </div>
  )
}
