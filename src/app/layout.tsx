import type { Metadata } from 'next'
import Script from 'next/script'
import '@/shared/styles/globals.css'
import { DefaultLayout } from '@/shared/ui/layouts/DefaultLayout'

// const GA_ID =
//   process.env.NODE_ENV === 'production' ? 'G-6ZWWSPLVD7' : 'G-49Q9HYM5E0'

export const metadata: Metadata = {
  title: '너에게 닿기를',
  description:
    '솔직한 마음을 주고 받는 익명 질문 답변 메신저 · 친구의 질문에 퐁~ 솔직한 마음을 전해보세요·나도 질문을 만들어 링크를 공유해봐요!',

  openGraph: {
    title: '너에게 닿기를',
    description:
      '솔직한 마음을 주고 받는 익명 질문 답변 메신저 · 친구의 질문에 퐁~ 솔직한 마음을 전해보세요·나도 질문을 만들어 링크를 공유해봐요!',
    // TODO : 운영 배포 url로 수정해야함
    url: 'https://dev-fe.keep-in-touch.me/',
    images: ['https://dev-fe.keep-in-touch.me/meta_image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='scrollbar-hide overflow-hidden'>
      <head>
        <meta property='og:title' content='너에게 닿기를' />
        <meta
          name='description'
          content='솔직한 마음을 주고 받는 익명 질문 답변 메신저 · 친구의 질문에 퐁~ 솔직한 마음을 전해보세요·나도 질문을 만들어 링크를 공유해봐요!'
        />
        <meta
          name='keywords'
          content='너에게 닿기를, 익명 메시지, 응원과 감사, 솔직한 대화, 롤링페이퍼, '
        />

        <meta name='author' content='Keep-in-Touch Team' />

        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        />

        <meta
          name='google-site-verification'
          content='your-google-verification-code-here'
        />

        <meta property='og:type' content='website' />
        <meta
          property='og:title'
          content='너에게 닿기를, 익명으로 마음을 전해요'
        />
        <meta
          property='og:description'
          content='친구가 보낸 질문을 확인하고 지금 바로 퐁!'
        />
        <meta property='og:url' content='https://dev-fe.keep-in-touch.me' />
        <meta
          property='og:image'
          content='https://dev-fe.keep-in-touch.me/meta_image.png'
        />

        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='너에게 닿기를, 익명으로 마음을 전해요'
        />
        <meta
          name='twitter:description'
          content='친구가 보낸 질문을 확인하고 지금 바로 퐁!'
        />
        <meta
          name='twitter:image'
          content='https://dev-fe.keep-in-touch.me/meta_image.png'
        />

        <link
          rel='icon'
          href='https://dev-fe.keep-in-touch.me/icon.ico'
          sizes='any'
        />

        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#3b5998' />

        {/* Google Tag Manager Script */}
        <Script
          strategy='afterInteractive'
          id='gtm-script'
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[]; 
                w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:''; 
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M8RGX9S2');
            `,
          }}
        />

        {/* Google Analytics Script */}
        <Script
          strategy='afterInteractive'
          src='https://www.googletagmanager.com/gtag/js?id=G-PSF8HRVTJH'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PSF8HRVTJH');
        `}
        </Script>

        {/* In-App Browser Script */}
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

        {/* Clarity SDK Script */}
        <Script
          strategy='afterInteractive'
          id='clarity-sdk'
          dangerouslySetInnerHTML={{
            __html: `
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "owsm83hxaf");
    `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager noscript */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-M8RGX9S2'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  )
}
