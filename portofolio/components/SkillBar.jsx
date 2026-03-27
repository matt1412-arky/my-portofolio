'use client'
import { useEffect, useRef } from 'react'
import s from './SkillBar.module.css'

export default function SkillBar({ skills }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll('[data-w]').forEach(bar => {
          bar.style.width = bar.dataset.w + '%'
        })
        io.unobserve(el)
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref}>
      {skills.map(sk => (
        <div key={sk.name} className={s.item}>
          <div className={s.top}>
            <span className={s.name}>{sk.name}</span>
            <span className={s.lv}>{sk.label}</span>
          </div>
          <div className={s.track}>
            <div className={s.fill} data-w={sk.level} style={{ width: 0 }} />
          </div>
        </div>
      ))}
    </div>
  )
}
