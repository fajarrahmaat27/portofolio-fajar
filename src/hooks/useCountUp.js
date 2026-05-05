import { useState, useEffect } from 'react'

export default function useCountUp(target, isInView, duration = 1500) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    const numericTarget = parseInt(target)

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease out cubic
      setCount(Math.floor(eased * numericTarget))

      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [isInView])

  return count
}