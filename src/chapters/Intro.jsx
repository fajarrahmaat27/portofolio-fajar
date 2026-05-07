import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Intro.module.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
})

export default function Intro({ goNext }) {
  const nameRef = useRef(null)

  // Magnetic hover on the name
  useEffect(() => {
    const el = nameRef.current
    if (!el) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      el.style.transform = `translate(${dx * 6}px, ${dy * 4}px)`
    }

    const handleLeave = () => {
      el.style.transform = 'translate(0, 0)'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <section className={styles.intro} aria-label="Intro">

      {/* Top-left status */}
      <motion.div className={styles.status} {...fadeUp(0.1)}>
        <span className={styles.statusDot} />
        <span className={styles.statusText}>Available for work</span>
      </motion.div>

      {/* Background SVG curve — subtle decorative */}
      <svg className={styles.bgCurve} viewBox="0 0 800 600" fill="none" aria-hidden="true">
        <path
          d="M -50 400 Q 200 100 500 350 T 900 200"
          stroke="var(--color-border)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M -100 500 Q 300 200 600 450 T 950 300"
          stroke="var(--color-border)"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>

      {/* Main name — magnetic */}
      <div className={styles.nameWrapper} ref={nameRef}>
        <motion.h1
          className={styles.name}
          {...fadeUp(0.3)}
        >
          Fajar<br />
          <span className={styles.nameSecond}>Rahmat</span>
        </motion.h1>
      </div>

      {/* Role + location */}
      <motion.div className={styles.role} {...fadeUp(0.55)}>
        <p className={styles.roleTitle}>Full Stack Developer</p>
        <p className={styles.roleLocation}>Based in Indonesia</p>
      </motion.div>

      {/* Bottom row */}
      <motion.div className={styles.bottom} {...fadeUp(0.75)}>

        <div className={styles.year}>
          <span className={styles.yearLabel}>Est.</span>
          <span className={styles.yearValue}>2021</span>
        </div>

        <button
          className={styles.nextHint}
          onClick={goNext}
          id="intro-next-btn"
          aria-label="Go to next chapter: About"
        >
          <span className={styles.nextText}>About me</span>
          <span className={styles.nextArrow}>→</span>
        </button>
      </motion.div>

    </section>
  )
}
