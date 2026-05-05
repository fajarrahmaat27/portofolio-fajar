import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrambleText from '../ScrambleText/ScrambleText'
import styles from './Work.module.css'

const FEATURED = [
  {
    id: 1,
    name: 'SIMAGANG',
    desc: 'Internship management system built for Badan Pusat Statistik Provinsi Riau. Handles student registration, monitoring, and reporting for government internship programs.',
    tech: ['Laravel', 'Livewire', 'Tailwind', 'MySQL'],
    link: 'https://riau.web.bps.go.id/simagang/',
    github: null,
    status: 'live',
    type: 'web',
    image: '/projects/simagang.png',
    year: '2024',
  },
  {
    id: 2,
    name: 'SKINSAVVY',
    desc: 'AI-powered Android app that analyzes skin health using machine learning. Bangkit Academy 2024 capstone — scan your face to detect skin conditions and get recommendations.',
    tech: ['Kotlin', 'Android', 'TensorFlow Lite', 'Google Cloud'],
    link: null,
    github: 'https://github.com/SkinSavvy-DevTeam/SkinSavvy-Mobile',
    status: 'capstone',
    type: 'mobile',
    image: '/projects/skinsavvy.png',
    year: '2024',
  },
  {
    id: 3,
    name: 'BIODIRACHTIN',
    desc: 'Product landing page for Biodirachtin — an organic biopesticide brand. Clean, modern React design with product showcase.',
    tech: ['React', 'CSS3'],
    link: 'https://biodirachtin.vercel.app/',
    github: null,
    status: 'live',
    type: 'web',
    image: '/projects/biodirachtin.png',
    year: '2024',
  },
]

const MORE_PROJECTS = [
  {
    id: 4,
    name: 'SAFARIN',
    desc: 'Web agency platform helping Indonesian UMKM businesses go digital.',
    tech: ['React', 'CSS3'],
    link: 'https://safarin.vercel.app/',
    year: '2023',
    image: '/projects/safarin.png',
  },
  {
    id: 5,
    name: 'TI UNRI REDESIGN',
    desc: 'Redesign concept for Teknik Informatika Universitas Riau website.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5'],
    link: 'https://web-ti-unri-redesign.vercel.app/',
    year: '2023',
    image: '/projects/tiunri.png',
  },
  {
    id: 6,
    name: 'MANYAR BUCKET',
    desc: 'E-commerce website for a local gift bucket shop.',
    tech: ['React', 'CSS3'],
    link: 'http://manyarbuckets.shop/',
    year: '2023',
    image: '/projects/manyar.png',
  },
]

// ── FEATURED PROJECT ──
function FeaturedProject({ project, index, isFirst }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: '-40% 0px -40% 0px'
  })

  const mockup = project.type === 'mobile' ? (
    <div className={styles.mockupMobile}>
      <img
        src={project.image}
        alt={project.name}
        className={styles.mockupMobileScreen}
        onError={e => e.target.style.display = 'none'}
      />
    </div>
  ) : (
    <div className={styles.mockupBrowser}>
      <div className={styles.mockupBar}>
        <div className={styles.mockupDot} style={{ background: '#ff5f57' }} />
        <div className={styles.mockupDot} style={{ background: '#febc2e' }} />
        <div className={styles.mockupDot} style={{ background: '#28c840' }} />
        <div className={styles.mockupUrl}>
          <span className={styles.mockupUrlText}>
            {project.link?.replace('https://', '').replace('http://', '') || 'github.com'}
          </span>
        </div>
      </div>
      <img
        src={project.image}
        alt={project.name}
        className={styles.mockupScreen}
        onError={e => e.target.style.display = 'none'}
      />
    </div>
  )

  return (
    <div
      className={styles.project}
      ref={ref}
      id={`project-${index}`}
    >
      <div
        className={styles.projectBg}
        style={{ backgroundImage: `url(${project.image})` }}
      />
      <div className={styles.projectOverlay} />

      <div className={styles.projectNumber}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className={styles.projectContent}>

        <motion.div
          className={styles.projectLeft}
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.projectMeta}>
            <span className={styles.projectIndex}>
              {String(index + 1).padStart(2, '0')} / {String(FEATURED.length).padStart(2, '0')}
            </span>
            <span className={`${styles.projectStatus} ${project.status === 'live' ? styles.live : ''}`}>
              {project.status === 'live' ? '● Live' : project.status === 'capstone' ? 'Capstone' : project.status}
            </span>
            <span className={styles.projectStatus}>{project.year}</span>
          </div>

          {isInView ? (
            <ScrambleText
              text={project.name}
              as="h2"
              className={styles.projectName}
              delay={0.1}
              speed={30}
            />
          ) : (
            <h2 className={styles.projectName}>{project.name}</h2>
          )}

          <p className={styles.projectDesc}>{project.desc}</p>

          <div className={styles.techStack}>
            {project.tech.map(t => (
              <span key={t} className={styles.techTag}>{t}</span>
            ))}
          </div>

          <div className={styles.projectLinks}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={styles.btnPrimary}
                data-cursor="OPEN"
              >
                View Live →
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={styles.btnSecondary}
                data-cursor="OPEN"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          className={styles.projectRight}
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.mockupWrapper}>
            {mockup}
          </div>
        </motion.div>

      </div>

      {isFirst && (
        <div className={styles.scrollHint}>
          <div className={styles.scrollLine} />
          <span>scroll</span>
        </div>
      )}
    </div>
  )
}

// ── MORE PROJECTS GRID ──
function MoreProjects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className={styles.moreSection} ref={ref}>
      <motion.div
        className={styles.moreHeader}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className={styles.moreLabel}>More Projects</span>
        <div className={styles.moreLine} />
      </motion.div>

      <div className={styles.moreGrid}>
        {MORE_PROJECTS.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={styles.moreCard}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            data-cursor="OPEN"
          >
            {/* Card image */}
            <div className={styles.moreCardImg}>
              <img
                src={project.image}
                alt={project.name}
                onError={e => e.target.style.display = 'none'}
              />
              <div className={styles.moreCardOverlay} />
            </div>

            {/* Card info */}
            <div className={styles.moreCardInfo}>
              <div className={styles.moreCardTop}>
                <span className={styles.moreCardYear}>{project.year}</span>
                <span className={styles.moreCardArrow}>↗</span>
              </div>
              <h3 className={styles.moreCardName}>{project.name}</h3>
              <p className={styles.moreCardDesc}>{project.desc}</p>
              <div className={styles.moreCardTech}>
                {project.tech.map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}

// ── MAIN ──
export default function Work() {
  const [activeProject, setActiveProject] = useState(0)

  useEffect(() => {
    const observers = FEATURED.map((_, i) => {
      const el = document.getElementById(`project-${i}`)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveProject(i)
        },
        { threshold: 0.5 }
      )

      observer.observe(el)
      return observer
    })

    return () => observers.forEach(obs => obs?.disconnect())
  }, [])

  const scrollToProject = (index) => {
    const el = document.getElementById(`project-${index}`)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="work" className={styles.work}>

      <div className={styles.sectionTag}>
        03 — Work
      </div>

      {/* Dot counter for featured only */}
      <div className={styles.projectCounter}>
        {FEATURED.map((_, i) => (
          <div
            key={i}
            className={`${styles.counterDot} ${i === activeProject ? styles.activeDot : ''}`}
            onClick={() => scrollToProject(i)}
            data-cursor="hover"
          />
        ))}
      </div>

      {/* 3 featured full screen */}
      {FEATURED.map((project, i) => (
        <FeaturedProject
          key={project.id}
          project={project}
          index={i}
          isFirst={i === 0}
        />
      ))}

      {/* More projects grid */}
      <MoreProjects />

    </section>
  )
}