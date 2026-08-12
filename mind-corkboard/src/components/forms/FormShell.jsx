import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PushPin from '../decor/PushPin'

export default function FormShell({
  open,
  title,
  subtitle,
  onClose,
  onSubmit,
  children,
  submitLabel = 'pin it',
  variant = 'paper',
}) {
  const isLibrary = variant === 'library'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[rgba(31,24,21,0.32)] p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.form
            className={`paper-form relative max-h-[92vh] w-full overflow-y-auto ${
              isLibrary ? 'library-card-form max-w-md' : 'max-w-lg'
            }`}
            style={
              isLibrary
                ? undefined
                : {
                    background: '#F1E7C7',
                    boxShadow: '0 16px 48px rgba(74,51,35,0.32), inset 0 0 0 1px rgba(74,51,35,0.12)',
                  }
            }
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
            {!isLibrary && (
              <div
                className="absolute -top-2 left-1/2 h-4 w-24"
                style={{
                  background: '#E4A5A5',
                  opacity: 0.85,
                  transform: 'translateX(-50%) rotate(-2deg)',
                }}
                aria-hidden="true"
              />
            )}

            <div className={`relative ${isLibrary ? 'px-7 pb-6 pt-7 sm:px-8' : 'px-6 pb-6 pt-8 sm:px-8'}`}>
              {isLibrary && <LibraryCardChrome />}

              <div className="relative z-[1] mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-[1.65rem] italic text-[#1F1815]">{title}</h2>
                  {subtitle && (
                    <p className="font-type mt-1 text-[0.65rem] text-[#6B4A2E]">{subtitle}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="font-hand text-base text-[#6B4A2E] underline-offset-2 hover:underline"
                >
                  close
                </button>
              </div>

              <div className="relative z-[1] space-y-4">{children}</div>

              <div className="relative z-[1] mt-8 flex items-end justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="font-hand text-lg text-[#6B4A2E] underline-offset-2 hover:underline"
                >
                  never mind
                </button>
                <button
                  type="submit"
                  className="font-hand inline-flex items-center gap-1.5 text-2xl text-[#1E3A5F]"
                >
                  <PushPin color="red" size={14} />
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

function LibraryCardChrome() {
  return (
    <>
      {/* catalog rod holes */}
      <div className="pointer-events-none absolute left-5 top-3 flex gap-3" aria-hidden="true">
        <span className="block h-3.5 w-3.5 rounded-full border border-[#A08560]/50 bg-[#C9A876]/35 shadow-inner" />
        <span className="block h-3.5 w-3.5 rounded-full border border-[#A08560]/50 bg-[#C9A876]/35 shadow-inner" />
      </div>

      {/* DATE / NO. */}
      <div className="pointer-events-none absolute right-6 top-4 text-right" aria-hidden="true">
        <p className="font-label text-[0.58rem] tracking-wide text-[#6B4A2E]/55">
          date ________
        </p>
        <p className="font-label mt-0.5 text-[0.58rem] tracking-wide text-[#6B4A2E]/55">
          no. ____
        </p>
      </div>

      {/* library stamp */}
      <div
        className="pointer-events-none absolute bottom-16 right-5 select-none"
        style={{ transform: 'rotate(-12deg)', opacity: 0.15 }}
        aria-hidden="true"
      >
        <div
          className="px-2 py-1"
          style={{ border: '1.5px solid #C8322E', borderRadius: 2 }}
        >
          <p className="font-type text-[0.55rem] leading-tight tracking-wide text-[#C8322E]">
            BIOBRIDGE LIBRARY
          </p>
          <p className="font-type text-center text-[0.5rem] text-[#C8322E]">· MMXXVI ·</p>
        </div>
      </div>

      {/* paper crease */}
      <div
        className="pointer-events-none absolute inset-y-4 right-0 w-8"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(160,133,96,0.12))',
        }}
        aria-hidden="true"
      />
    </>
  )
}

export function Field({ label, children }) {
  return (
    <div>
      {label ? <label>{label}</label> : null}
      {children}
    </div>
  )
}

export function AddMore({ children, label = 'add more details' }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-hand text-base text-[#1E3A5F] underline-offset-2 hover:underline"
        >
          {label}
        </button>
      ) : (
        <div className="space-y-3 border-t border-dashed border-[#A08560]/35 pt-3">{children}</div>
      )}
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
