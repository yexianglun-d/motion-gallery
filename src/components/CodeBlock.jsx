import { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import { Copy } from 'lucide-react'

export default function CodeBlock({ code, language = 'jsx', onCopy }) {
  const codeRef = useRef(null)

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.textContent = code
      Prism.highlightElement(codeRef.current)
    }
  }, [code, language])

  return (
    <div className="relative h-full min-h-0">
      <button
        type="button"
        onClick={onCopy}
        className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-lg border border-white/10 bg-ink-700/90 px-2.5 py-1.5 text-xs text-slate-300 transition hover:bg-ink-600 hover:text-white"
      >
        <Copy size={13} />
        复制代码
      </button>
      <pre className="h-full overflow-auto p-4 pt-12">
        <code ref={codeRef} className={`language-${language}`} />
      </pre>
    </div>
  )
}
