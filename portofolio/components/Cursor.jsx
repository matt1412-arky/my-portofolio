'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    document.addEventListener('mousemove', move)

    let raf
    const tick = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.14
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.14
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const grow = () => { dot.current?.classList.add('big'); ring.current?.classList.add('big') }
    const shrink = () => { dot.current?.classList.remove('big'); ring.current?.classList.remove('big') }
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dot} id="cdot" />
      <div ref={ring} id="cring" />
      <style>{`
        #cdot,#cring { position:fixed; top:0; left:0; pointer-events:none; z-index:9999; will-change:transform; }
        #cdot { width:8px; height:8px; background:var(--accent); border-radius:50%; transition:width .15s,height .15s; }
        #cring { width:40px; height:40px; border:1.5px solid rgba(108,99,255,0.45); border-radius:50%; transition:width .2s,height .2s,border-color .2s; }
        #cdot.big { width:14px; height:14px; margin:-3px 0 0 -3px; background:var(--accent-h); }
        #cring.big { width:56px; height:56px; margin:-8px 0 0 -8px; border-color:rgba(108,99,255,0.6); }
        @media(hover:none){ #cdot,#cring{display:none} }
      `}</style>
    </>
  )
}
