export const messageVarieties = ['thanks', 'honestTalk'] as const

export type MessageVariety = (typeof messageVarieties)[number]

export const getVarietyData = (variety: MessageVariety) => {
  switch (variety) {
    case 'thanks':
      return {
        src: '/thanks.png',
        text: '응원과 감사',
        preview: {
          src: '/thanksPreview.png',
          text: '응원과 감사의\n쪽지를 보내요',
        },
      }
    case 'honestTalk':
      return {
        src: '/honestTalk.png',
        text: '솔직한 대화',
        preview: {
          src: '/honestTalkPreview.png',
          text: '솔직한 대화를\n보내요',
        },
      }
  }
}

export const getVarietyNumber = (variety: MessageVariety | undefined) => {
  switch (variety) {
    case 'thanks':
      return 1

    case 'honestTalk':
      return 2
  }
}
