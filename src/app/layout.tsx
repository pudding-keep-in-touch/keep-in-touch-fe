import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='max-w-[32rem] w-full min-h-screen mr-auto ml-auto'>
        {children}
      </body>
    </html>
  )
}
