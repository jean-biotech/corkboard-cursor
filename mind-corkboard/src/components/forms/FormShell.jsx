import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PushPin from '../decor/PushPin'

/** Size categories: small ~400×340, medium ~480×520, large ~520×620 */
const VARIANT = {
  library: {
    maxW: 'max-w-[480px]',
    watermark: 'BIOBRIDGE LIBRARY',
    paperClass: 'form-size-medium',
    dashed: true,
  },
  quote: {
    maxW: 'max-w-[400px]',
    watermark: 'commonplace',
    paperClass: 'form-size-small form-ruled-page',
  },
  photo: {
    maxW: 'max-w-[480px]',
    watermark: 'developed',
    paperClass: 'form-size-medium form-manila',
    bg: '#E8DCB8',
  },
  note: {
    maxW: 'max-w-[400px]',
    watermark: null,
    paperClass: 'form-size-small form-scrap',
    hideHeaderClose: true,
    hideNeverMind: true,
    compact: true,
  },
  postcard: {
    maxW: 'max-w-[480px]',
    watermark: null,
    paperClass: 'form-size-medium form-postcard',
  },
  letter: {
    maxW: 'max-w-[520px]',
    watermark: 'posted',
    paperClass: 'form-size-large form-letter',
  },
  ticket: {
    maxW: 'max-w-[400px]',
    watermark: null,
    paperClass: 'form-size-small form-ticket',
  },
  list: {
    maxW: 'max-w-[480px]',
    watermark: 'to remember',
    paperClass: 'form-size-medium form-notebook',
  },
  paper: {
    maxW: 'max-w-[480px]',
    watermark: 'mind corkboard',
    paperClass: 'form-size-medium',
  },
}

function pick(seed, arr) {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return arr[h % arr.length]
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

  const layout = useMemo(() => {
    const rot = Math.random() * 3 - 1.5
    const ox = Math.random() * 20 - 10
    const oy = Math.random() * 16 - 8
    return { rot, ox, oy, shadowX: 6, shadowY: 14 }
  }, [open, variant])

  const seed = useMemo(() => `${variant}-${Math.floor(Math.random() * 5)}`, [open, variant])

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
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[rgba(31,24,21,0.28)] p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.form
            className={`paper-form relative h-full w-full overflow-y-auto sm:h-auto sm:max-h-[90vh] ${cfg.maxW} ${cfg.paperClass} ${className}`}
            style={{
              background: bg,
              boxShadow: `${layout.shadowX}px ${layout.shadowY}px 32px rgba(74,51,35,0.32)`,
              border: cfg.dashed
                ? '1.5px dashed rgba(74,51,35,0.35)'
                : '1px solid rgba(74,51,35,0.1)',
              marginLeft: layout.ox,
              marginTop: layout.oy,
            }}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -28, scale: 1.02, rotate: layout.rot + 1.5 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: [ -28, 4, 0 ], scale: [1.02, 0.995, 1], rotate: layout.rot }
            }
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { duration: 0.45, times: [0, 0.65, 1], ease: 'easeOut' }
            }
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            <div className="paper-grain pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
            <PaperImperfections seed={seed} />
            <Throwaways seed={seed} variant={variant} />
            <VariantChrome variant={variant} />

            <div className={`relative z-[1] ${cfg.compact ? 'form-pad-compact' : 'form-pad'}`}>
              {topRight}

              {!hideDefaultHeader && (
                <div className="form-header mb-7 flex items-start gap-3">
                  <FormIcon variant={variant} />
                  <div className="min-w-0 flex-1">
                    {title && (
                      <h2
                        className="font-display leading-none text-[#1F1815]"
                        style={{ fontSize: '1.4rem', fontWeight: 400 }}
                      >
                        {title}
                      </h2>
                    )}
                    {subtitle && (
                      <p className="font-type mt-1.5 text-[0.6rem] text-[#6B4A2E]">{subtitle}</p>
                    )}
                    {headerExtra}
                  </div>
                  {!cfg.hideHeaderClose && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="font-hand shrink-0 text-base text-[#6B4A2E] underline-offset-2 hover:underline"
                    >
                      close
                    </button>
                  )}
                </div>
              )}

              <div className="form-fields relative z-[1]">{children}</div>

              <div className="form-actions relative z-[1] flex items-end justify-between gap-3">
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
                className="pointer-events-none absolute bottom-6 right-4 select-none"
                style={{ transform: 'rotate(-10deg)', opacity: 0.13 }}
                aria-hidden="true"
              >
                <div className="border border-[#C8322E] px-2 py-0.5">
                  <p className="font-type text-[0.48rem] tracking-wide text-[#C8322E]">
                    {cfg.watermark} · MMXXVI
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

/** Max 3 imperfections, muted */
function PaperImperfections({ seed }) {
  const pool = ['coffee', 'curl', 'blot', 'doodle', 'grease']
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 17 + seed.charCodeAt(i)) >>> 0
  const chosen = [pool[h % pool.length], pool[(h + 2) % pool.length], pool[(h + 4) % pool.length]]
  const unique = [...new Set(chosen)].slice(0, 3)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {unique.includes('coffee') && (
        <svg
          className="absolute"
          style={{ right: '18%', top: '58%', opacity: 0.1, transform: 'rotate(-12deg)' }}
          width="44"
          height="44"
          viewBox="0 0 52 52"
        >
          <circle cx="26" cy="26" r="20" fill="none" stroke="#6B4A2E" strokeWidth="2.5" />
        </svg>
      )}
      {unique.includes('blot') && (
        <svg
          className="absolute"
          style={{ left: '12%', top: '20%', opacity: 0.08 }}
          width="22"
          height="18"
          viewBox="0 0 28 22"
        >
          <ellipse cx="12" cy="10" rx="9" ry="6" fill="#1E3A5F" />
          <circle cx="20" cy="13" r="2.5" fill="#1E3A5F" />
        </svg>
      )}
      {unique.includes('curl') && (
        <div
          className="absolute bottom-0 right-0 h-10 w-10"
          style={{
            background: 'linear-gradient(225deg, transparent 48%, rgba(160,133,96,0.18) 48%)',
          }}
        />
      )}
      {unique.includes('doodle') && (
        <svg
          className="absolute"
          style={{ right: '14%', bottom: '22%', opacity: 0.28, transform: 'rotate(12deg)' }}
          width="14"
          height="14"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 1 L9.5 5.5 L14 5.5 L10.5 8.5 L12 13 L8 10.5 L4 13 L5.5 8.5 L2 5.5 L6.5 5.5 Z"
            fill="none"
            stroke="#1E3A5F"
            strokeWidth="1"
          />
        </svg>
      )}
      {unique.includes('grease') && (
        <div
          className="absolute rounded-full"
          style={{
            left: '22%',
            bottom: '30%',
            width: 28,
            height: 22,
            background: 'radial-gradient(ellipse, rgba(107,74,46,0.08), transparent 70%)',
          }}
        />
      )}
    </div>
  )
}

/** Max 2 throwaways, quiet */
function Throwaways({ seed, variant }) {
  const primary = pick(seed + 'a', ['clip', 'formno', 'approved', 'none'])
  const secondary = pick(seed + 'b', ['arrow', 'math', 'none'])
  const kinds = [primary, secondary].filter((k) => k !== 'none').slice(0, 2)

  return (
    <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden="true">
      {kinds.includes('clip') && (
        <svg
          className="absolute left-10 top-0"
          width="14"
          height="28"
          viewBox="0 0 18 36"
          style={{ transform: 'rotate(-8deg)', opacity: 0.5 }}
        >
          <path
            d="M9 4 V28 Q9 33 5 33 Q2 33 2 28 V12 Q2 8 6 8 Q10 8 10 14 V26"
            fill="none"
            stroke="#6B4A2E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      {kinds.includes('formno') && (
        <div
          className="absolute right-10 top-12"
          style={{ transform: 'rotate(4deg)', opacity: 0.35 }}
        >
          <p className="font-type text-[0.5rem] text-[#6B4A2E] line-through">no. 47</p>
          <p className="font-hand text-sm leading-none text-[#1E3A5F]">no. 48</p>
        </div>
      )}
      {kinds.includes('approved') && (
        <div
          className="absolute bottom-28 left-8 border border-[#5C7A4F] px-1.5 py-0.5"
          style={{ transform: 'rotate(-12deg)', opacity: 0.18 }}
        >
          <p className="font-type text-[0.5rem] tracking-wide text-[#5C7A4F]">
            {variant === 'ticket' ? 'ADMITTED' : 'APPROVED'}
          </p>
        </div>
      )}
      {kinds.includes('arrow') && (
        <svg
          className="absolute left-5 top-[48%]"
          width="22"
          height="16"
          viewBox="0 0 28 20"
          style={{ opacity: 0.28, transform: 'rotate(-8deg)' }}
        >
          <path d="M2 14 Q12 4 22 10" fill="none" stroke="#1E3A5F" strokeWidth="1.2" />
          <path d="M18 6 L24 10 L18 14" fill="none" stroke="#1E3A5F" strokeWidth="1.2" />
        </svg>
      )}
      {kinds.includes('math') && (
        <p
          className="font-hand absolute text-xs text-[#1E3A5F]"
          style={{ right: '10%', top: '45%', opacity: 0.22, transform: 'rotate(4deg)' }}
        >
          12+7
        </p>
      )}
    </div>
  )
}

function FormIcon({ variant }) {
  const wrap = { transform: 'scale(0.6)', transformOrigin: 'top left', opacity: 0.55, flexShrink: 0 }
  if (variant === 'quote') {
    return (
      <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden="true" style={wrap}>
        <path d="M7 17 Q6 9 13 7" fill="none" stroke="#1E3A5F" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M13 7 Q16 15 11 21" fill="none" stroke="#1E3A5F" strokeWidth="1.1" />
        <ellipse cx="10" cy="22" rx="3" ry="1.6" fill="#1E3A5F" opacity="0.35" />
      </svg>
    )
  }
  if (variant === 'photo') {
    return (
      <svg width="32" height="26" viewBox="0 0 32 26" aria-hidden="true" style={wrap}>
        <path d="M3 8 L28 6.5 L29.5 21 L4.5 23 Z" fill="none" stroke="#4A3323" strokeWidth="1.4" />
        <circle cx="16" cy="14" r="4" fill="none" stroke="#1E3A5F" strokeWidth="1.4" />
        <circle cx="24" cy="10" r="1.2" fill="#C8322E" opacity="0.6" />
      </svg>
    )
  }
  if (variant === 'postcard') {
    return (
      <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true" style={wrap}>
        <rect x="1" y="2" width="26" height="16" fill="none" stroke="#4A3323" strokeWidth="1.1" />
        <path d="M14 2 V18" stroke="#A08560" strokeWidth="0.9" strokeDasharray="2 1.5" />
      </svg>
    )
  }
  if (variant === 'letter') {
    return (
      <svg width="30" height="22" viewBox="0 0 30 22" aria-hidden="true" style={wrap}>
        <path d="M2 3 L28 2 L29 19 L3 20 Z" fill="none" stroke="#4A3323" strokeWidth="1.2" />
        <path d="M2.5 3.5 L15 12 L28.5 2.5" fill="none" stroke="#6B4A2E" strokeWidth="1.1" />
      </svg>
    )
  }
  if (variant === 'ticket') {
    return (
      <svg width="34" height="18" viewBox="0 0 34 18" aria-hidden="true" style={wrap}>
        <path d="M1 2 H26 L28 4 L26 6 L28 8 L26 10 L28 12 L26 14 L28 16 H1 Z" fill="none" stroke="#4A3323" strokeWidth="1.2" />
        <circle cx="5" cy="6" r="1" fill="#C9A876" />
        <circle cx="5" cy="12" r="1" fill="#C9A876" />
      </svg>
    )
  }
  if (variant === 'list') {
    return (
      <svg width="20" height="28" viewBox="0 0 20 28" aria-hidden="true" style={wrap}>
        <path d="M7 1 L9 22" stroke="#6B4A2E" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 1 L14 4 L11 23 L4 20 Z" fill="#D4A82B" opacity="0.4" stroke="#6B4A2E" strokeWidth="0.9" />
      </svg>
    )
  }
  if (variant === 'library') {
    return (
      <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden="true" style={wrap}>
        <path d="M4 2 H17 V23 H4 Z" fill="none" stroke="#4A3323" strokeWidth="1.3" />
        <path d="M7 2 V23" stroke="#6B4A2E" strokeWidth="1" />
        <path d="M10 7 H15" stroke="#1E3A5F" strokeWidth="1.1" />
      </svg>
    )
  }
  return null
}

function SubmitIcon({ kind }) {
  if (kind === 'seal') {
    return (
      <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="9" r="6" fill="#C8322E" opacity="0.7" />
        <circle cx="10" cy="9" r="3" fill="none" stroke="#F1E7C7" strokeWidth="1" opacity="0.65" />
      </svg>
    )
  }
  return <PushPin color="red" size={12} />
}

function VariantChrome({ variant }) {
  if (variant === 'library') {
    return (
      <div className="pointer-events-none absolute left-8 top-5 z-[2] flex gap-2" aria-hidden="true" style={{ opacity: 0.5 }}>
        <span className="block h-2.5 w-2.5 rounded-full border border-[#A08560]/45 bg-[#C9A876]/3" />
        <span className="block h-2.5 w-2.5 rounded-full border border-[#A08560]/4 bg-[#C9A876]/25" />
      </div>
    )
  }
  if (variant === 'quote') {
    return (
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.28,
          backgroundImage:
            'repeating-linear-gradient(transparent, transparent 28px, rgba(74,51,35,0.12) 28px, rgba(74,51,35,0.12) 29px)',
          backgroundPosition: '0 72px',
        }}
        aria-hidden="true"
      />
    )
  }
  if (variant === 'postcard') {
    return (
      <p
        className="font-type pointer-events-none absolute left-1/2 top-4 z-[2] -translate-x-1/2 text-[0.5rem] tracking-[0.16em] text-[#6B4A2E]"
        style={{ opacity: 0.55 }}
        aria-hidden="true"
      >
        POSTCARD
      </p>
    )
  }
  if (variant === 'letter') {
    return (
      <>
        <div className="pointer-events-none absolute inset-x-12 top-[36%] h-px bg-[#A08560]/18" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-12 top-[64%] h-px bg-[#A08560]/14" aria-hidden="true" />
      </>
    )
  }
  if (variant === 'ticket') {
    return (
      <div
        className="pointer-events-none absolute inset-y-0 left-0 flex w-3.5 flex-col items-center justify-around border-r border-dashed border-[#A08560]/35 bg-[#EDE0C4]/25 py-2"
        aria-hidden="true"
        style={{ opacity: 0.7 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="block h-1 w-1 rounded-full bg-[#C9A876]" />
        ))}
      </div>
    )
  }
  if (variant === 'list') {
    return (
      <>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex w-5 flex-col items-center justify-around border-r border-[#A08560]/2 bg-[#E8DCB8]/25 py-4"
          aria-hidden="true"
          style={{ opacity: 0.65 }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="block h-1.5 w-1.5 rounded-full border border-[#A08560]/4 bg-[#C9A876]/5" />
          ))}
        </div>
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0"
          style={{
            left: 20,
            opacity: 0.35,
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 28px, rgba(184,203,218,0.45) 28px, rgba(184,203,218,0.45) 29px)',
            backgroundPosition: '0 72px',
          }}
          aria-hidden="true"
        />
      </>
    )
  }
  return null
}

/**
 * labelStyle: 'hand' for core fields, 'type' for secondary
 * breakAlign: optional intentional offset (one per form max)
 */
export function Field({ label, children, labelStyle = 'hand', breakAlign = false, focal = false }) {
  return (
    <div
      className={`form-field ${focal ? 'form-field-focal' : ''} ${breakAlign ? 'form-field-break' : ''}`}
    >
      {label ? (
        <label className={labelStyle === 'type' ? 'label-type' : 'label-hand'}>{label}</label>
      ) : null}
      {children}
    </div>
  )
}

export function AddMore({ children, label = 'add more' }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="form-field">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-type text-[0.65rem] text-[#1E3A5F] underline-offset-2 hover:underline"
        >
          {label}
        </button>
      ) : (
        <div className="form-fields border-t border-dashed border-[#A08560]/25 pt-4">{children}</div>
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
