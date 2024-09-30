import MessageFormProvider from './_components/form'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return <MessageFormProvider>{children}</MessageFormProvider>
}
