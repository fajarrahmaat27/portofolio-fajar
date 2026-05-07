import { AnimatePresence, motion } from 'framer-motion'
import { useChapterNav } from './hooks/useChapterNav'
import ChapterRail from './components/ChapterRail/ChapterRail'
import Cursor from './components/Cursor/Cursor'
import Intro from './chapters/Intro'
import About from './chapters/About'
import Work from './chapters/Work'
import Stack from './chapters/Stack'
import Contact from './chapters/Contact'
import './index.css'

// Chapter slide transition variants
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-8%' : '8%',
    opacity: 0,
  }),
}

const transition = {
  duration: 0.75,
  ease: [0.16, 1, 0.3, 1],
}

const CHAPTERS = [Intro, About, Work, Stack, Contact]

export default function App() {
  const { current, direction, goNext, goPrev, go, chapterScrollRef } = useChapterNav()

  const ChapterComponent = CHAPTERS[current]

  // Props per chapter
  const chapterProps = {
    0: { goNext },
    1: {},
    2: {},
    3: {},
    4: {},
  }

  return (
    <>
      <Cursor />

      <ChapterRail current={current} go={go} />

      <div className="chapter-viewport">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            ref={chapterScrollRef}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="chapter chapter--scrollable"
          >
            <ChapterComponent {...chapterProps[current]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
