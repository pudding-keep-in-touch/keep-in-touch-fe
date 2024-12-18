import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const varieties = ['응원과 감사', '솔직한 대화'] as const

export type EmotionVariety = (typeof varieties)[number]

export const getEmotionVarietyData = (variety: EmotionVariety | undefined) => {
  switch (variety) {
    case '응원과 감사':
      return {
        src: '/thanks.png',
        text: '응원과 감사',
        preview: {
          src: '/supportEmotion.png',
          text: '응원과 감사의\n쪽지를 보내요',
        },
      }
    case '솔직한 대화':
      return {
        src: '/honestTalkEmotion.svg',
        text: '솔직한 대화',
        preview: {
          src: '/honestEmotion.svg',
          text: '솔직한 대화를\n보내요',
        },
      }
  }
}
