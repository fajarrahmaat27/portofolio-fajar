import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Stack.module.css'

const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'CSS / Tailwind'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Laravel', '.NET', 'REST API', 'WebSocket'],
  },
  {
    category: 'Database',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma'],
  },
  {
    category: 'Mobile',
    items: ['Kotlin', 'Android SDK', 'TensorFlow Lite'],
  },
  {
    category: 'Tools & Infra',
    items: ['Git', 'Docker', 'Linux', 'Google Cloud', 'Vercel'],
  },
  {
    category: 'Design',
    items: ['Figma', 'Component Systems', 'Motion Design'],
  },
]

const LEARNING = ['DevOps', '.NET']

function SkillColumn({ category, items, delay, visible }) {
  return (
    <motion.div
      className={styles.column}
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className={styles.category}>{category}</span>
      <div className={styles.divider} />
      <ul className={styles.list}>
        {items.map((item, i) => (
          <motion.li
            key={item}
            className={styles.skill}
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.1 + i * 0.06 }}
          >
            <span className={styles.skillText}>{item}</span>
            <span className={styles.skillUnderline} />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Stack() {
  const [visible, setVisible] = useState(false)

  // Trigger animations on mount — chapter is already visible via AnimatePresence
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={styles.stack} aria-label="Tech Stack">

      <div className={styles.header}>
        <motion.span
          className={styles.headerLabel}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          04 / 05
        </motion.span>
        <motion.h2
          className={styles.headerTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          What I work with
        </motion.h2>
      </div>

      {/* Skills grid */}
      <div className={styles.grid}>
        {SKILLS.map((group, i) => (
          <SkillColumn
            key={group.category}
            category={group.category}
            items={group.items}
            delay={0.2 + i * 0.07}
            visible={visible}
          />
        ))}
      </div>

      {/* Currently Learning */}
      <motion.div
        className={styles.learning}
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.learningLabel}>Currently exploring</span>
        <div className={styles.learningItems}>
          {LEARNING.map((item, i) => (
            <span key={item} className={styles.learningItem}>
              {item}{i < LEARNING.length - 1 ? <span className={styles.learningDot}> · </span> : ''}
            </span>
          ))}
        </div>
      </motion.div>

    </section>
  )
}
