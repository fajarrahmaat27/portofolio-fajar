import { useEffect, useRef } from 'react'

export default function OrbitingDots({
  size = 80,
  dotSize = 4,
  speed = 1
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = size
    canvas.height = size

    const cx = size / 2
    const cy = size / 2
    const radius = size / 2 - dotSize * 2

    let animFrame
    let angle = 0

    const dots = [
      { offset: 0,                    opacity: 1,    r: dotSize },
      { offset: (2 * Math.PI) / 3,   opacity: 0.5,  r: dotSize * 0.7 },
      { offset: (4 * Math.PI) / 3,   opacity: 0.2,  r: dotSize * 0.5 },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, size, size)

      // Orbit ring
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(232, 255, 71, 0.1)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Dots
      dots.forEach(dot => {
        const x = cx + radius * Math.cos(angle + dot.offset)
        const y = cy + radius * Math.sin(angle + dot.offset)

        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, dot.r * 3)
        gradient.addColorStop(0, `rgba(232, 255, 71, ${dot.opacity})`)
        gradient.addColorStop(1, `rgba(232, 255, 71, 0)`)

        ctx.beginPath()
        ctx.arc(x, y, dot.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Solid dot center
        ctx.beginPath()
        ctx.arc(x, y, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232, 255, 71, ${dot.opacity})`
        ctx.fill()
      })

      angle += 0.008 * speed
      animFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animFrame)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
    />
  )
}