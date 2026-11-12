import { useEffect, useRef, useState } from 'react'
import { Blob, Stage, num, useAutoMove, useAutoPulse } from './shared.jsx'

function RippleDemo({ compact }) {
  const [ripples, setRipples] = useState([])
  const size = compact ? 80 : 96
  function spawn(px, py) {
    const s = size
    const id = Math.random()
    setRipples((r) => [...r, { id, x: px - s / 2, y: py - s / 2, s }])
    setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 600)
  }
  function handleClick(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    spawn(e.clientX - rect.left, e.clientY - rect.top)
  }
  // 自动演示：周期性在中心产生涟漪
  useEffect(() => {
    if (!compact) return undefined
    const id = setInterval(() => spawn(size / 2, size / 2), 1200)
    return () => clearInterval(id)
  }, [compact])
  return (
    <Stage>
      <button
        type="button"
        onClick={handleClick}
        className="relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-aqua-500 text-xs text-white"
        style={{ width: size, height: size }}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            style={{
              position: 'absolute',
              left: r.x,
              top: r.y,
              width: r.s,
              height: r.s,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.5)',
              animation: 'demo-ripple .6s ease-out forwards',
            }}
          />
        ))}
        点击
      </button>
    </Stage>
  )
}

function MagneticDemo({ compact }) {
  const ref = useRef(null)
  const [manual, setManual] = useState(null)
  const [ax, ay] = useAutoMove(compact)
  const t = manual ?? { x: ax * 18, y: ay * 18 }
  return (
    <Stage>
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current.getBoundingClientRect()
          setManual({
            x: (e.clientX - (r.left + r.width / 2)) * 0.4,
            y: (e.clientY - (r.top + r.height / 2)) * 0.4,
          })
        }}
        onMouseLeave={() => setManual(null)}
        style={{ transform: `translate(${t.x}px,${t.y}px)`, transition: 'transform .3s ease' }}
      >
        <Blob size={compact ? 48 : 60} />
      </div>
    </Stage>
  )
}

function PressDemo({ params, compact }) {
  const d = num(params, 'duration', 0.15)
  const [manual, setManual] = useState(null)
  const pulse = useAutoPulse(compact, 1400)
  const pressed = manual === null ? pulse > 0.55 : manual
  return (
    <Stage>
      <Blob
        size={compact ? 48 : 60}
        onMouseDown={() => setManual(true)}
        onMouseUp={() => setManual(null)}
        onMouseLeave={() => setManual(null)}
        style={{ transform: pressed ? 'scale(.9)' : 'scale(1)', transition: `transform ${d}s ease` }}
      />
    </Stage>
  )
}

function SwipeDemo({ compact }) {
  const [x, setX] = useState(0)
  const [gone, setGone] = useState(false)
  // 自动演示：周期模拟左右侧滑飞出再回来
  useEffect(() => {
    if (!compact) return undefined
    let step = 0
    const id = setInterval(() => {
      step += 1
      const m = step % 4
      if (m === 0) { setGone(true); setX(120) }
      else if (m === 1) { setGone(false); setX(0) }
      else if (m === 2) { setGone(true); setX(-120) }
      else { setGone(false); setX(0) }
    }, 750)
    return () => clearInterval(id)
  }, [compact])
  function handleDown(e) {
    const startX = e.clientX
    function move(ev) { setX(ev.clientX - startX) }
    function up() {
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerup', up)
      if (Math.abs(x) > 70) {
        setGone(true)
        setTimeout(() => { setGone(false); setX(0) }, 700)
      } else setX(0)
    }
    document.addEventListener('pointermove', move)
    document.addEventListener('pointerup', up)
  }
  return (
    <Stage>
      <div
        onPointerDown={handleDown}
        className="flex h-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-aqua-500 text-xs text-white"
        style={{
          width: compact ? 96 : 120,
          cursor: 'grab',
          opacity: gone ? 0 : 1,
          transform: `translateX(${gone ? (x > 0 ? 200 : -200) : x}px)`,
          transition: 'transform .3s, opacity .3s',
        }}
      >
        左右侧滑
      </div>
    </Stage>
  )
}

function DragDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  function handleDown(e) {
    const sx = e.clientX
    const sy = e.clientY
    const bx = pos.x
    const by = pos.y
    function move(ev) { setPos({ x: bx + ev.clientX - sx, y: by + ev.clientY })
  }
  return (
    <Stage>
      <div onPointerDown={handleDown} style={{ transform: `translate(${pos.x}px,${pos.y}px)`, cursor: 'grab' }}>
        <Blob size={48} />
      </div>
    </Stage>
  )
}

function HoldDemo({ params, compact }) {
  const fillMs = num(params, 'duration', 1.2)
  const [manual, setManual] = useState(null)
  const pulse = useAutoPulse(compact, 1800)
  const prog = manual === null ? pulse : manual
  const raf = useRef(null)
  const start = useRef(0)
  function begin() {
    start.current = performance.now()
    const loop = (now) => {
      const p = Math.min((now - start.current) / (fillMs * 1000), 1)
      setManual(p)
      if (p < 1) raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
  }
  function end() {
    cancelAnimationFrame(raf.current)
    setManual(null)
  }
  const size = compact ? 70 : 84
  return (
    <Stage>
      <button
        type="button"
        onPointerDown={begin}
        onPointerUp={end}
        onPointerLeave={end}
        className="relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-ink-700 text-xs text-slate-700"
        style={{ width: size, height: size }}
      >
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: `${prog * 100}%`,
            background: 'linear-gradient(180deg,rgba(99,102,241,.5),rgba(34,211,238,.65))',
          }}
        />
        <span className="relative">长按</span>
      </button>
    </Stage>
  )
}

function ButtonMorphDemo({ params, compact }) {
  const d = num(params, 'duration', 0.4)
  const [manual, setManual] = useState(null)
  const pulse = useAutoPulse(compact, 2400)
  const sent = manual === null ? pulse > 0.62 : manual
  return (
    <Stage>
      <button
        type="button"
        onClick={() => setManual(sent ? false : true)}
        className="flex items-center justify-center bg-gradient-to-r from-brand-500 to-aqua-500 text-sm text-white"
        style={{
          width: compact ? 112 : 134,
          height: 42,
          borderRadius: sent ? 21 : 12,
          transition: `all ${d}s ease`,
        }}
      >
        {sent ? '✓ 已发送' : '发送邮件'}
      </button>
    </Stage>
  )
}

export default {
  ripple: RippleDemo,
  magnetic: MagneticDemo,
  press: PressDemo,
  swipe: SwipeDemo,
  drag: DragDemo,
  hold: HoldDemo,
  'button-morph': ButtonMorphDemo,
}
