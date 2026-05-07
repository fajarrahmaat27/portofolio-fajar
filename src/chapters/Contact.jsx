import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Contact.module.css'

const LINKS = [
  {
    id: 'contact-email',
    label: 'fajarrahmat934@gmail.com',
    href: 'mailto:fajarrahmat934@gmail.com',
    type: 'Email',
  },
  {
    id: 'contact-linkedin',
    label: 'linkedin.com/in/fajarrahmat',
    href: 'https://www.linkedin.com/in/fajar-rahmat/',
    type: 'LinkedIn',
  },
  {
    id: 'contact-github',
    label: 'github.com/fajarrahmaat27',
    href: 'https://github.com/fajarrahmaat27',
    type: 'GitHub',
  },
]

export default function Contact() {
  const [visible, setVisible] = useState(false)

  // Trigger animations on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={styles.contact} aria-label="Contact">

      <div className={styles.inner}>

        <motion.span
          className={styles.label}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          05 / 05
        </motion.span>

        <motion.h2
          className={styles.headline}
          initial={{ opacity: 0, y: 32 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          Let's build<br />
          <em>something real.</em>
        </motion.h2>

        {/* Links */}
        <motion.div
          className={styles.links}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {LINKS.map((link, i) => (
            <motion.a
              key={link.id}
              id={link.id}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noreferrer'}
              className={styles.link}
              initial={{ opacity: 0, x: -16 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.linkType}>{link.type}</span>
              <span className={styles.linkLabel}>{link.label}</span>
              <span className={styles.linkFill} />
              <span className={styles.linkArrow}>↗</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Meta info */}
        <motion.div
          className={styles.meta}
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Location</span>
            <span className={styles.metaValue}>Riau, Indonesia · GMT+7</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Open to</span>
            <span className={styles.metaValue}>Remote, Hybrid, Freelance</span>
          </div>
        </motion.div>

      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <span className={styles.footerLeft}>© 2026 Fajar Rahmat</span>
        <span className={styles.footerRight}>Built with React + Framer Motion</span>
      </div>

    </section>
  )
}
