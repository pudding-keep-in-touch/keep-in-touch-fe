import { render, screen } from '@testing-library/react'
import { expect, it, describe, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import MessageFormProvider from '../context/FormProvider'
import MessageInput from '../_write/ui/messageInput'
import MessageWriteNextButton from '../_write/ui/nextButton'

vi.mock('react-dom', () => {
  return {
    ...vi.importActual('react-dom'),
    useFormStatus: () => ({
      pending: false,
      data: null,
      method: null,
      action: null,
    }),
  }
})

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  useParams: () => ({
    variety: 'thanks',
  }),
}))

vi.mock('')

describe('SellForm', () => {
  render(
    <MessageFormProvider>
      <MessageInput />
      <MessageWriteNextButton userId={0} />
    </MessageFormProvider>
  )

  it('내용이 없을 시 등록 버튼은 비활성화 상태이다', () => {
    expect(screen.getByRole('button', { name: '다음' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '다음' })).toBeDisabled()
  })

  it('내용이 1자 이상일 시 등록 버튼은 활성화 상태이다', async () => {
    await userEvent.type(screen.getByRole('textbox'), 'ABC')

    const submitButton = screen.getByRole('button', { name: '다음' })
    expect(submitButton).not.toBeDisabled()
  })

  it('내용을 다 지우면 등록 버튼은 비활성화 상태이다', async () => {
    await userEvent.clear(screen.getByRole('textbox'))
    expect(screen.getByRole('button', { name: '다음' })).toBeDisabled()
  })
})
