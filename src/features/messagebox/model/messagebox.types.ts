export type MessageBoxType = {
  title: string
  desc: string
  date: string
}

type Item = {
  id: number
  emoji: string
  name: string
}

export type DataType = {
  감사: Item[]
  사과: Item[]
  응원: Item[]
  화해: Item[]
}

export type EmojiProps = {
  category: keyof DataType
}
