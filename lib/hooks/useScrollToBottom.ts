import { useCallback, useRef, useEffect } from 'react'

export function useScrollToBottom() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const scrollToBottomImmediate = useCallback(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'auto' })
  }, [])

  return {
    scrollRef,
    scrollToBottom,
    scrollToBottomImmediate
  }
} 