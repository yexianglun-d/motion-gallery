import { useRef, useState } from 'react'
import '../styles/demos.css'
import { Blob, Stage, EASE_CSS, num, str } from './shared.jsx'
import entranceExtra from './entrance-extra.jsx'
import loopExtra from './loop-extra.jsx'
import interactionExtra from './interaction-extra.jsx'
import visualExtra from './visual-extra.jsx'
import textExtra from './text-extra.jsx'
import loading3dExtra from './loading-3d-extra.jsx'

/* ---------------- 入场 / 出场 ---------------- */

function FadeInDemo({ params, replayKey, active, compact }) {
  const d = num(params, 'duration', 0.6)
  const e = EASE_CSS[str(params, 'ease', 'ease-out')]
  const size = compact ? 44 : 64
  if (!active) return <Stage><Blob size={size} style={{ opacity: 0 }} /></Stage>
  return (
    <Stage>
      <Blob key={replayKey} size={size} style={{ animation: `demo-fade ${d}s ${e} both` }} />
    </Stage>
  )
}

const SLIDE_KEYFRAME = {
  up: 'demo-slide-up',
  down: 'demo-slide-down',
  left: 'demo-slide-left',
  right: 'demo-slide-right',
}

function SlideInDemo({ params, replayKey, active, compact }) {
  const d = num(params, 'duration', 0.6)
  const e = EASE_CSS[str(params, 'ease', 'ease-out')]
  const dir = str(params, 'direction', 'up')
  const amount = num(params, 'amount', 40)
  const size = compact ? 44 : 64
  if (!active) return <Stage><Blob size={size} style={{ opacity: 0 }} /></Stage>
  return (
    <Stage>
      <Blob
        key={replayKey}
        size={size}
        style={{ '--amount': `${amount}px`, animation: `${SLIDE_KEYFRAME[dir]} ${d}s ${e} both` }}
      />
    </Stage>
  )
}

function ScaleInDemo({ params, replayKey, active, compact }) {
  const d = num(params, 'duration', 0.6)
  const e = EASE_CSS[str(params, 'ease', 'back')]
  const size = compact ? 44 : 64
  if (!active) return <Stage><Blob size={size} style={{ opacity: 0 }} /></Stage>
  return (
    <Stage>
      <Blob key={replayKey} size={size} style={{ animation: `demo-scale-in ${d}s ${e} both` }} />
    </Stage>
  )
}

/* ---------------- 循环动效 ---------------- */

function PulseDemo({ params, compact }) {
  const d = num(params, 'duration', 1.2)
  const amount = num(params, 'amount', 0.1)
  return (
    <Stage>
      <Blob
        size={compact ? 48 : 64}
        style={{ '--pulse-scale': 1 + amount, animation: `demo-pulse ${d}s ease-in-out infinite` }}
      />
    </Stage>
  )
}

function SpinDemo({ params, compact }) {
  const d = num(params, 'duration', 1.2)
  return (
    <Stage>
      <Blob size={compact ? 46 : 60} style={{ animation: `demo-spin ${d}s linear infinite` }} />
    </Stage>
  )
}

function ShakeDemo({ params, compact }) {
  const d = num(params, 'duration', 0.8)
  const amount = num(params, 'amount', 6)
  return (
    <Stage>
      <Blob
        size={compact ? 48 : 64}
        style={{ '--amount': `${amount}px`, animation: `demo-shake ${d}s ease-in-out infinite` }}
      />
    </Stage>
  )
}

/* ---------------- 交互反馈 ---------------- */

function HoverLiftDemo({ params, compact }) {
  const d = num(params, 'duration', 0.3)
  const amount = num(params, 'amount', 10)
  const [hover, setHover] = useState(false)
  return (
    <Stage>
      <Blob
        size={compact ? 48 : 64}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          transform: hover ? `translateY(${-amount}px)` : 'translateY(0)',
          boxShadow: hover ? '0 20px 42px -12px rgba(99,102,241,0.75)' : undefined,
          transition: `transform ${d}s ease, box-shadow ${d}s ease`,
        }}
      />
    </Stage>
  )
}

function ToggleSwitchDemo({ params, compact }) {
  const d = num(params, 'duration', 0.3)
  const [on, setOn] = useState(false)
  const w = compact ? 52 : 62
  const h = compact ? 28 : 32
  const circle = h - 12
  return (
    <Stage>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="开关切换"
        onClick={() => setOn((v) => !v)}
        className="relative rounded-full border border-white/10"
        style={{
          width: w,
          height: h,
          background: on ? 'linear-gradient(90deg,#6366f1,#22d3ee)' : '#1c2540',
          transition: `background ${d}s ease`,
        }}
      >
        <span
          className="absolute top-1/2 rounded-full bg-white shadow"
          style={{
            width: circle,
            height: circle,
            left: 6,
            transform: `translateY(-50%) translateX(${on ? w - h : 0}px)`,
            transition: `transform ${d}s cubic-bezier(0.34,1.56,0.64,1)`,
          }}
        />
      </button>
    </Stage>
  )
}

/* ---------------- 视觉风格 ---------------- */

function GlassDemo() {
  return (
    <Stage className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-6 h-20 w-20 rounded-full bg-brand-500/70 blur-xl" />
        <div className="absolute bottom-4 right-2 h-24 w-24 rounded-full bg-aqua-500/60 blur-xl" />
      </div>
      <div className="relative rounded-2xl border border-white/25 bg-white/10 px-5 py-4 text-sm text-white backdrop-blur-md">
        Glassmorphism
      </div>
    </Stage>
  )
}

function GradientBorderDemo({ params, compact }) {
  const d = num(params, 'duration', 3)
  const size = compact ? 80 : 104
  return (
    <Stage>
      <div
        className="rounded-2xl p-[2px]"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(120deg,#818cf8,#22d3ee,#818cf8)',
          backgroundSize: '200% 200%',
          animation: `demo-gradient-flow ${d}s linear infinite`,
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-ink-800 text-xs text-slate-300">
          渐变边框
        </div>
      </div>
    </Stage>
  )
}

/* ---------------- 文字专项 ---------------- */

function GradientTextDemo({ params, compact }) {
  const d = num(params, 'duration', 3)
  return (
    <Stage>
      <span
        className="font-bold"
        style={{
          fontSize: compact ? 22 : 30,
          backgroundImage: 'linear-gradient(90deg,#818cf8,#22d3ee,#f0abfc,#818cf8)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          animation: `demo-gradient-flow ${d}s linear infinite`,
        }}
      >
        Motion
      </span>
    </Stage>
  )
}

/* ---------------- 加载与进度 ---------------- */

function SpinnerDemo({ params, compact }) {
  const d = num(params, 'duration', 0.9)
  const size = compact ? 40 : 52
  return (
    <Stage>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: '4px solid #273152',
          borderTopColor: '#22d3ee',
          animation: `demo-spin ${d}s linear infinite`,
        }}
      />
    </Stage>
  )
}

function ProgressRingDemo({ params, compact }) {
  const d = num(params, 'duration', 0.6)
  const progress = Math.min(100, Math.max(0, num(params, 'progress', 70)))
  const size = compact ? 80 : 100
  const stroke = 8
  const r = (size - stroke) / 2
  const circumference = 2 * Math.PI * r
  return (
    <Stage>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1c2540" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          style={{ transition: `stroke-dashoffset ${d}s ease` }}
        />
      </svg>
    </Stage>
  )
}

/* ---------------- 3D / 空间 ---------------- */

function TiltDemo({ params, compact }) {
  const max = num(params, 'amount', 12)
  const d = num(params, 'duration', 0.2)
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  function handleMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rx: py * -max, ry: px * max })
  }

  return (
    <Stage>
      <div ref={ref} onMouseMove={handleMove} onMouseLeave={() => setTilt({ rx: 0, ry: 0 })} style={{ perspective: 600 }}>
        <Blob
          size={compact ? 72 : 96}
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: `transform ${d}s ease`,
          }}
        />
      </div>
    </Stage>
  )
}

/* ---------------- 注册表与舞台 ---------------- */

export const DEMO_REGISTRY = {
  'fade-in': FadeInDemo,
  'slide-in': SlideInDemo,
  'scale-in': ScaleInDemo,
  pulse: PulseDemo,
  spin: SpinDemo,
  shake: ShakeDemo,
  'hover-lift': HoverLiftDemo,
  'toggle-switch': ToggleSwitchDemo,
  glass: GlassDemo,
  'gradient-border': GradientBorderDemo,
  'gradient-text': GradientTextDemo,
  spinner: SpinnerDemo,
  'progress-ring': ProgressRingDemo,
  tilt: TiltDemo,
  ...entranceExtra,
  ...loopExtra,
  ...interactionExtra,
  ...visualExtra,
  ...textExtra,
  ...loading3dExtra,
}

export default function DemoStage({ demoId, params, replayKey = 0, active = true, compact = false }) {
  const Component = DEMO_REGISTRY[demoId]
  if (!Component) {
    return <Stage><span className="text-sm text-slate-500">暂无演示</span></Stage>
  }
  return <Component params={params} replayKey={replayKey} active={active} compact={compact} />
}
