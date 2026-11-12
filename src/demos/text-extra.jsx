import { Stage, num } from './shared.jsx'

function SplitTextDemo({ params, compact }) {
  const d = num(params, 'duration', 0.8)
  const word = 'MOTION'
  return (
    <Stage>
      <div className="flex">
        {word.split('').map((ch, i) => (
          <span
            key={i}
            className="font-bold text-white"
            style={{
              fontSize: compact ? 22 : 30,
              opacity: 0,
              animation: `demo-fade ${d}s ease-out both`,
              animationDelay: `${i * d * 0.16}s`,
            }}
          >
            {ch}
          </span>
        ))}
      </div>
    </Stage>
  )
}

function TextRollDemo({ params, compact }) {
  const d = num(params, 'duration', 2.4)
  const words = ['设计', '开发', '动效', '设计']
  const h = compact ? 32 : 40
  return (
    <Stage>
      <div className="overflow-hidden" style={{ height: h }}>
        <div style={{ animation: `demo-text-roll ${d}s cubic-bezier(.7,0,.3,1) infinite` }}>
          {words.map((w, i) => (
            <div
              key={i}
              className="flex items-center justify-center font-bold text-white"
              style={{ height: h, fontSize: compact ? 20 : 26 }}
            >
              {w}
            </div>
          ))}
        </div>
      </div>
    </Stage>
  )
}

function TextMorphDemo({ params, compact }) {
  const d = num(params, 'duration', 2)
  const fs = compact ? 22 : 28
  return (
    <Stage>
      <div className="relative" style={{ width: compact ? 90 : 110, height: fs }}>
        <span
          className="absolute inset-0 flex items-center justify-center font-bold text-white"
          style={{ animation: `demo-fade ${d}s ease-in-out infinite alternate` }}
        >
          Hello
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center font-bold text-aqua-400"
          style={{ animation: `demo-fade ${d}s ease-in-out infinite alternate-reverse` }}
        >
          世界
        </span>
      </div>
    </Stage>
  )
}

function TextStrokeDemo({ params, compact }) {
  const d = num(params, 'duration', 2)
  return (
    <Stage>
      <span
        className="font-bold"
        style={{ fontSize: compact ? 24 : 32, animation: `demo-text-stroke ${d}s ease-in-out infinite` }}
      >
        STROKE
      </span>
    </Stage>
  )
}

function CursorBlinkDemo({ params }) {
  const d = num(params, 'duration', 1)
  return (
    <Stage>
      <span
        style={{
          display: 'inline-block',
          width: 3,
          height: 34,
          borderRadius: 2,
          background: '#22d3ee',
          animation: `demo-cursor-blink ${d}s step-end infinite`,
        }}
      />
    </Stage>
  )
}

function TextWaveDemo({ params, compact }) {
  const d = num(params, 'duration', 1.4)
  const word = 'WAVE'
  return (
    <Stage>
      <div className="flex">
        {word.split('').map((ch, i) => (
          <span
            key={i}
            className="font-bold text-white"
            style={{
              fontSize: compact ? 22 : 28,
              '--amount': '10px',
              animation: `demo-float-y ${d}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {ch}
          </span>
        ))}
      </div>
    </Stage>
  )
}

function GlowTextDemo({ params, compact }) {
  const d = num(params, 'duration', 1.8)
  return (
    <Stage>
      <span
        className="font-bold text-white"
        style={{ fontSize: compact ? 24 : 32, animation: `demo-glow ${d}s ease-in-out infinite` }}
      >
        GLOW
      </span>
    </Stage>
  )
}

export default {
  'split-text': SplitTextDemo,
  'text-roll': TextRollDemo,
  'text-morph': TextMorphDemo,
  'text-stroke': TextStrokeDemo,
  'cursor-blink': CursorBlinkDemo,
  'text-wave': TextWaveDemo,
  'glow-text': GlowTextDemo,
}
