import { motion, AnimatePresence } from 'framer-motion'
import { ITEM_TYPES } from '../lib/store'

const ICONS = {
  book: (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect x="7" y="6" width="16" height="20" rx="1" fill="#6B4A2E" />
      <rect x="9" y="8" width="12" height="16" fill="#F1E7C7" />
      <path d="M11 12h8M11 15h6M11 18h7" stroke="#4A3323" strokeWidth="1" />
    </svg>
  ),
  quote: (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <path d="M8 12c0-3 2-5 5-5v4c-1 0-2 1-2 2h3v7H8v-8zm11 0c0-3 2-5 5-5v4c-1 0-2 1-2 2h3v7h-6v-8z" fill="#1E3A5F" />
    </svg>
  ),
  photo: (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect x="5" y="9" width="22" height="16" fill="#FAF6EE" stroke="#4A3323" strokeWidth="1.2" />
      <circle cx="12" cy="15" r="2" fill="#D4A82B" />
      <path d="M5 21l6-5 5 4 4-3 7 6" fill="#9AB5A0" opacity="0.7" />
    </svg>
  ),
  note: (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <path d="M8 6l14 1-1 18-14-2z" fill="#F1E7C7" stroke="#4A3323" strokeWidth="1" />
      <path d="M11 12h9M11 16h7M11 20h8" stroke="#1E3A5F" strokeWidth="1.2" />
    </svg>
  ),
  postcard: (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect x="4" y="9" width="24" height="14" fill="#E4A5A5" stroke="#4A3323" strokeWidth="1" />
      <rect x="21" y="11" width="5" height="6" fill="none" stroke="#C8322E" strokeWidth="1" strokeDasharray="2 1" />
      <path d="M7 18c3-2 6 0 9-2" stroke="#1E3A5F" strokeWidth="1.2" fill="none" />
    </svg>
  ),
  letter: (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect x="6" y="7" width="20" height="18" fill="#F1E7C7" stroke="#4A3323" strokeWidth="1" />
      <path d="M6 7l10 8 10-8" fill="none" stroke="#6B4A2E" strokeWidth="1.2" />
    </svg>
  ),
  ticket: (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <path d="M5 11h18v10H5z" fill="#F1E7C7" stroke="#4A3323" strokeWidth="1" />
      <circle cx="8" cy="16" r="1.2" fill="#C9A876" />
      <circle cx="8" cy="13" r="1.2" fill="#C9A876" />
      <circle cx="8" cy="19" r="1.2" fill="#C9A876" />
      <path d="M12 14h8M12 17h6" stroke="#1E3A5F" strokeWidth="1" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
      <rect x="8" y="6" width="16" height="20" fill="#F1E7C7" stroke="#4A3323" strokeWidth="1" />
      <circle cx="11" cy="11" r="1" fill="#1E3A5F" />
      <circle cx="11" cy="16" r="1" fill="#1E3A5F" />
      <circle cx="11" cy="21" r="1" fill="#1E3A5F" />
      <path d="M14 11h7M14 16h6M14 21h7" stroke="#1E3A5F" strokeWidth="1.1" />
    </svg>
  ),
}

export default function AddItemPopover({ open, x, y, onSelect, onClose }) {
  // Arrange 8 icons in a compass/circle
  const radius = 78
  const positions = ITEM_TYPES.map((type, i) => {
    const angle = (i / ITEM_TYPES.length) * Math.PI * 2 - Math.PI / 2
    return {
      ...type,
      dx: Math.cos(angle) * radius,
      dy: Math.sin(angle) * radius,
    }
  })

  return (
    <AnimatePresence>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60]"
            aria-label="close add menu"
            onClick={onClose}
          />
          <motion.div
            className="absolute z-[70]"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          >
            <div className="relative h-0 w-0">
              <div
                className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{
                  background: '#F1E7C7',
                  boxShadow: '0 4px 16px rgba(74,51,35,0.3), inset 0 0 0 1px rgba(74,51,35,0.15)',
                }}
              >
                <span className="font-hand text-2xl text-[#C8322E]" aria-hidden="true">
                  +
                </span>
              </div>

              {positions.map((p, i) => (
                <motion.button
                  key={p.id}
                  type="button"
                  className="group absolute flex w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: p.dx, top: p.dy }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, type: 'spring', stiffness: 400, damping: 20 }}
                  onClick={() => onSelect(p.id)}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                    style={{
                      background: '#F1E7C7',
                      boxShadow: '0 3px 10px rgba(74,51,35,0.25)',
                    }}
                  >
                    {ICONS[p.id]}
                  </span>
                  <span className="font-hand mt-0.5 text-sm text-[#1E3A5F] opacity-0 transition-opacity group-hover:opacity-100">
                    {p.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
