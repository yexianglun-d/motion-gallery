import { useEffect, useRef, useState } from 'react'
import { Blob, Stage, num, useAutoMove, useAutoPulse } from './shared.jsx'

const skeletonBg = {
  background: 'linear-gradient(90deg,#1c2540 25%,#334066 50%,#1c2540 75%)',
  backgroundSize: '200% 100%',
  animation: 'demo-shimmer 1.4s linear infinite',
}

/* ---------------- 加载与进度 ---------------- */

function SkeletonDemo() {
  return (
    <Stage>
      <div className="flex w-full max-w-[170px] flex-col gap-2">
        <div className="h-3 w-3/4 rounded" style={skeletonBg} />
        <div className="h-3 w-full rounded" style={skeletonBg} />
        <div className="h-3 w-1/2 rounded" style={skeletonBg} />
      </div>
    </Stage>
  )
}

function ProgressBarDemo({ params }) {
  const d = num(params, 'duration', 0.6)
  const progress = num(params, 'progress', 70)
  return (
    <Stage>
      <div className="h-2.5 w-full max-w-[180px] overflow-hidden rounded-full bg-ink-700">
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            borderRadius: 999,
            background: 'linear-gradient(90deg,#6366f1,#22d3ee)',
            transition: `width ${d}s ease`,
          }}
        />
      </div>
    </Stage>
  )
}

function SuccessCheckDemo() {
  const [cycle, setCycle] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCycle((c) => c + 1), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <Stage>
      <svg key={cycle} width={76} height={76} viewBox="0 0 52 52">
        <circle
          cx={26} cy={26} r={24} fill="none" stroke="#22d3ee" strokeWidth={2}
          strokeDasharray={151}
          style={{ animation: 'check-circle .6s ease-out both' }}
        />
        <path
          fill="none" stroke="#22d3ee" strokeWidth={3} strokeLinecap="round"
          d="M14 27l8 8 16-18"
          strokeDasharray={48}
          style={{ animation: 'check-mark .4s .5s ease-out both' }}
        />
      </svg>
    </Stage>
  )
}

const CONFETTI_COLORS = ['#818cf8', '#22d3ee', '#f0abfc', '#86efac', '#fca5a5']
function ConfettiDemo() {
  return (
    <Stage>
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: '18%',
            left: `${12 + i * 7.6}%`,
            width: 7,
            height: 10,
            background: CONFETTI_COLORS[i % 5],
            animation: `confetti-fall ${1.2 + (i % 3) * 0.3}s ease-in infinite`,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </Stage>
  )
}

function DotsDemo() {
  return (
    <Stage>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#22d3ee',
              animation: 'demo-dot 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>
    </Stage>
  )
}

/* ---------------- 3D / 空间 / 鼠标 ---------------- */

function SpotlightDemo({ compact }) {
  const [manual, setManual] = useState(null)
  const [ax, ay] = useAutoMove(compact)
  const px = manual ? manual.x : (ax + 1) / 2
  const py = manual ? manual.y : (ay + 1) / 2
  return (
    <Stage>
      <div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          setManual({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
        }}
        onMouseLeave={() => setManual(null)}
        className="rounded-xl border border-white/10"
        style={{
          width: compact ? 120 : 165,
          height: compact ? 72 : 92,
          background: `radial-gradient(130px circle at ${px * 100}% ${py * 100}%,rgba(129,140,248,.28),transparent 70%)`,
        }}
      />
    </Stage>
  )
}

function CursorFollowerDemo({ compact }) {
  const [manual, setManual] = useState(null)
  const [ax, ay] = useAutoMove(compact)
  const range = 34
  const p = manual ?? { x: ax * range, y: ay * range }
  return (
    <Stage
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setManual({ x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 })
      }}
      onMouseLeave={() => setManual(null)}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#22d3ee',
          transform: `translate(${p.x}px,${p.y}px)`,
          transition: 'transform .15s ease-out',
          boxShadow: '0 0 16px rgba(34,211,238,.8)',
        }}
      />
    </Stage>
  )
}

function DepthParallaxDemo({ compact }) {
  const ref = useRef(null)
  const [manual, setManual] = useState(null)
  const [ax, ay] = useAutoMove(compact)
  const rot = manual ?? { rx: ay * 14, ry: ax * 14 }
  return (
    <Stage>
      <div
        ref={ref}
        onMouseMove={(e) => {
          const b = ref.current.getBoundingClientRect()
          const px = (e.clientX - b.left) / b.width - 0.5
          const py = (e.clientY - b.top) / b.height - 0.5
          setManual({ rx: py * -14, ry: px * 14 })
        }}
        onMouseLeave={() => setManual(null)}
        style={{ perspective: 700 }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rot.rx}deg) rotateY(${rot.ry}deg)`,
            transition: 'transform .2s ease',
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: i === 0 ? 'relative' : 'absolute',
                inset: 0,
                width: 72,
                height: 72,
                borderRadius: 12,
                background: ['#273152', '#4f46e5', '#22d3ee'][i],
                opacity: 0.9,
                transform: `translateZ(${(i + 1) * 18}px)`,
              }}
            />
          ))}
        </div>
      </div>
    </Stage>
  )
}

function Rotate3DDemo({ params, compact }) {
  const d = num(params, 'duration', 3)
  return (
    <Stage>
      <Blob size={compact ? 52 : 66} style={{ animation: `demo-rotate3d ${d}s linear infinite` }} />
    </Stage>
  )
}

function FloatingCardDemo({ params, compact }) {
  const d = num(params, 'duration', 2.6)
  return (
    <Stage>
      <div
        style={{
          width: compact ? 72 : 92,
          height: compact ? 54 : 70,
          borderRadius: 14,
          background: 'linear-gradient(135deg,#6366f1,#22d3ee)',
          animation: `demo-float-card ${d}s ease-in-out infinite`,
        }}
      />
    </Stage>
  )
}

function OrbitDemo({ params, compact }) {
  const d = num(params, 'duration', 2.4)
  const radius = compact ? 34 : 44
  return (
    <Stage>
      <div className="relative">
        <span
          style={{
            position: 'absolute',
            width: 14,
            height: 14,
            left: -7,
            top: -7,
            borderRadius: '50%',
            background: '#22d3ee',
            '--radius': `${radius}px`,
            animation: `demo-orbit ${d}s linear infinite`,
          }}
        />
        <span
          style={{
            position: 'absolute',
            width: 16,
            height: 16,
            left: -8,
            top: -8,
            borderRadius: '50%',
            background: '#818cf8',
          }}
        />
      </div>
    </Stage>
  )
}

function CubeFlipDemo({ params, compact }) {
  const d = num(params, 'duration', 3)
  const s = compact ? 60 : 76
  const face = {
    position: 'absolute',
    inset: 0,
    border: '1px solid rgba(255,255,255,.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 12,
  }
  return (
    <Stage>
      <div style={{ perspective: 700, width: s, height: s }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            animation: `demo-cube ${d}s linear infinite`,
          }}
        >
          <span style={{ ...face, background: 'rgba(99,102,241,.8)', transform: `translateZ(${s / 2}px)` }}>
            前
          </span>
          <span
            style={{
              ...face,
              background: 'rgba(34,211,238,.8)',
              transform: `rotateY(180deg) translateZ(${s / 2}px)`,
            }}
          >
            后
          </span>
        </div>
      </div>
    </Stage>
  )
}

export default {
  skeleton: SkeletonDemo,
  'progress-bar': ProgressBarDemo,
  'success-check': SuccessCheckDemo,
  confetti: ConfettiDemo,
  dots: DotsDemo,
  spotlight: SpotlightDemo,
  'cursor-follower': CursorFollowerDemo,
  'depth-parallax': DepthParallaxDemo,
  'rotate3d': Rotate3DDemo,
  'floating-card': FloatingCardDemo,
  orbit: OrbitDemo,
  'cube-flip': CubeFlipDemo,
}
