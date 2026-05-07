import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './About.module.css'

const TIMELINE = [
  { year: '2021', event: 'Started Informatics Engineering. First taste of code with C#. Discovered the world of programming.' },
  { year: '2022', event: 'Learned C++ and Java. Built logical thinking & problem solving. Started understanding how computers really work.' },
  { year: '2023', event: 'Discovered web dev — HTML, CSS, JavaScript. Explored 3D animation & 3D modeling. Dipped into AI & machine learning basics.' },
  { year: '2024', event: 'Mastered advanced web development. KP @ Pertamina Hulu Rokan ⚡. Bangkit Academy — Mobile Dev 📱. Final Project @ BPS Riau.' },
  { year: '2025', event: 'Graduated Informatics Engineering 🎓. Internship at Neutradc (Telkom Indonesia Group). Exploring new technologies, new field, new role.' },
]

export default function About() {
  const [visible, setVisible] = useState(false)
  const photoRef = useRef(null)

  // Trigger animations on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={styles.about} aria-label="About">

      <div className={styles.grid}>

        {/* ── LEFT — Text ── */}
        <div className={styles.left}>

          <motion.span
            className={styles.label}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            02 / 05
          </motion.span>

          <motion.h2
            className={styles.headline}
            initial={{ opacity: 0, y: 36 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            I build software<br />
            <em>that feels inevitable.</em>
          </motion.h2>

          <motion.div
            className={styles.bio}
            initial={{ opacity: 0, y: 28 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <p>
              Hey hai! I'm Fajar Rahmat, a Full Stack Developer based in Indonesia, currently on internship sharpening my craft in web development.
            </p>
            <p>
              I love building things that live on the internet — from clean, fast backends to interactive, cinematic frontends. This portfolio is proof of that.
            </p>
            <p>
              Currently exploring DevOps and cloud infrastructure on the side. Always learning, always building.
            </p>
          </motion.div>

          {/* Timeline moved to horizontal marquee at the bottom */}

        </div>

        {/* ── RIGHT — Photo ── */}
        <motion.div
          className={styles.photoWrapper}
          ref={photoRef}
          initial={{ opacity: 0, x: 40 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.photoPlaceholder} aria-label="Fajar Rahmat">
            <svg viewBox="0 0 380 506" xmlns="http://www.w3.org/2000/svg" className={styles.photoSvg}>
              {/* Background texture grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="380" height="506" fill="var(--color-surface)" />
              <rect width="380" height="506" fill="url(#grid)" />
              {/* Large initials */}
              <text
                x="190" y="300"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="'Instrument Serif', Georgia, serif"
                fontSize="160"
                fontWeight="400"
                fill="var(--color-ink)"
                opacity="0.12"
                letterSpacing="-4"
              >FR</text>
              {/* Central monogram ring */}
              <circle cx="190" cy="253" r="80" fill="none" stroke="var(--color-border)" strokeWidth="1" />
              <text
                x="190" y="253"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="'Instrument Serif', Georgia, serif"
                fontSize="68"
                fontWeight="400"
                fill="var(--color-ink)"
                opacity="0.55"
                letterSpacing="-2"
              >FR</text>
            </svg>
          </div>
          <div className={styles.photoFrame} />
          <div className={styles.photoCaption}>
            <span className={styles.photoCaptionText}>Fajar Rahmat · Indonesia</span>
          </div>
        </motion.div>

      </div>

      {/* ── Auto-scrolling Horizontal Timeline ── */}
      <motion.div
        className={styles.timelineMarquee}
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.marqueeContent}>
          {TIMELINE.map((item, i) => (
            <div key={`orig-${i}`} className={styles.marqueeItem}>
              <span className={styles.marqueeYear}>{item.year}</span>
              <span className={styles.marqueeEvent}>{item.event}</span>
              <span className={styles.marqueeSeparator}>✦</span>
            </div>
          ))}
          {/* Duplicate for infinite seamless scrolling */}
          {TIMELINE.map((item, i) => (
            <div key={`dup-${i}`} className={styles.marqueeItem}>
              <span className={styles.marqueeYear}>{item.year}</span>
              <span className={styles.marqueeEvent}>{item.event}</span>
              <span className={styles.marqueeSeparator}>✦</span>
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
