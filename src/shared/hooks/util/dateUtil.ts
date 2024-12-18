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
