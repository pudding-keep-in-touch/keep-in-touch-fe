'use client'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { MessageType } from '@/shared/types/common.types'

interface navProps {
  userId: string
  messageId?: string
  type?: MessageType
}

export const useBackHandler = ({ userId, type, messageId }: navProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const backHandler = () => {
    const storage = globalThis?.sessionStorage
    if (!storage) return

    const pathStack = JSON.parse(storage.getItem('pathStack') || '[]')
    const pathParts = pathname.split('/')
    const lastSegment = pathParts[pathParts.length - 1]

    if (pathname === `/messagebox/${userId}`) {
      storage.removeItem('pathStack')
      router.replace(`/home/${userId}`)
      return
    }
    if (pathname === `/messagebox/${userId}/${type}/${messageId}`) {
      router.replace(pathStack[pathStack.length - 1])
      storage.setItem('pathStack', JSON.stringify(pathStack))
      pathStack.pop()
      return
    }
    if (lastSegment === 'reaction') {
      const messagePagePath = pathParts.slice(0, -1).join('/')
      router.replace(messagePagePath)
      pathStack.pop()
      return
    }

    if (pathParts.length > 4 && lastSegment !== 'reaction') {
      router.replace(pathStack[pathStack.length - 1])
      pathStack.pop()
      return
    }

    if (pathStack.length > 1) {
      pathStack.pop()
      storage.setItem('pathStack', JSON.stringify(pathStack))
      router.replace(pathStack[pathStack.length - 1])
    } else {
      router.back()
    }
  }

  useEffect(() => {
    const storage = globalThis?.sessionStorage
    if (!storage) return

    let pathStack = JSON.parse(storage.getItem('pathStack') || '[]')
    const pathParts = pathname.split('/')

    if (pathParts.length > 4) return

    if (pathname === `/messagebox/${userId}`) {
      storage.removeItem('pathStack')
      pathStack = [pathname]
    } else if (pathStack[pathStack.length - 1] !== pathname) {
      if (pathParts.length >= 3) {
        if (!pathStack.includes(pathname)) {
          pathStack.push(pathname)
        }
      }
    }

    storage.setItem('pathStack', JSON.stringify(pathStack))
  }, [pathname, userId])

  return backHandler
}
