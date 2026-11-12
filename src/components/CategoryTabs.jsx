import { CATEGORIES } from '../data/categories.js'
import { countByCategory } from '../data/effects/index.js'

export default function CategoryTabs({ active, onChange, searching }) {
  return (
    <div className="border-b border-white/5 bg-ink-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div role="tablist" aria-label="动效分类" className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none]">
          {CATEGORIES.map((c) => {
            const selected = !searching && c.id === active
            return (
              <button
                type="button"
                role="tab"
                aria-selected={selected}
                key={c.id}
                onClick={() => onChange(c.id)}
                className={
                  'shrink-0 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm transition ' +
                  (selected
                    ? 'bg-gradient-to-r from-brand-500 to-aqua-500 text-white shadow-glow'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200')
                }
              >
                {c.name}
                <span className={'ml-1.5 text-xs ' + (selected ? 'text-white/80' : 'text-slate-600')}>
                  {countByCategory(c.id)}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
