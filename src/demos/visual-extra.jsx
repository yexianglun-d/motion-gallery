import { useState } from 'react'
import { Blob, Stage, num, useAutoMove, useAutoPulse } from './shared.jsx'

function NeumorphismDemo({ compact }) {
  const [manual, setManual] = useState(null)
  const pulse = useAutoPulse(compact, 1800)
  const pressed = manual === null ? pulse > 0.5 : manual
  const size = 76
  return (
    <Stage style={{ background: '#0f1528' }}>
      <button
        type="button"
        aria-label="新拟态按钮"
        onClick={() => setManual(pressed ? false : true)}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: '#0f1528',
          boxShadow: pressed
            ? 'inset 7px 7px 14px #050813, inset -7px -7px 14px #19223d'
            : '8px 8px 16px #050813, -8px -8px 16px #19223d',
        }}
      />
    </Stage>
  )
}

function MorphDemo({ params, compact }) {
  const d = num(params, 'duration', 3)
  return (
    <Stage>
      <Blob size={compact ? 56 : 72} style={{ animation: `demo-morph ${d}s ease-in-out infinite` }} />
    </Stage>
  )
}

function MotionBlurDemo({ params, compact }) {
  const d = num(params, 'duration', 1.6)
  return (
    <Stage>
      <Blob size={compact ? 46 : 58} style={{ animation: `demo-motion-blur ${d}s ease-in-out infinite` }} />
    </Stage>
  )
}

function ParallaxDemo({ compact }) {
  const [manual, setManual] = useState(null)
  const [ax] = useAutoMove(compact)
  const p = manual === null ? ax : manual
  const layers = [
    { factor: 12, size: 26, color: '#273152', top: '22%' },
    { factor: 28, size: 38, color: '#4f46e5', top: '40%' },
    { factor: 46, size: 52, color: '#22d3ee', top: '52%' },
  ]
  return (
    <Stage
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setManual((e.clientX - r.left) / r.width - 0.5)
      }}
      onMouseLeave={() => setManual(null)}
    >
      <div className="relative h-full w-full">
        {layers.map((l, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              top: l.top,
              width: l.size,
              height: l.size,
              borderRadius: 12,
              background: l.color,
              opacity: i === 0 ? 0.8 : 1,
              transform: `translate(calc(-50% + ${p * l.factor}px), -50%)`,
              transition: 'transform .2s ease-out',
            }}
          />
        ))}
      </div>
    </Stage>
  )
}

function GlitchDemo({ params, compact }) {
  const d = num(params, 'duration', 0.8)
  return (
    <Stage>
      <span
        className="font-bold text-white"
        style={{ fontSize: compact ? 22 : 28, animation: `demo-glitch ${d}s steps(1) infinite` }}
      >
        GLITCH
      </span>
    </Stage>
  )
}

function AberrationDemo({ params, compact }) {
  const d = num(params, 'duration', 1.2)
  return (
    <Stage>
      <span
        className="font-bold text-white"
        style={{ fontSize: compact ? 20 : 26, animation: `demo-aberration ${d}s steps(1) infinite` }}
      >
        RGB
      </span>
    </Stage>
  )
}

export default {
  neumorphism: NeumorphismDemo,
  morph: MorphDemo,
  'motion-blur': MotionBlurDemo,
  parallax: ParallaxDemo,
  glitch: GlitchDemo,
  aberration: AberrationDemo,
}
