import { Search, X, Clapperboard } from 'lucide-react'

export default function TopBar({ searchTerm, onSearchChange }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-aqua-500">
            <Clapperboard size={18} className="text-white" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">动效可视化平台</div>
            <div className="hidden text-[11px] text-slate-400 sm:block">Motion Gallery</div>
          </div>
        </div>

        <div className="relative ml-auto w-full max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="搜索动效名称，如 Fade、Shake、Glass…"
            aria-label="搜索动效"
            className="w-full rounded-xl border border-white/10 bg-ink-800 py-2 pl-9 pr-9 text-sm text-slate-200 placeholder:text-slate-500 focus:border-brand-500/60"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="清除搜索"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-white"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
