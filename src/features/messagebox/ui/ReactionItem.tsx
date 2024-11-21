import { EmojiProps } from '@/features/messagebox/model/messagebox.types'

const emotion = {
  감사: [
    {
      id: 1,
      emoji: '🙂',
      name: '고마워',
    },
    {
      id: 2,
      emoji: '🥰',
      name: '덕분이야',
    },
    {
      id: 3,
      emoji: '😘',
      name: '최고야',
    },
    {
      id: 4,
      emoji: '🥺',
      name: '감동이야',
    },
    {
      id: 5,
      emoji: '😉',
      name: '너밖에 없어',
    },
  ],
  사과: [
    {
      id: 1,
      emoji: '🙂',
      name: '내가 더 잘할게',
    },
    {
      id: 2,
      emoji: '🥰',
      name: '미안해',
    },
    {
      id: 3,
      emoji: '😘',
      name: '만나서 얘기하자',
    },
    {
      id: 4,
      emoji: '🥺',
      name: '반성할게',
    },
    {
      id: 5,
      emoji: '😉',
      name: '다시는 그러지 않을게',
    },
  ],
  응원: [
    {
      id: 1,
      emoji: '🙂',
      name: '화이팅',
    },
    {
      id: 2,
      emoji: '🥰',
      name: '멋있어',
    },
    {
      id: 3,
      emoji: '😘',
      name: '고생 많았어',
    },
    {
      id: 4,
      emoji: '🥺',
      name: '응원할게',
    },
    {
      id: 5,
      emoji: '😉',
      name: '행운을 빌어',
    },
  ],
  화해: [
    {
      id: 1,
      emoji: '🙂',
      name: '화해하자',
    },
    {
      id: 2,
      emoji: '🥰',
      name: '다음에는 그러지 마',
    },
    {
      id: 3,
      emoji: '😘',
      name: '만나서 얘기하자',
    },
    {
      id: 4,
      emoji: '🥺',
      name: '나한테 잘해',
    },
    {
      id: 5,
      emoji: '😉',
      name: '한번만 봐줄게',
    },
  ],
}

const ReactionItem: React.FC<EmojiProps> = ({ category }) => {
  const items = emotion[category] || []
  return (
    <>
      <div className='w-full flex flex-col py-[20px] h-full'>
        <div className='w-full pb-[20px] flex items-center gap-[10px]'>
          <h2 className='text-[#1F1F1F] font-semibold leading-none'>
            {category}
          </h2>
        </div>
        <div className='w-full flex flex-wrap gap-[8px]'>
          {items.map((e) => (
            <div key={e.id} className='flex-none'>
              <div className='w-full p-[12px] h-[35px] bg-white rounded-[60px] flex items-center cursor-pointer border-[0.5px] hover:bg-[#35B6FF] hover:bg-opacity-40 hover:border-[#35B6FF]  border-[#C5C5C5] gap-[4px]'>
                <div>{e.emoji}</div>
                <div className='w-full flex text-[15px] font-semibold leading-[68.1%] tracking-[-2%]'>
                  {e.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='border-b-[6px] border-b-[#F6F7FC] w-screen'></div>
    </>
  )
}

export default ReactionItem
