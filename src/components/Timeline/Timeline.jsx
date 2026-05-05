import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrambleText from '../ScrambleText/ScrambleText'
import styles from './Timeline.module.css'

const TIMELINE = [
  {
    year: '2021',
    title: 'THE BEGINNING',
    side: 'left',
    events: [
      { text: 'Started Informatics Engineering' },
      { text: 'First taste of code with C#' },
      { text: 'Discovered the world of programming' },
    ]
  },
  {
    year: '2022',
    title: 'GOING DEEPER',
    side: 'right',
    events: [
      { text: 'Learned C++ and Java' },
      { text: 'Built logical thinking & problem solving' },
      { text: 'Started understanding how computers really work' },
    ]
  },
  {
    year: '2023',
    title: 'FOUND MY PATH',
    side: 'left',
    events: [
      { text: 'Discovered web dev — HTML, CSS, JavaScript' },
      { text: 'Explored 3D animation & 3D modeling' },
      { text: 'Dipped into AI & machine learning basics' },
    ]
  },
  {
    year: '2024',
    title: 'LEVEL UP',
    side: 'right',
    events: [
      { text: 'Mastered advanced web development' },
      { text: <><strong>KP @ Pertamina Hulu Rokan</strong> ⚡</> },
      { text: <><strong>Bangkit Academy</strong> — Mobile Dev 📱</> },
      { text: <>Final Project @ <strong>BPS Riau</strong></> },
    ]
  },
  {
    year: '2025',
    title: 'PROFESSIONAL',
    side: 'left',
    events: [
      { text: <><strong>Graduated</strong> Informatics Engineering 🎓</> },
      { text: <>@ <strong>Internship at Neutradc (Telkom Indonesia Group)</strong>· Currently ongoing ●</> },
      { text: <>@ <strong>Exploring new technologies, new field, new role</strong>·</> }
    ],
    current: true
  },
]

function WindingPath({ dotPositions, progress, containerHeight }) {
  const measureRef = useRef(null)
  const [pathLength, setPathLength] = useState(0)
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 })
  const ballTarget = useRef({ x: 0, y: 0 })
  const ballCurrent = useRef({ x: 0, y: 0 })
  const ballVelocity = useRef({ x: 0, y: 0 })
  const animRef = useRef(null)

  const buildPath = () => {
    if (dotPositions.length < 2) return ''
    let d = `M ${dotPositions[0].x} ${dotPositions[0].y}`
    for (let i = 1; i < dotPositions.length; i++) {
      const prev = dotPositions[i - 1]
      const curr = dotPositions[i]
      const midY = (prev.y + curr.y) / 2
      const curveStrength = 180
      const cp1x = prev.x + (prev.x > curr.x ? curveStrength : -curveStrength)
      const cp2x = curr.x + (curr.x > prev.x ? curveStrength : -curveStrength)
      d += ` C ${cp1x} ${midY}, ${cp2x} ${midY}, ${curr.x} ${curr.y}`
    }
    return d
  }

  useEffect(() => {
    if (measureRef.current) {
      setPathLength(measureRef.current.getTotalLength())
    }
  }, [dotPositions])

  // Get point on path at progress
  useEffect(() => {
    if (!measureRef.current || pathLength === 0) return
    const point = measureRef.current.getPointAtLength(progress * pathLength)
    ballTarget.current = { x: point.x, y: point.y }
  }, [progress, pathLength])

  // Bouncy physics animation
  useEffect(() => {
    const SPRING = 0.12
    const DAMPING = 0.72
    const BOUNCE = 0.08

    const animate = () => {
      const tx = ballTarget.current.x
      const ty = ballTarget.current.y
      const cx = ballCurrent.current.x
      const cy = ballCurrent.current.y

      // Spring force toward target
      const fx = (tx - cx) * SPRING
      const fy = (ty - cy) * SPRING

      // Apply force + damping
      ballVelocity.current.x = ballVelocity.current.x * DAMPING + fx
      ballVelocity.current.y = ballVelocity.current.y * DAMPING + fy

      // Add tiny bounce wobble
      ballVelocity.current.y += Math.sin(Date.now() * 0.01) * BOUNCE

      // Update position
      ballCurrent.current.x += ballVelocity.current.x
      ballCurrent.current.y += ballVelocity.current.y

      setBallPos({
        x: ballCurrent.current.x,
        y: ballCurrent.current.y
      })

      animRef.current = requestAnimationFrame(animate)
    }

    // Init ball at first dot
    if (dotPositions.length > 0) {
      ballCurrent.current = { ...dotPositions[0] }
      ballTarget.current = { ...dotPositions[0] }
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [dotPositions])

  if (dotPositions.length < 2) return null
  const d = buildPath()

  // Ball squish based on velocity
  const speed = Math.sqrt(
    ballVelocity.current.x ** 2 +
    ballVelocity.current.y ** 2
  )
  const squishX = 1 + Math.min(speed * 0.05, 0.4)
  const squishY = 1 - Math.min(speed * 0.03, 0.25)

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: containerHeight,
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 1
      }}
    >
      <defs>
        <filter id="ballGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pathGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="ballGradient" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#e8ff47" stopOpacity="1" />
          <stop offset="100%" stopColor="#c8df00" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Faint guide path */}
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth="2"
        strokeDasharray="5 8"
      />

      {/* Measure path */}
      <path
        ref={measureRef}
        d={d}
        fill="none"
        stroke="transparent"
        strokeWidth="2"
      />

      {/* Filled yellow path up to ball */}
      {pathLength > 0 && (
        <path
          d={d}
          fill="none"
          stroke="#e8ff47"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength * (1 - progress)}
          filter="url(#pathGlow)"
          opacity="0.6"
        />
      )}

      {/* Ball shadow */}
      <ellipse
        cx={ballPos.x}
        cy={ballPos.y + 14}
        rx={10 * squishX}
        ry={4}
        fill="rgba(0,0,0,0.4)"
      />

      {/* Ball glow */}
      <circle
        cx={ballPos.x}
        cy={ballPos.y}
        r={18}
        fill="rgba(232, 255, 71, 0.15)"
        filter="url(#ballGlow)"
      />

      {/* Main ball */}
      <ellipse
        cx={ballPos.x}
        cy={ballPos.y}
        rx={10 * squishX}
        ry={10 * squishY}
        fill="url(#ballGradient)"
        filter="url(#ballGlow)"
      />

      {/* Ball shine */}
      <ellipse
        cx={ballPos.x - 3}
        cy={ballPos.y - 3}
        rx={3}
        ry={2}
        fill="rgba(255,255,255,0.6)"
      />

      {/* Dot markers at each stop */}
      {dotPositions.map((pos, i) => (
        <circle
          key={i}
          cx={pos.x}
          cy={pos.y}
          r={4}
          fill="transparent"
          stroke="rgba(232, 255, 71, 0.3)"
          strokeWidth="1"
        />
      ))}
    </svg>
  )
}

function TimelineRow({ item, isActive, dotRef }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = item.side === 'left'

  const cardContent = (
    <motion.div
      className={`
        ${styles.card}
        ${isLeft ? styles.cardLeft : styles.cardRight}
        ${isInView ? styles.active : ''}
      `}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {isInView ? (
        <ScrambleText
          text={item.year}
          as="div"
          className={styles.year}
          delay={0.1}
          speed={40}
        />
      ) : (
        <div className={styles.year}>{item.year}</div>
      )}

      <h3 className={styles.title}>{item.title}</h3>

      <ul className={styles.events}>
        {item.events.map((event, i) => (
          <motion.li
            key={i}
            className={styles.event}
            initial={{ opacity: 0, x: isLeft ? -15 : 15 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.2 + i * 0.08,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {event.text}
          </motion.li>
        ))}
      </ul>

      {item.current && (
        <motion.div
          className={styles.currentBadge}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className={styles.currentDot} />
          Currently here
        </motion.div>
      )}
    </motion.div>
  )

  const empty = <div className={styles.cardEmpty} />

  return (
    <div ref={ref} className={styles.row}>
      <div
        className={`
          ${styles.connector}
          ${isLeft ? styles.connectorLeft : styles.connectorRight}
          ${isActive ? styles.connectorActive : ''}
        `}
      />

      {isLeft ? cardContent : empty}

      <div className={styles.dotCol}>
        <div
          ref={dotRef}
          className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
        />
      </div>

      {isLeft ? empty : cardContent}
    </div>
  )
}

export default function Timeline() {
  const sectionRef = useRef(null)
  const dotRefs = useRef([])
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [dotPositions, setDotPositions] = useState([])
  const [containerHeight, setContainerHeight] = useState(0)

  useEffect(() => {
    const calculatePositions = () => {
      const section = sectionRef.current
      if (!section) return

      const sectionRect = section.getBoundingClientRect()
      setContainerHeight(section.offsetHeight)

      const positions = dotRefs.current.map(el => {
        if (!el) return null
        const rect = el.getBoundingClientRect()
        return {
          x: rect.left - sectionRect.left + rect.width / 2,
          y: rect.top - sectionRect.top + rect.height / 2
        }
      }).filter(Boolean)

      setDotPositions(positions)
    }

    setTimeout(calculatePositions, 300)
    window.addEventListener('resize', calculatePositions)
    return () => window.removeEventListener('resize', calculatePositions)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const scrolled = -rect.top + window.innerHeight * 0.5
      const prog = Math.min(Math.max(scrolled / section.offsetHeight, 0), 1)
      setProgress(prog)
      setActiveIndex(Math.floor(prog * TIMELINE.length))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className={styles.timeline} ref={sectionRef} id="timeline">

      <div className={styles.bgText}>JOURNEY</div>

      <WindingPath
        dotPositions={dotPositions}
        progress={progress}
        containerHeight={containerHeight}
      />

      <motion.div
        className={styles.sectionTag}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        02 — Journey
      </motion.div>

      <div className={styles.items}>
        {TIMELINE.map((item, i) => (
          <TimelineRow
            key={item.year}
            item={item}
            isActive={i <= activeIndex}
            dotRef={el => dotRefs.current[i] = el}
          />
        ))}
      </div>

    </section>
  )
}