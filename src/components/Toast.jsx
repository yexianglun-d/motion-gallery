import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function Toast({ message }) {
  return (
    <div className="pointer-events-none fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-ink-700 px-4 py-2.5 text-sm text-slate-800 shadow-card"
          >
            <CheckCircle2 size={16} className="text-aqua-500" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
