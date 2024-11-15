import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import QueryProvider from '@/shared/provider'

const GA_ID =
  process.env.NODE_ENV === 'production' ? 'G-6ZWWSPLVD7' : 'G-49Q9HYM5E0'

export const metadata: Metadata = {
  title: 'Keep In Touch',
  description: '너에게 닿기를, Keep In Touch',

  openGraph: {
    images: ['https://dev-fe.keep-in-touch.me/meta_image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='scrollbar-hide'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
        <meta property='og:title' content='Keep In Touch' />
        <meta
          property='og:description'
          content='너에게 닿기를, Keep In Touch by puddingcamp'
        />
        <meta
          property='og:image'
          content='https://dev-fe.keep-in-touch.me/meta_image.png'
        />
        <meta property='og:url' content='https://keep-in-touch.me/' />
        <meta property='og:type' content='website' />

        <meta
          name='naver-site-verification'
          content='b672b0f18f18d6fe9a5f9913d06e6a548f17c901'
        />

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

        <Script
          type='text/javascript'
          id='inapp-browser-script'
          strategy='afterInteractive'
        >
          {`
          var inappdeny_exec_vanillajs = (callback) => {
              if(document.readyState != 'loading'){
                callback();
              }else{
                document.addEventListener('DOMContentLoaded', callback);
              } 
            }
              inappdeny_exec_vanillajs(() => { 
              function copytoclipboard(val){
                var t = document.createElement("textarea");
                document.body.appendChild(t);
                t.value = val;
                t.select();
                document.execCommand('copy');
                document.body.removeChild(t);
              };
              function inappbrowserout(){
                copytoclipboard(window.location.href);
                alert('URL주소가 복사되었습니다.\\n\\nSafari가 열리면 주소창을 길게 터치한 뒤, "붙여놓기 및 이동"를 누르면 정상적으로 이용하실 수 있습니다.');
                location.href='x-web-search://?';
              };

              var useragt = navigator.userAgent.toLowerCase();
              var target_url = location.href;
              
              if(useragt.match(/kakaotalk/i)){
              
                location.href = 'kakaotalk://web/openExternal?url='+encodeURIComponent(target_url);
              }else if(useragt.match(/line/i)){
              
                if(target_url.indexOf('?') !== -1){
                  location.href = target_url+'&openExternalBrowser=1';
                }else{
                  location.href = target_url+'?openExternalBrowser=1';
                }
              }else if(useragt.match(/inapp|naver|snapchat|wirtschaftswoche|thunderbird|instagram|everytimeapp|whatsApp|electron|wadiz|aliapp|zumapp|iphone(.*)whale|android(.*)whale|kakaostory|band|twitter|DaumApps|DaumDevice\\/mobile|FB_IAB|FB4A|FBAN|FBIOS|FBSS|SamsungBrowser\\/[^1]/i)){
                
                if(useragt.match(/iphone|ipad|ipod/i)){
                 
                  var mobile = document.createElement('meta');
                  mobile.name = 'viewport';
                  mobile.content = "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui";
                  document.getElementsByTagName('head')[0].appendChild(mobile);
                  
                  var fonts = document.createElement('link');
                  fonts.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap';
                  document.getElementsByTagName('head')[0].appendChild(fonts);
                  document.body.innerHTML = "<style>body{margin:0;padding:0;font-family: 'Noto Sans KR', sans-serif;overflow: hidden;height: 100%;}</style><h2 style='padding-top:50px; text-align:center;font-family: \\"Noto Sans KR\\", sans-serif;'>인앱브라우저 호환문제로 인해<br />Safari로 접속해야합니다.</h2><article style='text-align:center; font-size:17px; word-break:keep-all;color:#999;'>아래 버튼을 눌러 Safari를 실행해주세요<br />Safari가 열리면, 주소창을 길게 터치한 뒤,<br />'붙여놓기 및 이동'을 누르면<br />정상적으로 이용할 수 있습니다.<br /><br /><button onclick='inappbrowserout();' style='min-width:180px;margin-top:10px;height:54px;font-weight: 700;background-color:#31408E;color:#fff;border-radius: 4px;font-size:17px;border:0;'>Safari로 열기</button></article><img style='width:70%;margin:50px 15% 0 15%' src='https://tistory3.daumcdn.net/tistory/1893869/skin/images/inappbrowserout.jpeg' />";
                }else{
                 
                  location.href='intent://'+target_url.replace(/https?:\\/\\//i,'')+'#Intent;scheme=http;package=com.android.chrome;end';
                }
              }
            });
        `}
        </Script>
      </head>

      <body className='max-w-[32rem] w-full min-h-screen mr-auto ml-auto'>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
