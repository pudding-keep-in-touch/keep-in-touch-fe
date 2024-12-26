/**
 * 숫자를 지정된 자릿수로 0으로 채워진 문자열로 반환합니다.
 */
export function fillZero(value: number, size = 2) {
  return String(value).padStart(size, '0')
}

/**
 * 주어진 날짜와 일자를 "YYYY-MM-DD" 형식으로 반환합니다.
 */
export function formatDate(currentDate: Date, day?: number) {
  return [
    currentDate.getFullYear(),
    fillZero(currentDate.getMonth() + 1),
    fillZero(day ?? currentDate.getDate()),
  ].join('-')
}

/**
 * 주어진 날짜와 일자를 "YYYY.MM.DD. 오전(혹은 오후)HH:MM" 형식으로 반환합니다.
 */
const dateFormat = (e: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }

  const formatter = new Intl.DateTimeFormat('ko-KR', options)
  const formattedString = formatter.format(e).replaceAll(' ', '')

  return formattedString.slice(0, 11) + ' ' + formattedString.slice(11)
}
export const formattedDate = (createdAt: Date) => {
  const date = new Date(createdAt)
  return dateFormat(date)
}
