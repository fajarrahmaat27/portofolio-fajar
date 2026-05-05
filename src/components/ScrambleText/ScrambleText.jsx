import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'
import useScramble from '../../hooks/useScramble'

export default function ScrambleText({
  text,
  className,
  as = 'span',
  delay = 0,
  speed = 30,
  once = true
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px' })
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (isInView && !triggered) {
      const timer = setTimeout(() => setTriggered(true), delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  const scrambled = useScramble(text, triggered, speed)
  const Tag = as

  return (
    <Tag ref={ref} className={className}>
      {scrambled}
    </Tag>
  )
}