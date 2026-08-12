import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PushPin from '../decor/PushPin'

const VARIANT = {
  library: {
    maxW: 'max-w-md',
    watermark: 'BIOBRIDGE LIBRARY · MMXXVI',
    paperClass: 'library-card-form',
    dashed: true,
  },
  quote: {
    maxW: 'max-w-md',
    watermark: 'commonplace · MMXXVI',
    paperClass: 'form-ruled-page',
  },
  photo: {
    maxW: 'max-w-md',
    watermark: 'developed · MMXXVI',
    paperClass: 'form-manila',
    bg: '#E8DCB8',
  },
  note: {
    maxW: 'max-w-sm',
    watermark: null,
    paperClass: 'form-scrap',
    hideHeaderClose: true,
    hideNeverMind: true,
    compact: true,
  },
  postcard: {
    maxW: 'max-w-xl',
    watermark: null,
    paperClass: 'form-postcard',
  },
  letter: {
    maxW: 'max-w-lg',
    watermark: 'posted · MMXXVI',
    paperClass: 'form-letter',
  },
  ticket: {
    maxW: 'max-w-lg',
    watermark: null,
    paperClass: 'form-ticket',
  },
  list: {
    maxW: 'max-w-md',
    watermark: 'to remember · MMXXVI',
    paperClass: 'form-notebook',
  },
  paper: {
    maxW: 'max-w-lg',
    watermark: 'mind corkboard · MMXXVI',
    paperClass: '',
  },
}

export default function FormShell({
  open,
  title,
  subtitle,
  onClose,
  onSubmit,
  children,
  submitLabel = 'pin it',
  variant = 'paper',
  submitIcon = 'pin',
  headerExtra = null,
  paperColor,
  hideDefaultHeader = false,
  topRight = null,
  className = '',
}) {
  const cfg = VARIANT[variant] || VARIANT.paper
  const [reduceMotion, setReduceMotion] = useState(false)
  const restRot = useMemo(() => (Math.random() * 4 - 2), [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const fn = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const bg = paperColor || cfg.bg || '#F1E7C7'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[rgba(31,24,21,0.32)] p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.form
            className={`paper-form relative h-full w-full overflow-y-auto sm:h-auto sm:max-h-[92vh] ${cfg.maxW} ${cfg.paperClass} ${className}`}
            style={{
              background: bg,
              boxShadow: '0 18px 48px rgba(74,51,35,0.34)',
              border: cfg.dashed ? '1.5px dashed rgba(74,51,35,0.45)' : '1px solid rgba(74,51,35,0.12)',
            }}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.05, rotate: restRot + 3 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, rotate: restRot }
            }
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 12 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            <div className="paper-grain pointer-events-none absolute inset-0" aria-hidden="true" />

            <VariantChrome variant={variant} />

            <div
              className={`relative z-[1] ${
                cfg.compact ? 'px-5 pb-5 pt-5' : 'px-6 pb-7 pt-8 sm:px-8'
              }`}
            >
              {topRight}

              {!hideDefaultHeader && (
                <div className="relative mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <FormIcon variant={variant} />
                    <div>
                      {title && (
                        <h2 className="font-display text-[1.55rem] italic leading-tight text-[#1F1815]">
                          {title}
                        </h2>
                      )}
                      {subtitle && (
                        <p className="font-type mt-1 text-[0.62rem] text-[#6B4A2E]">{subtitle}</p>
                      )}
                      {headerExtra}
                    </div>
                  </div>
                  {!cfg.hideHeaderClose && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="font-hand text-base text-[#6B4A2E] underline-offset-2 hover:underline"
                    >
                      close
                    </button>
                  )}
                </div>
              )}

              <div className="relative z-[1] space-y-4">{children}</div>

              <div className="relative z-[1] mt-8 flex items-end justify-between gap-3">
                {!cfg.hideNeverMind ? (
                  <button
                    type="button"
                    onClick={onClose}
                    className="font-hand text-lg text-[#6B4A2E] underline-offset-2 hover:underline"
                  >
                    never mind
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  className="font-hand inline-flex items-center gap-1.5 text-2xl leading-none text-[#1E3A5F]"
                >
                  <SubmitIcon kind={submitIcon} />
                  {submitLabel}
                </button>
              </div>
            </div>

            {cfg.watermark && (
              <div
                className="pointer-events-none absolute bottom-5 left-5 select-none"
                style={{ transform: 'rotate(-8deg)', opacity: 0.15 }}
                aria-hidden="true"
              >
                <div className="border border-[#C8322E] px-2 py-0.5">
                  <p className="font-type text-[0.52rem] tracking-wide text-[#C8322E]">
                    {cfg.watermark}
                  </p>
                </div>
              </div>
            )}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function FormIcon({ variant }) {
  if (variant === 'quote') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" className="mt-1 shrink-0">
        <path d="M8 18 Q8 10 14 8" fill="none" stroke="#1E3A5F" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M14 8 Q16 14 12 20" fill="none" stroke="#1E3A5F" strokeWidth="1.3" />
        <ellipse cx="11" cy="21" rx="3.5" ry="2" fill="#1E3A5F" opacity="0.35" />
        <path d="M18 9 L20 7 L22 10 L19 12 Z" fill="#6B4A2E" opacity="0.55" />
      </svg>
    )
  }
  if (variant === 'photo') {
    return (
      <svg width="30" height="26" viewBox="0 0 30 26" aria-hidden="true" className="mt-1 shrink-0">
        <rect x="3" y="7" width="24" height="15" rx="1" fill="none" stroke="#4A3323" strokeWidth="1.3" />
        <path d="M10 7 L12 4 H18 L20 7" fill="none" stroke="#4A3323" strokeWidth="1.2" />
        <circle cx="15" cy="14.5" r="4" fill="none" stroke="#1E3A5F" strokeWidth="1.2" />
        <circle cx="23" cy="11" r="1.2" fill="#C8322E" opacity="0.7" />
      </svg>
    )
  }
  if (variant === 'postcard') {
    return (
      <svg width="28" height="22" viewBox="0 0 28 22" aria-hidden="true" className="mt-1 shrink-0">
        <rect x="1" y="2" width="26" height="18" fill="none" stroke="#4A3323" strokeWidth="1.2" />
        <path d="M14 2 V20" stroke="#A08560" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    )
  }
  if (variant === 'letter') {
    return (
      <svg width="30" height="24" viewBox="0 0 30 24" aria-hidden="true" className="mt-1 shrink-0">
        <rect x="2" y="4" width="26" height="16" fill="#F1E7C7" stroke="#4A3323" strokeWidth="1.2" />
        <path d="M2 4 L15 14 L28 4" fill="none" stroke="#6B4A2E" strokeWidth="1.2" />
      </svg>
    )
  }
  if (variant === 'ticket') {
    return (
      <svg width="32" height="20" viewBox="0 0 32 20" aria-hidden="true" className="mt-1 shrink-0">
        <path
          d="M2 3 H24 L26 5 L24 7 L26 9 L24 11 L26 13 L24 15 L26 17 H2 Z"
          fill="none"
          stroke="#4A3323"
          strokeWidth="1.2"
        />
        <circle cx="6" cy="7" r="1" fill="#C9A876" />
        <circle cx="6" cy="13" r="1" fill="#C9A876" />
      </svg>
    )
  }
  if (variant === 'list') {
    return (
      <svg width="22" height="28" viewBox="0 0 22 28" aria-hidden="true" className="mt-1 shrink-0">
        <path d="M8 2 L10 24" stroke="#6B4A2E" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 2 L14 4 L12 24 L6 22 Z" fill="#D4A82B" opacity="0.55" stroke="#6B4A2E" strokeWidth="0.8" />
        <path d="M10 24 L8 27" stroke="#1E3A5F" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    )
  }
  if (variant === 'library') {
    return (
      <svg width="24" height="28" viewBox="0 0 24 28" aria-hidden="true" className="mt-1 shrink-0">
        <path d="M5 3 H18 V25 H5 Z" fill="none" stroke="#4A3323" strokeWidth="1.2" />
        <path d="M8 3 V25" stroke="#6B4A2E" strokeWidth="1" />
        <path d="M11 8 H16" stroke="#1E3A5F" strokeWidth="1" />
        <path d="M11 12 H15" stroke="#1E3A5F" strokeWidth="1" opacity="0.7" />
      </svg>
    )
  }
  return null
}

function SubmitIcon({ kind }) {
  if (kind === 'seal') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="9" r="6" fill="#C8322E" opacity="0.75" />
        <circle cx="10" cy="9" r="3.5" fill="none" stroke="#F1E7C7" strokeWidth="1" opacity="0.7" />
        <path d="M7 14 L6 19 L10 16 L14 19 L13 14" fill="#C8322E" opacity="0.55" />
      </svg>
    )
  }
  return <PushPin color="red" size={14} />
}

function VariantChrome({ variant }) {
  if (variant === 'library') {
    return (
      <>
        <div className="pointer-events-none absolute left-5 top-3 z-[2] flex gap-3" aria-hidden="true">
          <span className="block h-3.5 w-3.5 rounded-full border border-[#A08560]/50 bg-[#C9A876]/35 shadow-inner" />
          <span className="block h-3.5 w-3.5 rounded-full border border-[#A08560]/50 bg-[#C9A876]/35 shadow-inner" />
        </div>
        <div className="pointer-events-none absolute right-6 top-4 z-[2] text-right" aria-hidden="true">
          <p className="font-label text-[0.58rem] tracking-wide text-[#6B4A2E]/55">date ________</p>
          <p className="font-label mt-0.5 text-[0.58rem] tracking-wide text-[#6B4A2E]/55">no. ____</p>
        </div>
        <div
          className="pointer-events-none absolute inset-y-4 right-0 w-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(160,133,96,0.12))' }}
          aria-hidden="true"
        />
      </>
    )
  }

  if (variant === 'quote') {
    return (
      <>
        {/* full-page ruled lines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 27px, rgba(74,51,35,0.14) 27px, rgba(74,51,35,0.14) 28px)',
            backgroundPosition: '0 48px',
          }}
          aria-hidden="true"
        />
        {/* margin line */}
        <div
          className="pointer-events-none absolute bottom-4 top-12 w-px bg-[#E4A5A5]/60"
          style={{ left: 36 }}
          aria-hidden="true"
        />
        {/* corner curl */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-10 w-10"
          style={{ background: 'linear-gradient(225deg, transparent 48%, rgba(160,133,96,0.2) 48%)' }}
          aria-hidden="true"
        />
      </>
    )
  }

  if (variant === 'photo') {
    return (
      <>
        {/* manila envelope flap hint */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-8"
          style={{
            background: 'linear-gradient(180deg, rgba(107,74,46,0.12), transparent)',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-4 top-10 h-14 w-10 border border-dashed border-[#6B4A2E]/35"
          style={{ transform: 'rotate(-4deg)' }}
          aria-hidden="true"
        />
      </>
    )
  }

  if (variant === 'postcard') {
    return (
      <>
        <p
          className="font-type pointer-events-none absolute left-1/2 top-3 z-[2] -translate-x-1/2 text-[0.58rem] tracking-[0.2em] text-[#6B4A2E]/70"
          aria-hidden="true"
        >
          POSTCARD
        </p>
        {/* postmark */}
        <div
          className="pointer-events-none absolute right-6 top-10 z-[2]"
          style={{ transform: 'rotate(12deg)', opacity: 0.35 }}
          aria-hidden="true"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2C4A6B]">
            <div className="text-center">
              <p className="font-type text-[0.45rem] text-[#2C4A6B]">POST</p>
              <p className="font-type text-[0.45rem] text-[#2C4A6B]">MMXXVI</p>
            </div>
          </div>
          <svg className="absolute -left-6 top-5" width="40" height="16" viewBox="0 0 40 16">
            <path d="M0 8 Q6 2 12 8 T24 8 T40 6" stroke="#2C4A6B" strokeWidth="1.4" fill="none" />
          </svg>
        </div>
      </>
    )
  }

  if (variant === 'letter') {
    return (
      <>
        {/* fold marks in thirds */}
        <div
          className="pointer-events-none absolute inset-x-6 top-1/3 h-px bg-[#A08560]/25"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-6 top-2/3 h-px bg-[#A08560]/2"
          aria-hidden="true"
        />
        {/* stamp corner */}
        <div
          className="pointer-events-none absolute right-5 top-5 h-12 w-10 border-2 border-dashed border-[#C8322E]/40"
          style={{ transform: 'rotate(6deg)' }}
          aria-hidden="true"
        >
          <p className="font-type mt-2 text-center text-[0.45rem] text-[#C8322E]/50">stamp</p>
        </div>
      </>
    )
  }

  if (variant === 'ticket') {
    return (
      <>
        {/* perforated left edge */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex w-5 flex-col items-center justify-around border-r border-dashed border-[#A08560]/50 bg-[#EDE0C4]/40 py-2"
          aria-hidden="true"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="block h-1.5 w-1.5 rounded-full bg-[#C9A876]" />
          ))}
        </div>
        <p
          className="font-type pointer-events-none absolute right-5 top-4 text-[0.55rem] text-[#6B4A2E]/55"
          aria-hidden="true"
        >
          no. 12847
        </p>
      </>
    )
  }

  if (variant === 'list') {
    return (
      <>
        {/* spiral holes */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex w-7 flex-col items-center justify-around border-r border-[#A08560]/25 bg-[#E8DCB8]/40 py-4"
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="block h-2.5 w-2.5 rounded-full border border-[#A08560]/55 bg-[#C9A876]/70"
            />
          ))}
        </div>
        {/* notebook lines */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0 opacity-50"
          style={{
            left: 28,
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 26px, rgba(184,203,218,0.55) 26px, rgba(184,203,218,0.55) 27px)',
            backgroundPosition: '0 56px',
          }}
          aria-hidden="true"
        />
        {/* red margin */}
        <div
          className="pointer-events-none absolute bottom-3 top-14 w-px bg-[#E4A5A5]/55"
          style={{ left: 42 }}
          aria-hidden="true"
        />
        {/* doodle star */}
        <svg
          className="pointer-events-none absolute right-6 bottom-20 opacity-40"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          aria-hidden="true"
        >
          <path
            d="M9 1.5 L10.5 6.5 L15.5 6.5 L11.5 9.5 L13 14.5 L9 11.5 L5 14.5 L6.5 9.5 L2.5 6.5 L7.5 6.5 Z"
            fill="none"
            stroke="#1E3A5F"
            strokeWidth="1"
          />
        </svg>
      </>
    )
  }

  return null
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
