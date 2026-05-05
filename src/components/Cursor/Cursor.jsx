import { useState, useEffect, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  const [hovered, setHovered] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const lbl = labelRef.current
    let animFrame

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1)

      if (dot) {
        dot.style.left = `${pos.current.x}px`
        dot.style.top = `${pos.current.y}px`
      }
      if (ring) {
        ring.style.left = `${ringPos.current.x}px`
        ring.style.top = `${ringPos.current.y}px`
      }
      if (lbl) {
        lbl.style.left = `${ringPos.current.x}px`
        lbl.style.top = `${ringPos.current.y}px`
      }

      animFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      if (dot) dot.style.opacity = '1'
      if (ring) ring.style.opacity = '1'
    }

    const handleMouseOver = (e) => {
      const target = e.target

      // Determine label based on element type
      if (target.closest('a')) {
        setHovered(true)
        setLabel('OPEN')
      } else if (target.closest('button')) {
        setHovered(true)
        setLabel('CLICK')
      } else if (target.closest('[data-cursor]')) {
        setHovered(true)
        setLabel(target.closest('[data-cursor]').dataset.cursor || 'VIEW')
      } else if (target.closest('input')) {
        setHovered(true)
        setLabel('TYPE')
      } else {
        setHovered(false)
        setLabel('')
      }
    }

    const handleMouseOut = () => {
      setHovered(false)
      setLabel('')
    }

    const handleMouseDown = () => setClicking(true)
    const handleMouseUp = () => setClicking(false)
    const handleMouseLeave = () => {
      if (dot) dot.style.opacity = '0'
      if (ring) ring.style.opacity = '0'
      if (lbl) lbl.style.opacity = '0'
    }
    const handleMouseEnter = () => {
      if (dot) dot.style.opacity = '1'
      if (ring) ring.style.opacity = '1'
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className={`${styles.dot} ${clicking ? styles.clicking : ''}`}
        style={{ opacity: 0 }}
      />
      <div
        ref={ringRef}
        className={`${styles.ring} ${hovered ? styles.hovered : ''} ${clicking ? styles.clicking : ''}`}
        style={{ opacity: 0 }}
      />
      <div
        ref={labelRef}
        className={`${styles.label} ${label ? styles.visible : ''}`}
      >
        {label}
      </div>
    </>
  )
}