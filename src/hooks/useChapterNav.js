import { useState, useEffect, useCallback, useRef } from 'react'

const TOTAL_CHAPTERS = 5
const DEBOUNCE_MS = 800
const WORK_CHAPTER_INDEX = 2 // Chapter 03 (0-indexed)

export function useChapterNav() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const locked = useRef(false)
  const chapterScrollRef = useRef(null) // ref to the current chapter's scrollable div

  const go = useCallback((index) => {
    if (index < 0 || index >= TOTAL_CHAPTERS) return
    if (locked.current) return

    locked.current = true
    setDirection(index > current ? 1 : -1)
    setCurrent(index)

    setTimeout(() => { locked.current = false }, DEBOUNCE_MS)
  }, [current])

  const goNext = useCallback(() => go(current + 1), [go, current])
  const goPrev = useCallback(() => go(current - 1), [go, current])

  const boundaryTimeRef = useRef({ top: 0, bottom: 0 })

  // Check if current chapter's internal scroll should intercept
  const isScrollIntercepting = useCallback((deltaY) => {
    const el = chapterScrollRef.current
    if (!el) return false

    // If element can't scroll at all, don't intercept
    if (el.scrollHeight <= el.clientHeight + 2) return false

    const atTop = el.scrollTop <= 0
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
    const now = Date.now()

    if (deltaY < 0 && atTop) {
      if (boundaryTimeRef.current.top === 0) {
        boundaryTimeRef.current.top = now
        return true // Intercept first scroll at top
      }
      if (now - boundaryTimeRef.current.top > 300) {
        return false // Allow nav after 300ms of scrolling at top
      }
      return true // Still blocking
    } else {
      boundaryTimeRef.current.top = 0
    }

    if (deltaY > 0 && atBottom) {
      if (boundaryTimeRef.current.bottom === 0) {
        boundaryTimeRef.current.bottom = now
        return true // Intercept first scroll at bottom
      }
      if (now - boundaryTimeRef.current.bottom > 300) {
        return false // Allow nav after 300ms of scrolling at bottom
      }
      return true // Still blocking
    } else {
      boundaryTimeRef.current.bottom = 0
    }

    return true // in the middle → block chapter nav, let it scroll internally
  }, [])

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrollIntercepting(e.deltaY)) return
      e.preventDefault()
      if (e.deltaY > 0) goNext()
      else goPrev()
    }

    const handleKeyDown = (e) => {
      if (['ArrowRight', 'ArrowDown', 'd', 's'].includes(e.key)) {
        // If chapter can scroll, let the native scroll handle it
        if (chapterScrollRef.current) {
          const el = chapterScrollRef.current
          if (el.scrollHeight > el.clientHeight + 2) {
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2
            if (!atBottom) return
          }
        }
        e.preventDefault()
        goNext()
      }
      if (['ArrowLeft', 'ArrowUp', 'a', 'w'].includes(e.key)) {
        if (chapterScrollRef.current) {
          const el = chapterScrollRef.current
          if (el.scrollHeight > el.clientHeight + 2) {
            const atTop = el.scrollTop <= 0
            if (!atTop) return
          }
        }
        e.preventDefault()
        goPrev()
      }
    }

    // Touch support
    let touchStartX = 0
    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
    }
    const handleTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX
      const dy = e.changedTouches[0].clientY - touchStartY
      // Only trigger if horizontal swipe is more dominant
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) goNext()
        else goPrev()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goNext, goPrev, isScrollIntercepting, current])

  return { current, direction, goNext, goPrev, go, chapterScrollRef }
}
