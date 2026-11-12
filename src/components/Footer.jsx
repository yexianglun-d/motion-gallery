import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:px-6">
        <p>© 2026 动效可视化展示平台 · Motion Gallery</p>
        <a href="#" className="flex items-center gap-1.5 transition hover:text-slate-300">
          <Github size={14} />
          源码仓库
        </a>
      </div>
    </footer>
  )
}
