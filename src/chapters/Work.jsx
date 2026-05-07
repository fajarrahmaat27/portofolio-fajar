import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import VanillaTilt from 'vanilla-tilt'
import styles from './Work.module.css'

// Image imports
import imgTaskmaster from '../workimage/taskmaster.png'
import imgSkinsavvy from '../workimage/skinsavvy.webp'
import imgRedesain from '../workimage/redesain web.webp'
import imgBiodirachtin from '../workimage/biodirachtin.webp'
import imgSimagang from '../workimage/simagang.png'

const FEATURED = [
  {
    id: 1,
    name: 'SIMAGANG',
    desc: 'Internship management system built for Badan Pusat Statistik Provinsi Riau. Handles student registration, monitoring, and reporting.',
    tech: ['Laravel', 'Livewire', 'Tailwind CSS'],
    link: 'https://riau.web.bps.go.id/simagang/',
    github: null,
    status: 'Live',
    year: '2024',
    image: imgSimagang,
  },
  {
    id: 2,
    name: 'TASK MASTER',
    desc: 'Comprehensive task management dashboard with real-time updates and priority tracking.',
    tech: ['React', 'TypeScript', '.NET', 'Bootstrap'],
    link: 'https://taskmaster-flax-delta.vercel.app',
    github: null,
    status: 'Live',
    year: '2024',
    image: imgTaskmaster,
  },
  {
    id: 3,
    name: 'SKINSAVVY',
    desc: 'AI-powered Android app analyzing skin health via ML. Bangkit Capstone project designed in Figma.',
    tech: ['Kotlin', 'Android', 'TensorFlow Lite', 'Figma'],
    link: null,
    github: 'https://github.com/SkinSavvy-DevTeam/SkinSavvy-Mobile',
    status: 'Capstone',
    year: '2024',
    type: 'mobile',
    image: imgSkinsavvy,
  },
  {
    id: 4,
    name: 'BIODIRACHTIN',
    desc: 'Product landing page for an organic biopesticide brand. Clean, modern React design with full product showcase.',
    tech: ['React', 'CSS3'],
    link: 'https://biodirachtin.vercel.app/',
    github: null,
    status: 'Live',
    year: '2024',
    image: imgBiodirachtin,
  },
]

const MORE = [
  { id: 5, name: 'TI UNRI', desc: 'Modern web redesign for the Informatics Engineering department at Universitas Riau.', year: '2023', tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'], link: 'https://web-ti-unri-redesign.vercel.app/' },
  { id: 6, name: 'SAFARIN', desc: 'Web agency helping Indonesian UMKM go digital.', year: '2023', tech: ['React', 'Tailwind CSS'], link: 'https://safarin.vercel.app/' },
  { id: 7, name: 'MANYAR BUCKET', desc: 'E-commerce platform for a local gift shop.', year: '2023', tech: ['React', 'Tailwind CSS'], link: 'http://manyarbuckets.shop/' },
  { id: 8, name: "F'R NOTES", desc: 'Clean, minimalist note-taking web application.', year: '2023', tech: ['React', 'Tailwind CSS'], link: 'https://frnotes.vercel.app/' },
]

// ── Project Card ──
function ProjectCard({ project, index, visible }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return
    VanillaTilt.init(cardRef.current, {
      max: 5,
      speed: 600,
      glare: true,
      'max-glare': 0.06,
    })
    return () => {
      if (cardRef.current?.vanillaTilt) cardRef.current.vanillaTilt.destroy()
    }
  }, [])

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      aria-label={project.name}
    >
      <div ref={cardRef} className={styles.cardInner}>

        {/* Image / Browser Mockup */}
        <div className={styles.cardImage}>
          {project.type === 'mobile' ? (
            <div className={styles.mobileMockupBg}>
              <div className={styles.mobilePhone}>
                <div className={styles.mobileNotch}></div>
                <img src={project.image} alt={project.name} />
              </div>
            </div>
          ) : (
            <div className={styles.browserMockupBg}>
              <div className={styles.browserWindow}>
                <div className={styles.browserTopBar}>
                  <div className={styles.browserDots}>
                    <span style={{ background: '#ff5f56' }} />
                    <span style={{ background: '#ffbd2e' }} />
                    <span style={{ background: '#27c93f' }} />
                  </div>
                  <div className={styles.browserUrlBar}>
                    {project.link ? new URL(project.link).hostname.replace('www.', '') : 'github.com'}
                  </div>
                </div>
                {project.image && <img src={project.image} alt={project.name} className={styles.browserImg} />}
              </div>
            </div>
          )}
          <div className={styles.cardImageOverlay} />
        </div>

        {/* Info */}
        <div className={styles.cardInfo}>
          <div className={styles.cardMeta}>
            <span className={styles.cardIndex}>{String(index + 1).padStart(2, '0')}</span>
            <span className={`${styles.cardStatus} ${project.status === 'Live' ? styles.live : ''}`}>
              {project.status === 'Live' ? '● ' : ''}{project.status}
            </span>
            <span className={styles.cardYear}>{project.year}</span>
          </div>

          <h2 className={styles.cardName}>{project.name}</h2>
          <p className={styles.cardDesc}>{project.desc}</p>

          <div className={styles.techStackWrapper}>
            <span className={styles.techLabel}>STACK —</span>
            <div className={styles.techStack}>
              {project.tech.map(t => (
                <span key={t} className={styles.techTag}>{t}</span>
              ))}
            </div>
          </div>

          <div className={styles.cardLinks}>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={styles.btnPrimary}
                id={`project-link-${project.id}`}
              >
                View Live <span className={styles.btnArrow}>↗</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={styles.btnSecondary}
                id={`project-github-${project.id}`}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>

      </div>
    </motion.article>
  )
}

// ── More row ──
function MoreRow({ project, index, visible }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={styles.moreRow}
      id={`more-project-${project.id}`}
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.05 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={styles.moreYear}>{project.year}</span>
      <div className={styles.moreInfo}>
        <span className={styles.moreName}>{project.name}</span>
        {project.tech && (
          <div className={styles.moreTech}>
            {project.tech.map(t => <span key={t}>{t}</span>)}
          </div>
        )}
      </div>
      <span className={styles.moreDesc}>{project.desc}</span>
      <span className={styles.moreArrow}>↗</span>
    </motion.a>
  )
}

// ── Main ──
export default function Work() {
  const [visible, setVisible] = useState(false)

  // Animate cards immediately when chapter mounts
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={styles.work} aria-label="Work">

      {/* Section header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.headerLabel}>03 / 05</span>
        <h2 className={styles.headerTitle}>Selected Work</h2>
        <div className={styles.headerLine} />
      </motion.div>

      {/* Featured cards */}
      <div className={styles.cards}>
        {FEATURED.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} visible={visible} />
        ))}
      </div>

      {/* More projects — text list */}
      <div className={styles.moreSection}>
        <div className={styles.moreSectionHeader}>
          <span className={styles.moreSectionLabel}>More Projects</span>
          <div className={styles.moreSectionLine} />
        </div>
        <div className={styles.moreList}>
          {MORE.map((p, i) => (
            <MoreRow key={p.id} project={p} index={i} visible={visible} />
          ))}
        </div>
      </div>

    </section>
  )
}
