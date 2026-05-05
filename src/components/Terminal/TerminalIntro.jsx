import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './TerminalIntro.module.css'

// Lines that type out one by one on boot
const BOOT_LINES = [
    { text: '> Initializing system...', delay: 300 },
    { text: '> Loading portfolio...', delay: 900 },
    { text: '> All systems operational.', delay: 1500 },
    { text: '> Access granted.', delay: 2100, accent: true },
    { text: '', delay: 2600 },
    { text: '> Hello, stranger.', delay: 2900, white: true },
    { text: '> What should I call you?', delay: 3600, white: true },
]

const LOADING_LINES = [
    'Compiling experience...',
    'Loading projects...',
    'Warming up physics engine...',
    'Almost there...',
    'Welcome.',
]

export default function TerminalIntro({ onComplete }) {
    const [visibleLines, setVisibleLines] = useState([])
    const [showInput, setShowInput] = useState(false)
    const [name, setName] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loadingText, setLoadingText] = useState('')
    const [progress, setProgress] = useState(0)
    const [done, setDone] = useState(false)
    const inputRef = useRef(null)

    // ESC key to skip
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') handleSkip()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [])
    // Boot sequence — reveal lines one by one
    useEffect(() => {
        BOOT_LINES.forEach((line, i) => {
            setTimeout(() => {
                setVisibleLines(prev => [...prev, line])
                if (i === BOOT_LINES.length - 1) {
                    setTimeout(() => setShowInput(true), 400)
                }
            }, line.delay)
        })
    }, [])

    // Auto focus input when it appears
    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus()
        }
    }, [showInput])

    // Loading sequence after name submitted
    useEffect(() => {
        if (!submitted) return

        let lineIndex = 0
        let prog = 0

        const lineInterval = setInterval(() => {
            if (lineIndex < LOADING_LINES.length) {
                setLoadingText(LOADING_LINES[lineIndex])
                lineIndex++
            } else {
                clearInterval(lineInterval)
            }
        }, 400)

        const progressInterval = setInterval(() => {
            prog += 2
            setProgress(prog)
            if (prog >= 100) {
                clearInterval(progressInterval)
                setTimeout(() => setDone(true), 400)
            }
        }, 30)

        return () => {
            clearInterval(lineInterval)
            clearInterval(progressInterval)
        }
    }, [submitted])

    // When done — save name and call onComplete
    useEffect(() => {
        if (!done) return
        const finalName = name.trim() || 'Stranger'
        localStorage.setItem('visitorName', finalName)
        setTimeout(() => onComplete(finalName), 600)
    }, [done])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (submitted) return
        setSubmitted(true)
    }

    const handleSkip = () => {
        localStorage.setItem('visitorName', 'Stranger')
        onComplete('Stranger')
    }

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className={styles.overlay}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className={styles.terminal}>

                        {/* Boot lines */}
                        {visibleLines.map((line, i) => (
                            <motion.p
                                key={i}
                                className={`${styles.line} ${line.accent ? styles.accent : ''} ${line.white ? styles.white : ''}`}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {line.text}
                            </motion.p>
                        ))}

                        {/* Name input */}
                        <AnimatePresence>
                            {showInput && !submitted && (
                                <motion.form
                                    className={styles.inputRow}
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <span className={styles.prompt}>&gt;</span>
                                    <input
                                        ref={inputRef}
                                        className={styles.input}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="your name..."
                                        maxLength={32}
                                        autoComplete="off"
                                        spellCheck="false"
                                    />
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* After name submitted — loading */}
                        <AnimatePresence>
                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <p className={`${styles.line} ${styles.white}`}>
                                        &gt; Welcome, {name.trim() || 'Stranger'}.
                                    </p>
                                    <p className={`${styles.line} ${styles.accent}`}>
                                        &gt; {loadingText}
                                    </p>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Skip hint */}
                        {!submitted && showInput && (
                            <p className={styles.skipHint} onClick={handleSkip}>
                                [ press ESC or click here to skip ]
                            </p>
                        )}

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
