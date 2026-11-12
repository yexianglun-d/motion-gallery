import { useEffect, useState } from 'react'
import DemoStage from '../demos/registry.jsx'
import { defaultParams } from '../data/effects/index.js'

export default function EffectCard({ effect, onOpen, index = 0 }) {
  // 0 表示尚未激活（静态起点）；挂载后自动播放，hover 时重播
  const [replayKey, setReplayKey] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setReplayKey(1), Math.min(index * 90, 600))
    return () => clearTimeout(timer)
  }, [index])

  // 入场类是一次性动画，在卡片里每隔约 2.8 秒自动重播，确保随时能看到完整过程
  useEffect(() => {
    if (effect.category !== 'entrance') return undefined
    const id = setInterval(() => setReplayKey((k) => k + 1), 2800)
    return () => clearInterval(id)
  }, [effect.category])

  const params = defaultParams(effect)

  return (
    <button
      type="button"
      onClick={() => onOpen(effect)}
      onMouseEnter={() => setReplayKey((k) => k + 1)}
      aria-label={`查看 ${effect.name} 详情`}
      className="card-surface group flex w-full flex-col overflow-hidden text-left transition duration-300 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-glow"
    >
      <div
        className="h-[140px] border-b border-slate-200 bg-ink-850/60"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <DemoStage
          demoId={effect.demo}
          params={params}
          active={replayKey > 0}
          replayKey={replayKey}
          compact
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{effect.name}</h3>
        <div className="flex flex-wrap gap-1.5">
          {effect.tags.map((t) => (
            <span key={t} className="rounded-md bg-slate-900/5 px-2 py-0.5 text-[11px] text-slate-500">
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
