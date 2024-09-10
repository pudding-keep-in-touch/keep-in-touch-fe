interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-[#F7F7FC] px-6'>
      {children}
    </div>
  )
}
