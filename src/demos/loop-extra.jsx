import { useEffect, useState } from 'react'
import { Blob, Stage, num } from './shared.jsx'

function MarqueeDemo({ params, compact }) {
  const d = num(params, 'duration', 8)
  const words = ['React', 'GSAP', 'CSS', 'Motion', 'Vite']
  const doubled = [...words, ...words]
  return (
    <Stage className="p-0">
      <div className="w-full overflow-hidden">
        <div
          className="flex w-max gap-7 whitespace-nowrap px-4"
          style={{ animation: `demo-marquee ${d}s linear infinite` }}
        >
          {doubled.map((w, i) => (
            <span key={i} className="text-sm text-slate-300">{w}</span>
          ))}
        </div>
      </div>
    </Stage>
  )
}

function ShimmerDemo({ params, compact }) {
  const d = num(params, 'duration', 1.4)
  return (
    <Stage>
      <div
        style={{
          width: compact ? 92 : 124,
          height: compact ? 18 : 24,
          borderRadius: 8,
          background:
            'linear-gradient(90deg,#1c2540 25%,#334066 50%,#1c2540 75%)',
          backgroundSize: '200% 100%',
          animation: `demo-shimmer ${d}s linear infinite`,
        }}
      />
    </Stage>
  )
}

function CountUpDemo({ params, compact }) {
  const d = num(params, 'duration', 1.5)
  const [value, setValue] = useState(0)
  useEffect(() => {
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / (d * 1000), 1)
      setValue(Math.round(100 * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [d])
  return (
    <Stage>
      <span className="font-mono font-bold" style={{ fontSize: compact ? 26 : 34 }}>
        {value}
      </span>
    </Stage>
  )
}

function TypewriterDemo({ params, compact }) {
  const d = num(params, 'duration', 1.6)
  const text = 'Hello'
  const [n, setN] = useState(0)
  useEffect(() => {
    const step = (d * 1000) / text.length
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id)
          return v
        }
        return v + 1
      })
    }, step)
    return () => clearInterval(id)
  }, [d])
  return (
    <Stage>
      <span className="font-mono" style={{ fontSize: compact ? 18 : 22 }}>
        {text.slice(0, n)}
        <span className="ml-0.5 inline-block w-[2px] animate-pulse text-aqua-400">|</span>
      </span>
    </Stage>
  )
}

const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#________'
function ScrambleDemo({ params, compact }) {
  const d = num(params, 'duration', 1.4)
  const target = 'MOTION'
  const [output, setOutput] = useState('')
  useEffect(() => {
    let frame = 0
    const totalFrames = Math.round(d * 30)
    const id = setInterval(() => {
      frame += 1
      const progress = frame / totalFrames
      const revealed = Math.floor(target.length * Math.min(progress, 1))
      let s = ''
      for (let i = 0; i < target.length; i += 1) {
        s +=
          i < revealed
            ? target[i]
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }
      setOutput(s)
      if (progress >= 1) {
        setOutput(target)
        clearInterval(id)
      }
    }, 33)
    return () => clearInterval(id)
  }, [d])
  return (
    <Stage>
      <span className="font-mono" style={{ fontSize: compact ? 16 : 20 }}>
        {output}
      </span>
    </Stage>
  )
}

function FloatDemo({ params, compact }) {
  const d = num(params, 'duration', 1.8)
  const amount = num(params, 'amount', 12)
  return (
    <Stage>
      <Blob
        size={compact ? 46 : 60}
        style={{
          '--amount': `${amount}px`,
          animation: `demo-float-y ${d}s ease-in-out infinite`,
        }}
      />
    </Stage>
  )
}

function WaveDemo({ params, compact }) {
  const d = num(params, 'duration', 1.4)
  return (
    <Stage>
      <div className="flex items-end gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: compact ? 8 : 10,
              height: compact ? 26 : 34,
              borderRadius: 4,
              background: 'linear-gradient(180deg,#818cf8,#22d3ee)',
              '--amount': '8px',
              animation: `demo-float-y ${d}s ease-in-out infinite`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
    </Stage>
  )
}

export default {
  marquee: MarqueeDemo,
  shimmer: ShimmerDemo,
  countup: CountUpDemo,
  typewriter: TypewriterDemo,
  scramble: ScrambleDemo,
  float: FloatDemo,
  wave: WaveDemo,
}
