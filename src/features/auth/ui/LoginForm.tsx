'use client'

import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'
import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email)
    console.log('submit')
  }

  // @TODO: zod 및 Shadcn form 적용
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 items-center mt-10'
    >
      <Input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <Input type='password' placeholder='Password' />
      <Button type='submit'>Login</Button>
    </form>
  )
}
