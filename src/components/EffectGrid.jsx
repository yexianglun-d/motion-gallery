import { SearchX } from 'lucide-react'
import EffectCard from './EffectCard.jsx'

export default function EffectGrid({ effects, onOpen, searchTerm }) {
  if (effects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-slate-500">
        <SearchX size={36} strokeWidth={1.5} />
        <p className="text-sm">没有找到与“{searchTerm}”相关的动效</p>
        <p className="text-xs text-slate-400">试试更换关键词，或清除搜索浏览全部分类</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {effects.map((effect, i) => (
        <EffectCard key={effect.id} effect={effect} onOpen={onOpen} index={i} />
      ))}
    </div>
  )
}
