import { CATEGORIES } from '../data/categories.js'
import { countByCategory } from '../data/effects/index.js'

export default function CategoryTabs({ active, onChange, searching }) {
  return (
    <div className="border-b border-slate-200 bg-ink-900/70">
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
                    : 'text-slate-500 hover:bg-slate-900/5 hover:text-slate-900')
                }
              >
                {c.name}
                <span className={'ml-1.5 text-xs ' + (selected ? 'text-white/80' : 'text-slate-400')}>
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
