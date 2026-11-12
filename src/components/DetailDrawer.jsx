import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, RotateCcw, SlidersHorizontal } from 'lucide-react'
import DemoStage from '../demos/registry.jsx'
import { defaultParams } from '../data/effects/index.js'
import { getCategory } from '../data/categories.js'
import CodeBlock from './CodeBlock.jsx'

const TABS = [
  { id: 'css', label: 'CSS', language: 'css' },
  { id: 'gsap', label: 'GSAP', language: 'javascript' },
  { id: 'framer', label: 'Framer Motion', language: 'jsx' },
]

export default function DetailDrawer({ effect, onClose, onCopy }) {
  const [tab, setTab] = useState('css')
  const [params, setParams] = useState({})
  const [replayKey, setReplayKey] = useState(0)
  const closeRef = useRef(null)

  // 打开新动效时重置状态、锁定背景滚动、聚焦关闭按钮
  useEffect(() => {
    if (!effect) return undefined
    setParams(defaultParams(effect))
    setTab('css')
    setReplayKey((k) => k + 1)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [effect, onClose])

  function updateParam(key, value, isNumber) {
    setParams((prev) => ({ ...prev, [key]: isNumber ? Number(value) : value }))
  }

  const activeTab = TABS.find((t) => t.id === tab)
  const category = effect ? getCategory(effect.category) : null

  return (
    <AnimatePresence>
      {effect && (
        <div className="fixed inset-0 z-40">
          <motion.div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={effect.name}
            className="absolute right-0 top-0 flex h-full w-full flex-col border-l border-slate-200 bg-ink-900 shadow-drawer md:w-[min(1020px,92vw)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            {/* 头部 */}
            <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wide text-brand-600">
                  {category?.name}
                </div>
                <h2 className="truncate text-base font-semibold text-slate-900">{effect.name}</h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="关闭详情"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-900/5 hover:text-slate-900"
              >
                <X size={18} />
              </button>
            </header>

            <p className="border-b border-slate-200 px-5 py-3 text-xs leading-relaxed text-slate-500">
              {effect.description}
            </p>

            {/* 主体：预览 + 源码 */}
            <div className="flex min-h-0 flex-1 flex-col md:flex-row">
              {/* 左：预览与参数 */}
              <div className="flex h-[46vh] shrink-0 flex-col border-b border-slate-200 md:h-auto md:w-[44%] md:border-b-0 md:border-r">
                <div className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-xs font-medium text-slate-500">实时预览</span>
                  <button
                    type="button"
                    onClick={() => setReplayKey((k) => k + 1)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 transition hover:bg-slate-900/5 hover:text-slate-900"
                  >
                    <RotateCcw size={13} />
                    重播
                  </button>
                </div>

                <div className="min-h-0 flex-1 bg-ink-850/50">
                  <DemoStage
                    demoId={effect.demo}
                    params={params}
                    replayKey={replayKey}
                    active
                  />
                </div>

                <div className="max-h-[38%] shrink-0 overflow-auto border-t border-slate-200 px-4 py-3">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <SlidersHorizontal size={13} />
                    参数调节
                  </div>
                  {effect.controls.length === 0 ? (
                    <p className="text-xs text-slate-400">该动效为静态风格，暂无可调参数</p>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {effect.controls.map((control) => (
                        <div key={control.key}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <label htmlFor={`ctrl-${control.key}`} className="text-slate-500">
                              {control.label}
                            </label>
                            <span className="font-mono text-[11px] text-brand-600">
                              {params[control.key]}
                            </span>
                          </div>

                          {control.type === 'range' ? (
                            <input
                              id={`ctrl-${control.key}`}
                              type="range"
                              className="control-range"
                              min={control.min}
                              max={control.max}
                              step={control.step}
                              value={params[control.key] ?? control.default}
                              onChange={(e) => updateParam(control.key, e.target.value, true)}
                            />
                          ) : (
                            <select
                              id={`ctrl-${control.key}`}
                              value={params[control.key] ?? control.default}
                              onChange={(e) => updateParam(control.key, e.target.value, false)}
                              className="w-full rounded-lg border border-slate-200 bg-ink-800 px-2.5 py-1.5 text-xs text-slate-700"
                            >
                              {control.options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 右：源码 */}
              <div className="flex min-h-0 flex-1 flex-col">
                <div role="tablist" aria-label="实现方式" className="flex gap-1 border-b border-slate-200 px-4 py-2">
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={tab === t.id}
                      onClick={() => setTab(t.id)}
                      className={
                        'rounded-lg px-3 py-1.5 text-xs transition ' +
                        (tab === t.id
                          ? 'bg-slate-900/10 text-slate-900'
                          : 'text-slate-500 hover:bg-slate-900/5 hover:text-slate-700')
                      }
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div className="min-h-0 flex-1 bg-ink-950/40">
                  <CodeBlock
                    code={effect.implementations[activeTab.id]}
                    language={activeTab.language}
                    onCopy={() => onCopy(effect.implementations[activeTab.id])}
                  />
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  )
}
