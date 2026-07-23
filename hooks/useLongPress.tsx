'use client'

import { useCallback, useRef, useState } from 'react'

type LongPressOptions = {
  onLongPress: () => void
  onClick?: () => void
  threshold?: number
  enabled?: boolean
}

export function useLongPress ({
  onLongPress,
  onClick,
  threshold = 500,
  enabled = true
}: LongPressOptions) {
  const [isLongPress, setIsLongPress] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isLongPressRef = useRef(false)

  const start = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!enabled) return
      isLongPressRef.current = false
      timerRef.current = setTimeout(() => {
        isLongPressRef.current = true
        setIsLongPress(true)
        // prevent default to avoid context menu on mobile
        e.preventDefault?.()
        onLongPress()
      }, threshold)
    },
    [onLongPress, threshold, enabled]
  )

  const stop = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
      if (isLongPressRef.current) {
        // long press happened, prevent click
        e.preventDefault?.()
      } else if (onClick && !isLongPressRef.current) {
        onClick()
      }
      setIsLongPress(false)
    },
    [onClick]
  )

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setIsLongPress(false)
  }, [])

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: stop,
    onTouchMove: clear,
    isLongPress
  }
}