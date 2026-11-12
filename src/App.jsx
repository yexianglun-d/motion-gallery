import { useCallback, useMemo, useRef, useState } from 'react'
import TopBar from './components/TopBar.jsx'
import CategoryTabs from './components/CategoryTabs.jsx'
import EffectGrid from './components/EffectGrid.jsx'
import DetailDrawer from './components/DetailDrawer.jsx'
import Toast from './components/Toast.jsx'
import Footer from './components/Footer.jsx'
import { EFFECTS, effectsByCategory } from './data/effects/index.js'
import { getCategory } from './data/categories.js'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('entrance')
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState('')
  const toastTimer = useRef(null)

  const showToast = useCallback((message) => {
    setToast(message)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 2000)
  }, [])

  const handleCopy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        showToast('代码已复制到剪贴板')
      } catch {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        try {
          document.execCommand('copy')
          showToast('代码已复制到剪贴板')
        } catch {
          showToast('复制失败，请手动选择代码复制')
        }
        document.body.removeChild(textarea)
      }
    },
    [showToast],
  )

  const searching = searchTerm.trim().length > 0

  const visibleEffects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return effectsByCategory(activeCategory)
    return EFFECTS.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q)) ||
        e.description.toLowerCase().includes(q),
    )
  }, [searchTerm, activeCategory])

  const currentCategory = getCategory(activeCategory)

  return (
    <div className="flex min-h-full flex-col">
      <TopBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CategoryTabs
        active={activeCategory}
        onChange={setActiveCategory}
        searching={searching}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-white">
            {searching ? `搜索结果（${visibleEffects.length}）` : currentCategory.name}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            {searching
              ? `关键词“${searchTerm.trim()}”的全局匹配结果`
              : currentCategory.description}
          </p>
        </div>

        <EffectGrid
          effects={visibleEffects}
          onOpen={setSelected}
          searchTerm={searchTerm.trim()}
        />
      </main>

      <Footer />
      <DetailDrawer
        effect={selected}
        onClose={() => setSelected(null)}
        onCopy={handleCopy}
      />
      <Toast message={toast} />
    </div>
  )
}
