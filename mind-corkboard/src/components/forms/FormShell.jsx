import { motion, AnimatePresence } from 'framer-motion'

export default function FormShell({ open, title, subtitle, onClose, onSubmit, children, submitLabel = 'pin it' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[rgba(31,24,21,0.35)] p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.form
            className="paper-form relative max-h-[92vh] w-full max-w-lg overflow-y-auto"
            style={{
              background: '#F1E7C7',
              boxShadow: '0 16px 48px rgba(74,51,35,0.35), inset 0 0 0 1px rgba(74,51,35,0.15)',
            }}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            {/* washi tape accent */}
            <div
              className="absolute -top-2 left-1/2 h-4 w-24"
              style={{
                background: '#E4A5A5',
                opacity: 0.85,
                transform: 'translateX(-50%) rotate(-2deg)',
              }}
              aria-hidden="true"
            />

            <div className="px-6 pb-6 pt-8 sm:px-8">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl italic text-[#1F1815]">{title}</h2>
                  {subtitle && (
                    <p className="font-type mt-1 text-[0.7rem] text-[#6B4A2E]">{subtitle}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="font-type text-xs text-[#6B4A2E] underline-offset-2 hover:underline"
                >
                  close
                </button>
              </div>

              <div className="space-y-4">{children}</div>

              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="font-hand text-lg text-[#6B4A2E]"
                >
                  never mind
                </button>
                <button
                  type="submit"
                  className="font-hand px-5 py-2 text-xl text-[#F1E7C7]"
                  style={{
                    background: '#C8322E',
                    boxShadow: '2px 2px 0 rgba(74,51,35,0.25)',
                  }}
                >
                  {submitLabel}
                </button>
              </div>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Field({ label, children }) {
  return (
    <div>
      <label>{label}</label>
      {children}
    </div>
  )
}

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null)
      return
    }
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
