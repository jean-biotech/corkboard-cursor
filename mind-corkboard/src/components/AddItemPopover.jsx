import { motion, AnimatePresence } from 'framer-motion'
import { ITEM_TYPES } from '../lib/store'

/** Hand-drawn icons — sized ~56px (60% larger than prior 34px) */
function iconSvg(children) {
  return (
    <svg viewBox="0 0 36 36" width="56" height="56" aria-hidden="true">
      {children}
    </svg>
  )
}

const ICONS = {
  book: iconSvg(
    <>
      <path
        d="M9 7.5 Q10 6 12 6.5 L26 5.5 Q28 5.8 27.5 8 L26 28 Q25.5 30 23 29.5 L10 30.5 Q8 30 8.5 27.5 Z"
        fill="#F1E7C7"
        stroke="#4A3323"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M12 8.5 V28" stroke="#6B4A2E" strokeWidth="1.1" />
      <path d="M15 12 Q20 11 24 12.5" stroke="#1E3A5F" strokeWidth="1.1" fill="none" />
      <path d="M15 16 Q19 15.2 23 16.5" stroke="#1E3A5F" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M15 20 Q20 19.5 23.5 21" stroke="#1E3A5F" strokeWidth="1" fill="none" opacity="0.55" />
    </>,
  ),
  quote: iconSvg(
    <>
      <path
        d="M8 14 Q8 9 13 9 Q15 9 15 13 Q15 17 12 20 L10 22"
        fill="none"
        stroke="#1E3A5F"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M20 14 Q20 9 25 9 Q27 9 27 13 Q27 17 24 20 L22 22"
        fill="none"
        stroke="#1E3A5F"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="11" cy="13" r="1.4" fill="#1E3A5F" />
      <circle cx="23" cy="13" r="1.4" fill="#1E3A5F" />
    </>,
  ),
  photo: iconSvg(
    <>
      <path
        d="M6 10 L29 8.5 L30.5 25 L7.5 27 Z"
        fill="#FAF6EE"
        stroke="#4A3323"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M9 13 L27 12 L27.5 22 L9.5 23.5 Z" fill="#B8CBDA" opacity="0.55" />
      <circle cx="13" cy="16" r="1.8" fill="#D4A82B" opacity="0.8" />
      <path d="M10 22 L15 17.5 L19 20.5 L23 16 L27 21" fill="none" stroke="#5C7A4F" strokeWidth="1.2" />
    </>,
  ),
  note: iconSvg(
    <>
      <path
        d="M8 6 L27 5 L28 8 L26 10 L28 13 L25 16 L28 20 L26 24 L28 28 L9 30 L7 27 L9 24 L7 20 L9 16 L7 12 L9 8 Z"
        fill="#F1E7C7"
        stroke="#4A3323"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path d="M12 13 Q18 12 24 14" stroke="#1E3A5F" strokeWidth="1.2" fill="none" />
      <path d="M12 18 Q17 17 22 19" stroke="#1E3A5F" strokeWidth="1.1" fill="none" />
      <path d="M12 23 Q16 22.5 20 24" stroke="#1E3A5F" strokeWidth="1" fill="none" />
    </>,
  ),
  postcard: iconSvg(
    <>
      <path
        d="M5 11 L31 9.5 L32 25 L6 27 Z"
        fill="#E4A5A5"
        stroke="#4A3323"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <rect x="22" y="12" width="6" height="7" fill="none" stroke="#C8322E" strokeWidth="1" strokeDasharray="2 1.5" />
      <path d="M9 20 Q14 17 19 20" stroke="#1E3A5F" strokeWidth="1.2" fill="none" />
    </>,
  ),
  letter: iconSvg(
    <>
      <path
        d="M7 9 L29 8 L30 27 L8 28 Z"
        fill="#F1E7C7"
        stroke="#4A3323"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M7.5 9.5 L18 18 L29.5 8.5" fill="none" stroke="#6B4A2E" strokeWidth="1.2" />
      <path d="M12 22 Q18 21 24 23" stroke="#1E3A5F" strokeWidth="1" fill="none" opacity="0.5" />
    </>,
  ),
  ticket: iconSvg(
    <>
      <path
        d="M5 12 L24 11 L26 13 L24 15 L26 17 L24 19 L26 21 L24 23 L5 24 Z"
        fill="#F1E7C7"
        stroke="#4A3323"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="14.5" r="1.1" fill="#C9A876" />
      <circle cx="8.5" cy="18" r="1.1" fill="#C9A876" />
      <circle cx="8.5" cy="21.5" r="1.1" fill="#C9A876" />
      <path d="M13 15 Q18 14 21 15.5" stroke="#1E3A5F" strokeWidth="1" fill="none" />
      <path d="M13 19 Q17 18.2 20 19.5" stroke="#1E3A5F" strokeWidth="1" fill="none" />
    </>,
  ),
  list: iconSvg(
    <>
      <path d="M9 6 L26 5.5 L27 29 L10 30 Z" fill="#F1E7C7" stroke="#4A3323" strokeWidth="1.15" />
      <circle cx="13" cy="12" r="1.3" fill="none" stroke="#1E3A5F" strokeWidth="1.1" />
      <circle cx="13" cy="18" r="1.3" fill="none" stroke="#1E3A5F" strokeWidth="1.1" />
      <circle cx="13" cy="24" r="1.3" fill="none" stroke="#1E3A5F" strokeWidth="1.1" />
      <path d="M17 12 H24" stroke="#1E3A5F" strokeWidth="1.1" />
      <path d="M17 18 H23" stroke="#1E3A5F" strokeWidth="1.1" />
      <path d="M17 24 H24.5" stroke="#1E3A5F" strokeWidth="1.1" />
    </>,
  ),
}

/** ~320px diameter compass — radius keeps icons in a tight ring */
const RADIUS = 118

export default function AddItemPopover({ open, x, y, onSelect, onClose }) {
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
            data-add-popover
            className="absolute z-[70]"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 340, damping: 24 }}
          >
            <div className="relative h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2">
              {/* Soft cream paper circle */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(248,243,232,0.2) 0%, rgba(248,243,232,0.14) 50%, transparent 70%)',
                }}
                aria-hidden="true"
              />
              {/* Faint compass ring */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[236px] w-[236px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(42,58,46,0.08)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 bg-[rgba(42,58,46,0.06)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 bg-[rgba(42,58,46,0.06)]"
                aria-hidden="true"
              />

              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <span className="font-hand text-[32px] leading-none text-[#1E3A5F] opacity-70">+</span>
              </div>

              {ITEM_TYPES.map((type, i) => {
                const angle = -90 + i * 45
                const rad = (angle * Math.PI) / 180
                const dx = Math.cos(rad) * RADIUS
                const dy = Math.sin(rad) * RADIUS
                return (
                  <motion.button
                    key={type.id}
                    type="button"
                    className="group absolute left-1/2 top-1/2 flex w-[76px] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                    style={{ left: `calc(50% + ${dx}px)`, top: `calc(50% + ${dy}px)` }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.025, type: 'spring', stiffness: 360, damping: 22 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => onSelect(type.id)}
                  >
                    <span className="flex h-14 w-14 items-center justify-center drop-shadow-sm">
                      {ICONS[type.id]}
                    </span>
                    <span className="mt-2 font-hand text-[14px] leading-none text-[#1E3A5F] opacity-75 transition group-hover:opacity-100 group-hover:[text-shadow:0_0_0.3px_currentColor,0_0_0.3px_currentColor]">
                      {type.label}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
