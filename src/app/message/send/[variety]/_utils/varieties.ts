export const varieties = ['thanks', 'honestTalk'] as const

export type MessageSendVariety = (typeof varieties)[number]

export const getVarietyData = (variety: MessageSendVariety) => {
  switch (variety) {
    case 'thanks':
      return {
        src: '/thanks.png',
        text: '응원과 감사',
      }
    case 'honestTalk':
      return {
        src: '/honestTalk.png',
        text: '솔직한 대화',
      }
  }
}
