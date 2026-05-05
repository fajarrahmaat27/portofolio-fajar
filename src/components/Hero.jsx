import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Hero.module.css'

// Animation variants
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 1,
    delay,
    ease: [0.16, 1, 0.3, 1]
  }
})

export default function Hero({ visitorName }) {
  const heroRef = useRef(null)

  // Subtle mouse parallax
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20

      hero.style.setProperty('--mouse-x', `${x}px`)
      hero.style.setProperty('--mouse-y', `${y}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className={styles.hero} ref={heroRef}>

      {/* Noise texture overlay */}
      <div className={styles.noise} />

      {/* Greeting */}
      <motion.p
        className={styles.greeting}
        {...fadeUp(0.2)}
      >
        Hi {visitorName}, welcome to my portfolio
      </motion.p>

      {/* Big cinematic name */}
      <motion.h1
        className={styles.name}
        {...fadeUp(0.4)}
      >
        Fajar<br />
        <span>Rahmat</span>
      </motion.h1>

      {/* Role */}
      <motion.p
        className={styles.role}
        {...fadeUp(0.6)}
      >
        Full Stack Developer
      </motion.p>

      {/* Bottom row */}
      <motion.div
        className={styles.bottomRow}
        {...fadeUp(0.9)}
      >
        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
          <span>scroll</span>
        </div>

        {/* Status */}
        <div className={styles.status}>
          <div className={styles.statusDot} />
          <span>Available for work</span>
        </div>
      </motion.div>

    </section>
  )
}