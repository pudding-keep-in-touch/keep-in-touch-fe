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
        <meta property='og:title' content='Keep In Touch' />
        <meta
          property='og:description'
          content='너에게 닿기를, Keep In Touch by puddingcamp'
        />
        <meta
          property='og:image'
          content='https://file.notion.so/f/f/c8c68fae-7ecf-4c58-abfe-1fe57c336005/12d41153-93c9-4689-a31c-499b403e8455/3be10b58-6a4e-4d16-b370-6d46191457a6.png?table=block&amp;id=611e13a0-bb89-4ecf-8a40-8ffbb110fc21&amp;spaceId=c8c68fae-7ecf-4c58-abfe-1fe57c336005&amp;expirationTimestamp=1727625600000&amp;signature=F2yvlWCE70AEsKedCLWJncmJlM_mvqsNGuvT_o292UA&amp;downloadName=2024-09-20_14.10.03.png'
        />
        <meta property='og:url' content='https://keep-in-touch.me/' />
        <meta property='og:type' content='website' />
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
