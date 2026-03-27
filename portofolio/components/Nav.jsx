'use client'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['about', 'projects', 'skills', 'contact']

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#hero" className={styles.logo}>
        mc<span>.</span>
      </a>
      <ul className={styles.links}>
        {links.map((s) => (
          <li key={s}>
            <a
              href={`#${s}`}
              className={active === s ? styles.active : ''}
              onClick={() => setActive(s)}
            >
              {s}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.right}>
        <ThemeToggle />
        <div className={styles.status}>
          <span className={styles.dot} />
          open to work
        </div>
      </div>
    </nav>
  )
}
