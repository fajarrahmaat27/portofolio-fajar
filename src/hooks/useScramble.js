import { useState, useEffect, useRef } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#▓▒░│┼╫╪►◄∞§¶'

export default function useScramble(text, isInView, speed = 30) {
  const [output, setOutput] = useState(text)
  const intervalRef = useRef(null)
  const iterationRef = useRef(0)

  useEffect(() => {
    if (!isInView) return

    iterationRef.current = 0
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setOutput(
        text
          .split('')
          .map((char, i) => {
            // spaces stay as spaces
            if (char === ' ') return ' '

            // already resolved characters
            if (i < iterationRef.current) return char

            // random scramble character
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      iterationRef.current += 0.5

      if (iterationRef.current >= text.length) {
        clearInterval(intervalRef.current)
        setOutput(text)
      }
    }, speed)

    return () => clearInterval(intervalRef.current)
  }, [isInView, text])

  return output
}