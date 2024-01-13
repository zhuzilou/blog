import { useEffect, useRef } from 'react'

export const useOnWindowScroll = (callback: () => any) => {
  'use client'

  const listener = useRef(callback)

  useEffect(() => {
    if (listener.current) window.removeEventListener('scroll', listener.current)
    listener.current = callback
    window.addEventListener('scroll', callback)
    return () => {
      window.removeEventListener('scroll', listener.current)
    }
  }, [callback])
}
