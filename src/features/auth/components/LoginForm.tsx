'use client'

import { useState } from 'react'

export default function LoginForm() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(email)
    console.log('submit')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input type='email' onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password
        <input type='password' />
      </label>
      <button type='submit'>Login</button>
    </form>
  )
}
