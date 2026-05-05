import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.logo}>
        PORT<span>.</span>
      </a>
      <ul className={styles.links}>
        <li><a href="#about">About</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#playground">Playground</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navbar