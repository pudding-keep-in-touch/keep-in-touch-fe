import { SVGProps } from 'react'

interface HomeIconProps extends SVGProps<SVGSVGElement> {
  changeColor: string
}

export default function HomeIcon({ changeColor }: HomeIconProps) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M21.0688 8.20407L12.6218 1.48707C12.4451 1.34623 12.2258 1.26953 11.9998 1.26953C11.7738 1.26953 11.5545 1.34623 11.3778 1.48707L2.9298 8.20407C2.69436 8.39135 2.50419 8.62933 2.37347 8.90029C2.24275 9.17126 2.17484 9.46822 2.1748 9.76907V19.1871C2.1748 19.8236 2.42766 20.434 2.87775 20.8841C3.32784 21.3342 3.93828 21.5871 4.5748 21.5871H9.9998V16.8351C9.9998 16.5699 10.1052 16.3155 10.2927 16.128C10.4802 15.9404 10.7346 15.8351 10.9998 15.8351H12.9998C13.265 15.8351 13.5194 15.9404 13.7069 16.128C13.8944 16.3155 13.9998 16.5699 13.9998 16.8351V21.5871H19.4238C20.0603 21.5871 20.6708 21.3342 21.1209 20.8841C21.5709 20.434 21.8238 19.8236 21.8238 19.1871V9.77007C21.8238 9.46922 21.7559 9.17226 21.6251 8.90129C21.4944 8.63033 21.3043 8.39235 21.0688 8.20507'
        fill={changeColor}
      />
    </svg>
  )
}
