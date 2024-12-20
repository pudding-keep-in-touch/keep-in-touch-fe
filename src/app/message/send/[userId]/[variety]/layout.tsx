import MessageFormProvider from '@/features/message/_send/context/FormProvider'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return <MessageFormProvider>{children}</MessageFormProvider>
}
