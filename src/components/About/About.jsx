import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import useCountUp from '../../hooks/useCountUp'
import ScrambleText from '../ScrambleText/ScrambleText'
import OrbitingDots from '../OrbitingDots/OrbitingDots'
import styles from './About.module.css'

const SKILLS = [
  'React', 'Next.js', 'Node.js', 'Express',
  'PostgreSQL', 'MongoDB', 'REST API', 'Git',
  'Tailwind', 'Docker', 'Linux', 'Figma'
]

export default function About({ visitorName }) {
  const ref = useRef(null)
  const wrapperRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [glitching, setGlitching] = useState(false)

  const yearsCount = useCountUp(1, isInView, 1000)
  const projectsCount = useCountUp(10, isInView, 1500)

  // Photo tilt
  useEffect(() => {
    const photo = wrapperRef.current
    if (!photo) return

    const handleMouseMove = (e) => {
      const rect = photo.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)
      const rotateX = deltaY * -8
      const rotateY = deltaX * 8
      photo.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    }

    const handleMouseLeave = () => {
      photo.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`
    }

    photo.addEventListener('mousemove', handleMouseMove)
    photo.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      photo.removeEventListener('mousemove', handleMouseMove)
      photo.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Glitch every 7 seconds
  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 350)
    }, 7000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section className={styles.about} ref={ref} id="about">

      <div className={styles.bgText}>ABOUT</div>

      <motion.div
        className={styles.sectionTag}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        01 — About
      </motion.div>

      <div className={styles.grid}>

        {/* ── LEFT — Photo ── */}
        <motion.div
          ref={wrapperRef}
          className={`${styles.photoWrapper} ${glitching ? styles.glitching : ''}`}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transition: 'transform 0.15s ease, opacity 1s ease' }}
        >
          <div className={styles.photoFrame} />
          <div className={styles.scanLine} />
          <img
            src="/photo.jpg"
            alt="Fajar Rahmat"
            className={styles.photo}
          />
          <div className={styles.photoOverlay} />
        </motion.div>

        {/* ── RIGHT — Content ── */}
        <div className={styles.content}>

          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Get to know me
          </motion.span>

          {/* Heading with orbiting dots floating top right */}
          <motion.div
            style={{ position: 'relative' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Orbiting dots floating in corner */}
            <div style={{
              position: 'absolute',
              top: '-1rem',
              right: '0rem',
              zIndex: 1
            }}>
              <OrbitingDots size={70} dotSize={3} speed={1} />
            </div>

            <ScrambleText
              text="I BUILD THINGS"
              as="h2"
              className={styles.heading}
              delay={0.2}
              speed={25}
            />
          </motion.div>

          {/* Bio */}
          <motion.div
            className={styles.bio}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              Hey {visitorName}! I'm <strong>Fajar Rahmat</strong>, a{' '}
              <strong>Full Stack Developer</strong> based in Indonesia,
              currently on internship sharpening my craft in
              web development.
            </p>
            <p>
              I love building things that live on the internet — from{' '}
              <strong>clean, fast backends</strong> to{' '}
              <strong>interactive, cinematic frontends</strong>.
              This portfolio is proof of that.
            </p>
            <p>
              Currently exploring <strong>DevOps</strong> and{' '}
              <strong>cloud infrastructure</strong> on the side.
              Always learning, always building.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.stat}>
              <span className={styles.statNumber}>{yearsCount}+</span>
              <span className={styles.statLabel}>Years coding</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{projectsCount}+</span>
              <span className={styles.statLabel}>Projects built</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>∞</span>
              <span className={styles.statLabel}>Cups of coffee</span>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className={styles.skillsLabel}>Tech I work with</p>
            <div className={styles.skills}>
              {SKILLS.map((skill, i) => (
                <motion.span
                  key={skill}
                  className={styles.skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  data-cursor="hover"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}