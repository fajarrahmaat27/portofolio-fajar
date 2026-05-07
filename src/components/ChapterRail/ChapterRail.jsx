import styles from './ChapterRail.module.css'

const CHAPTERS = [
  { id: '01', label: 'Intro' },
  { id: '02', label: 'About' },
  { id: '03', label: 'Work' },
  { id: '04', label: 'Stack' },
  { id: '05', label: 'Contact' },
]

export default function ChapterRail({ current, go }) {
  const progress = ((current + 1) / CHAPTERS.length) * 100

  return (
    <nav className={styles.rail} aria-label="Portfolio navigation">

      {/* Thin progress bar across the very top */}
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={styles.inner}>

        {/* Brand / name */}
        <button
          className={styles.brand}
          onClick={() => go(0)}
          aria-label="Go to intro"
          id="nav-brand"
        >
          FR
        </button>

        {/* Chapter dots */}
        <div className={styles.dots} role="list">
          {CHAPTERS.map((ch, i) => (
            <button
              key={ch.id}
              role="listitem"
              id={`nav-chapter-${i}`}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => go(i)}
              aria-label={`Go to chapter ${ch.id}: ${ch.label}`}
              aria-current={i === current ? 'true' : undefined}
              title={`${ch.id} — ${ch.label}`}
            >
              <span className={styles.dotInner} />
              <span className={styles.dotLabel}>{ch.label}</span>
            </button>
          ))}
        </div>

        {/* Chapter counter */}
        <div className={styles.counter} aria-live="polite">
          <span className={styles.counterCurrent}>
            {CHAPTERS[current].id}
          </span>
          <span className={styles.counterSep}>/</span>
          <span className={styles.counterTotal}>
            {CHAPTERS.length.toString().padStart(2, '0')}
          </span>
        </div>

      </div>
    </nav>
  )
}
