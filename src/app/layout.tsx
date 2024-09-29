import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import QueryProvider from '@/shared/provider'

const GA_ID =
  process.env.NODE_ENV === 'production' ? 'G-6ZWWSPLVD7' : 'G-49Q9HYM5E0'

export const metadata: Metadata = {
  title: 'Keep In Touch',
  description: '너에게 닿기를, Keep In Touch',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='scrollbar-hide'>
      <head>
        <link rel='icon' href='/icon.ico' sizes='any' />
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script
          strategy='afterInteractive'
          id='google-analytics'
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_ID}');
          `,
          }}
        />

        <Script
          strategy='afterInteractive'
          src='./channeltalk/channeltalk.js'
        />

      </head>

      <body className='max-w-[32rem] w-full min-h-screen mr-auto ml-auto'>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
