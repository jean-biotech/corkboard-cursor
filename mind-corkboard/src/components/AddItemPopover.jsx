import { motion, AnimatePresence } from 'framer-motion'
import { ITEM_TYPES } from '../lib/store'

/** Hand-drawn wobbly icons — not crisp geometric UI glyphs */
const ICONS = {
  book: (
    <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden="true">
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
    </svg>
  ),
  quote: (
    <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden="true">
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
    </svg>
  ),
  photo: (
    <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden="true">
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
    </svg>
  ),
  note: (
    <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden="true">
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
    </svg>
  ),
  postcard: (
    <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden="true">
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
    </svg>
  ),
  letter: (
    <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden="true">
      <path
        d="M7 9 L29 8 L30 27 L8 28 Z"
        fill="#F1E7C7"
        stroke="#4A3323"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M7.5 9.5 L18 18 L29.5 8.5" fill="none" stroke="#6B4A2E" strokeWidth="1.2" />
      <path d="M12 22 Q18 21 24 23" stroke="#1E3A5F" strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  ),
  ticket: (
    <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden="true">
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
    </svg>
  ),
  list: (
    <svg viewBox="0 0 36 36" width="34" height="34" aria-hidden="true">
      <path
        d="M9 6 L26 5.5 L27 29 L10 30 Z"
        fill="#F1E7C7"
        stroke="#4A3323"
        strokeWidth="1.15"
      />
      <circle cx="13" cy="12" r="1.3" fill="none" stroke="#1E3A5F" strokeWidth="1.1" />
      <circle cx="13" cy="18" r="1.3" fill="none" stroke="#1E3A5F" strokeWidth="1.1" />
      <circle cx="13" cy="24" r="1.3" fill="none" stroke="#1E3A5F" strokeWidth="1.1" />
      <path d="M17 12 H24" stroke="#1E3A5F" strokeWidth="1.1" />
      <path d="M17 18 H23" stroke="#1E3A5F" strokeWidth="1.1" />
      <path d="M17 24 H24.5" stroke="#1E3A5F" strokeWidth="1.1" />
    </svg>
  ),
}

// Organic cluster offsets (not a perfect circle)
const CLUSTER = [
  { dx: 0, dy: -88 },
  { dx: 72, dy: -52 },
  { dx: 92, dy: 18 },
  { dx: 58, dy: 78 },
  { dx: -10, dy: 92 },
  { dx: -72, dy: 58 },
  { dx: -96, dy: -8 },
  { dx: -58, dy: -70 },
]

export default function AddItemPopover({ open, x, y, onSelect, onClose }) {
  const positions = ITEM_TYPES.map((type, i) => ({
    ...type,
    ...CLUSTER[i],
  }))

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
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
          >
            <div className="relative h-0 w-0">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                  <path
                    d="M5 14.2 Q14 13 23 14"
                    stroke="#1E3A5F"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 5 Q14.8 14 14.2 23"
                    stroke="#1E3A5F"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {positions.map((p, i) => (
                <motion.button
                  key={p.id}
                  type="button"
                  className="group absolute flex w-[70px] -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{
                    left: p.dx,
                    top: p.dy,
                    transform: `translate(-50%, -50%) rotate(${(i % 3 - 1) * 3}deg)`,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.025, type: 'spring', stiffness: 380, damping: 20 }}
                  onClick={() => onSelect(p.id)}
                >
                  <span className="relative transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110">
                    {ICONS[p.id]}
                    <svg
                      className="pointer-events-none absolute -right-3 -top-2 opacity-0 transition-opacity group-hover:opacity-100"
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 10 Q8 4 14 6"
                        stroke="#1E3A5F"
                        strokeWidth="1.3"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11 3 L15 6 L12 9"
                        stroke="#1E3A5F"
                        strokeWidth="1.3"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="font-hand mt-0.5 text-base leading-none text-[#1E3A5F]">
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
