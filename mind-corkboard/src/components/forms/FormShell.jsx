import { useMemo, useState, useEffect, Children, isValidElement, cloneElement } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PushPin from '../decor/PushPin'

const VARIANT = {
  library: {
    maxW: 'max-w-[420px]',
    watermark: 'BIOBRIDGE LIBRARY',
    paperClass: 'library-card-form',
    dashed: true,
  },
  quote: {
    maxW: 'max-w-[400px]',
    watermark: 'commonplace',
    paperClass: 'form-ruled-page',
  },
  photo: {
    maxW: 'max-w-[460px]',
    watermark: 'developed',
    paperClass: 'form-manila',
    bg: '#E8DCB8',
    landscape: true,
  },
  note: {
    maxW: 'max-w-[320px]',
    watermark: null,
    paperClass: 'form-scrap',
    hideHeaderClose: true,
    hideNeverMind: true,
    compact: true,
  },
  postcard: {
    maxW: 'max-w-[520px]',
    watermark: null,
    paperClass: 'form-postcard',
    landscape: true,
  },
  letter: {
    maxW: 'max-w-[440px]',
    watermark: 'posted',
    paperClass: 'form-letter',
  },
  ticket: {
    maxW: 'max-w-[480px]',
    watermark: null,
    paperClass: 'form-ticket',
    landscape: true,
  },
  list: {
    maxW: 'max-w-[380px]',
    watermark: 'to remember',
    paperClass: 'form-notebook',
  },
  paper: {
    maxW: 'max-w-[420px]',
    watermark: 'mind corkboard',
    paperClass: '',
  },
}

/** Deterministic-ish pick from seed string */
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
    const rot = Math.random() * 6 - 3
    const ox = Math.random() * 36 - 18
    const oy = Math.random() * 28 - 10
    const shadowX = 6 + Math.random() * 10
    const shadowY = 10 + Math.random() * 12
    return { rot, ox, oy, shadowX, shadowY }
  }, [open, variant])

  const imperfectionSeed = useMemo(
    () => `${variant}-${Math.floor(Math.random() * 8)}`,
    [open, variant],
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const fn = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  const bg = paperColor || cfg.bg || '#F1E7C7'

  // Assign alternating / mixed label styles to Field children
  let fieldIdx = 0
  const styledChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child
    if (child.type === Field || child.props?.label != null) {
      const style = fieldIdx % 2 === 0 ? 'hand' : 'type'
      const offset = ['left', 'right', 'short', 'tilt', 'none'][fieldIdx % 5]
      fieldIdx += 1
      return cloneElement(child, {
        labelStyle: child.props.labelStyle || style,
        offset: child.props.offset || offset,
      })
    }
    return child
  })

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
            className={`paper-form relative h-full w-full overflow-visible sm:h-auto sm:max-h-[88vh] ${cfg.maxW} ${cfg.paperClass} ${className}`}
            style={{
              background: bg,
              boxShadow: `${layout.shadowX}px ${layout.shadowY}px 28px rgba(74,51,35,0.38)`,
              border: cfg.dashed
                ? '1.5px dashed rgba(74,51,35,0.4)'
                : '1px solid rgba(74,51,35,0.1)',
              marginLeft: layout.ox,
              marginTop: layout.oy,
              overflowY: 'auto',
            }}
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -40, scale: 1.04, rotate: layout.rot + 4 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: [ -40, 8, -2, 0 ],
                    scale: [1.04, 0.98, 1.01, 1],
                    rotate: layout.rot,
                  }
            }
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { duration: 0.55, times: [0, 0.55, 0.8, 1], ease: 'easeOut' }
            }
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit()
            }}
          >
            <div className="paper-grain pointer-events-none absolute inset-0" aria-hidden="true" />
            <PaperImperfections seed={imperfectionSeed} />
            <Throwaways seed={imperfectionSeed} variant={variant} />
            <VariantChrome variant={variant} />

            <div
              className={`relative z-[1] ${
                cfg.compact ? 'px-5 pb-5 pt-5' : 'px-5 pb-6 pt-7 sm:px-7'
              }`}
            >
              {topRight}

              {!hideDefaultHeader && (
                <div className="relative mb-4 flex items-start justify-between gap-2">
                  <div
                    className="flex items-start gap-2"
                    style={{ transform: 'rotate(-0.5deg)', marginLeft: '-4px' }}
                  >
                    <FormIcon variant={variant} />
                    <div style={{ marginTop: 2 }}>
                      {title && (
                        <h2
                          className="font-display leading-none text-[#1F1815]"
                          style={{ fontSize: '1.45rem', fontWeight: 400 }}
                        >
                          {title}
                        </h2>
                      )}
                      {subtitle && (
                        <p
                          className="font-type mt-1 text-[0.58rem] text-[#6B4A2E]"
                          style={{ transform: 'rotate(0.8deg)' }}
                        >
                          {subtitle}
                        </p>
                      )}
                      {headerExtra}
                    </div>
                  </div>
                  {!cfg.hideHeaderClose && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="font-hand text-base text-[#6B4A2E] underline-offset-2 hover:underline"
                      style={{ transform: 'rotate(3deg)' }}
                    >
                      close
                    </button>
                  )}
                </div>
              )}

              <div className="relative z-[1] space-y-3 sm:space-y-4">{styledChildren}</div>

              <div
                className="relative z-[1] mt-6 flex items-end justify-between gap-3"
                style={{ transform: 'rotate(-0.4deg)' }}
              >
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
                  style={{ transform: 'rotate(1.2deg)' }}
                >
                  <SubmitIcon kind={submitIcon} />
                  {submitLabel}
                </button>
              </div>
            </div>

            {cfg.watermark && (
              <div
                className="pointer-events-none absolute -right-2 bottom-8 select-none"
                style={{ transform: 'rotate(-14deg)', opacity: 0.14 }}
                aria-hidden="true"
              >
                <div className="border border-[#C8322E] px-2 py-0.5">
                  <p className="font-type text-[0.5rem] tracking-wide text-[#C8322E]">
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

function PaperImperfections({ seed }) {
  const set = [
    'coffee',
    'blot',
    'curl',
    'scribble',
    'test',
    'doodle',
    'eraser',
    'tear',
    'grease',
  ]
  // pick 3–4
  const chosen = []
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 17 + seed.charCodeAt(i)) >>> 0
  for (let i = 0; i < 4; i++) {
    chosen.push(set[(h + i * 3) % set.length])
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {chosen.includes('coffee') && (
        <svg
          className="absolute"
          style={{
            left: `${20 + (h % 40)}%`,
            top: `${40 + (h % 30)}%`,
            transform: `rotate(${(h % 40) - 20}deg)`,
            opacity: 0.14,
          }}
          width="52"
          height="52"
          viewBox="0 0 52 52"
        >
          <circle cx="26" cy="26" r="20" fill="none" stroke="#6B4A2E" strokeWidth="3" />
          <circle cx="27" cy="27" r="16" fill="none" stroke="#4A3323" strokeWidth="1.2" strokeDasharray="5 3" />
        </svg>
      )}
      {chosen.includes('blot') && (
        <svg
          className="absolute"
          style={{ right: '12%', top: '22%', opacity: 0.12 }}
          width="28"
          height="22"
          viewBox="0 0 28 22"
        >
          <ellipse cx="12" cy="10" rx="10" ry="7" fill="#1E3A5F" />
          <circle cx="22" cy="14" r="3" fill="#1E3A5F" />
          <circle cx="6" cy="16" r="2" fill="#1E3A5F" />
        </svg>
      )}
      {chosen.includes('curl') && (
        <div
          className="absolute bottom-0 right-0 h-12 w-12"
          style={{
            background: 'linear-gradient(225deg, transparent 46%, rgba(160,133,96,0.28) 46%)',
          }}
        />
      )}
      {chosen.includes('scribble') && (
        <svg
          className="absolute"
          style={{ left: '6%', bottom: '28%', opacity: 0.18, transform: 'rotate(-8deg)' }}
          width="48"
          height="20"
          viewBox="0 0 48 20"
        >
          <path d="M2 10 L44 8" stroke="#1E3A5F" strokeWidth="1.2" />
          <path d="M4 14 L40 12" stroke="#1E3A5F" strokeWidth="1" />
        </svg>
      )}
      {chosen.includes('test') && (
        <p
          className="font-hand absolute text-sm text-[#1E3A5F]"
          style={{
            left: '8%',
            top: '8%',
            opacity: 0.18,
            transform: 'rotate(-12deg)',
          }}
        >
          test test
        </p>
      )}
      {chosen.includes('doodle') && (
        <svg
          className="absolute"
          style={{ right: '18%', bottom: '14%', opacity: 0.3, transform: 'rotate(15deg)' }}
          width="16"
          height="16"
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
      {chosen.includes('eraser') && (
        <>
          <div
            className="absolute rounded-full bg-[#A08560]"
            style={{ left: '30%', top: '55%', width: 6, height: 4, opacity: 0.15 }}
          />
          <div
            className="absolute rounded-full bg-[#A08560]"
            style={{ left: '34%', top: '58%', width: 4, height: 3, opacity: 0.12 }}
          />
          <div
            className="absolute rounded-full bg-[#A08560]"
            style={{ left: '28%', top: '60%', width: 5, height: 3, opacity: 0.1 }}
          />
        </>
      )}
      {chosen.includes('tear') && (
        <svg
          className="absolute left-0 top-1/3"
          width="14"
          height="40"
          viewBox="0 0 14 40"
          style={{ opacity: 0.35 }}
        >
          <path d="M0 0 L8 8 L2 16 L10 24 L0 32 L6 40 L0 40 Z" fill="#F5EFE4" />
        </svg>
      )}
      {chosen.includes('grease') && (
        <div
          className="absolute rounded-full"
          style={{
            right: '28%',
            top: '35%',
            width: 36,
            height: 28,
            background: 'radial-gradient(ellipse, rgba(107,74,46,0.12), transparent 70%)',
            transform: 'rotate(20deg)',
          }}
        />
      )}
    </div>
  )
}

function Throwaways({ seed, variant }) {
  const kind = pick(seed + 't', ['clip', 'band', 'formno', 'approved', 'math', 'arrow'])

  return (
    <div className="pointer-events-none absolute inset-0 z-[3]" aria-hidden="true">
      {kind === 'clip' && (
        <svg
          className="absolute -top-2 left-8"
          width="18"
          height="36"
          viewBox="0 0 18 36"
          style={{ transform: 'rotate(-12deg)' }}
        >
          <path
            d="M9 4 V28 Q9 33 5 33 Q2 33 2 28 V12 Q2 8 6 8 Q10 8 10 14 V26"
            fill="none"
            stroke="#6B4A2E"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>
      )}
      {kind === 'band' && (
        <div
          className="absolute left-[15%] right-[15%] top-3 h-2"
          style={{
            background: 'rgba(200,50,46,0.25)',
            transform: 'rotate(-1.5deg)',
            boxShadow: '0 1px 2px rgba(74,51,35,0.15)',
          }}
        />
      )}
      {kind === 'formno' && (
        <div
          className="absolute right-8 top-10"
          style={{ transform: 'rotate(6deg)', opacity: 0.45 }}
        >
          <p className="font-type text-[0.55rem] text-[#6B4A2E] line-through">no. 47</p>
          <p className="font-hand text-base leading-none text-[#1E3A5F]">no. 48</p>
        </div>
      )}
      {kind === 'approved' && (
        <div
          className="absolute bottom-24 left-6 border border-[#5C7A4F] px-1.5 py-0.5"
          style={{ transform: 'rotate(-18deg)', opacity: 0.22 }}
        >
          <p className="font-type text-[0.55rem] tracking-wide text-[#5C7A4F]">
            {variant === 'ticket' ? 'ADMITTED' : 'APPROVED'}
          </p>
        </div>
      )}
      {kind === 'math' && (
        <p
          className="font-hand absolute text-sm text-[#1E3A5F]"
          style={{ right: '8%', top: '42%', opacity: 0.22, transform: 'rotate(8deg)', lineHeight: 1.1 }}
        >
          12+7=19?
        </p>
      )}
      {kind === 'arrow' && (
        <svg
          className="absolute"
          style={{ left: '4%', top: '50%', opacity: 0.35, transform: 'rotate(-20deg)' }}
          width="28"
          height="20"
          viewBox="0 0 28 20"
        >
          <path d="M2 14 Q12 4 22 10" fill="none" stroke="#1E3A5F" strokeWidth="1.3" />
          <path d="M18 6 L24 10 L18 14" fill="none" stroke="#1E3A5F" strokeWidth="1.3" />
        </svg>
      )}
    </div>
  )
}

function FormIcon({ variant }) {
  // Varied line weights / styles per variant
  if (variant === 'quote') {
    return (
      <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden="true" className="mt-0.5 shrink-0" style={{ transform: 'rotate(-8deg)' }}>
        <path d="M7 17 Q6 9 13 7" fill="none" stroke="#1E3A5F" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M13 7 Q16 15 11 21" fill="none" stroke="#1E3A5F" strokeWidth="1.1" />
        <ellipse cx="10" cy="22" rx="3.2" ry="1.8" fill="#1E3A5F" opacity="0.4" />
        <path d="M17 8 L20 5 L22 9" fill="none" stroke="#6B4A2E" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )
  }
  if (variant === 'photo') {
    return (
      <svg width="32" height="26" viewBox="0 0 32 26" aria-hidden="true" className="mt-0.5 shrink-0" style={{ transform: 'rotate(4deg)' }}>
        <path d="M3 8 L28 6.5 L29.5 21 L4.5 23 Z" fill="none" stroke="#4A3323" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M11 7.5 L13 3.5 H19 L21 7" fill="none" stroke="#4A3323" strokeWidth="1.1" />
        <circle cx="16" cy="14" r="4.2" fill="none" stroke="#1E3A5F" strokeWidth="1.6" />
        <circle cx="24" cy="10" r="1.4" fill="#C8322E" opacity="0.75" />
      </svg>
    )
  }
  if (variant === 'postcard') {
    return (
      <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden="true" className="mt-0.5 shrink-0" style={{ transform: 'rotate(-3deg)' }}>
        <rect x="1" y="2" width="26" height="16" fill="#E4A5A5" opacity="0.35" stroke="#4A3323" strokeWidth="1.1" />
        <path d="M14 2 V18" stroke="#A08560" strokeWidth="0.9" strokeDasharray="2 1.5" />
      </svg>
    )
  }
  if (variant === 'letter') {
    return (
      <svg width="30" height="22" viewBox="0 0 30 22" aria-hidden="true" className="mt-0.5 shrink-0" style={{ transform: 'rotate(6deg)' }}>
        <path d="M2 3 L28 2 L29 19 L3 20 Z" fill="#F1E7C7" stroke="#4A3323" strokeWidth="1.3" />
        <path d="M2.5 3.5 L15 12 L28.5 2.5" fill="none" stroke="#6B4A2E" strokeWidth="1.1" />
        <path d="M22 5 h5 v6 h-5 z" fill="none" stroke="#C8322E" strokeWidth="0.9" strokeDasharray="1.5 1" opacity="0.6" />
      </svg>
    )
  }
  if (variant === 'ticket') {
    return (
      <svg width="34" height="18" viewBox="0 0 34 18" aria-hidden="true" className="mt-0.5 shrink-0" style={{ transform: 'rotate(-5deg)' }}>
        <path d="M1 2 H26 L28 4 L26 6 L28 8 L26 10 L28 12 L26 14 L28 16 H1 Z" fill="#F1E7C7" stroke="#4A3323" strokeWidth="1.2" />
        <circle cx="5" cy="6" r="1.1" fill="#C9A876" />
        <circle cx="5" cy="12" r="1.1" fill="#C9A876" />
        <path d="M10 6 Q16 5 20 7" stroke="#1E3A5F" strokeWidth="0.9" fill="none" />
      </svg>
    )
  }
  if (variant === 'list') {
    return (
      <svg width="20" height="28" viewBox="0 0 20 28" aria-hidden="true" className="mt-0.5 shrink-0" style={{ transform: 'rotate(10deg)' }}>
        <path d="M7 1 L9 22" stroke="#6B4A2E" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 1 L14 4 L11 23 L4 20 Z" fill="#D4A82B" opacity="0.5" stroke="#6B4A2E" strokeWidth="0.9" />
        <path d="M9 22 L7 26" stroke="#1E3A5F" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  }
  if (variant === 'library') {
    return (
      <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden="true" className="mt-0.5 shrink-0" style={{ transform: 'rotate(-4deg)' }}>
        <path d="M4 2 H17 V23 H4 Z" fill="none" stroke="#4A3323" strokeWidth="1.4" />
        <path d="M7 2 V23" stroke="#6B4A2E" strokeWidth="1.1" />
        <path d="M10 7 H15" stroke="#1E3A5F" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M10 11 H14" stroke="#1E3A5F" strokeWidth="0.9" opacity="0.7" />
      </svg>
    )
  }
  return null
}

function SubmitIcon({ kind }) {
  if (kind === 'seal') {
    return (
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="9" r="6" fill="#C8322E" opacity="0.75" />
        <circle cx="10" cy="9" r="3.2" fill="none" stroke="#F1E7C7" strokeWidth="1" opacity="0.7" />
        <path d="M7 14 L6 19 L10 16 L14 19 L13 14" fill="#C8322E" opacity="0.55" />
      </svg>
    )
  }
  return <PushPin color="red" size={13} />
}

function VariantChrome({ variant }) {
  if (variant === 'library') {
    return (
      <>
        <div className="pointer-events-none absolute left-4 top-2 z-[2] flex gap-2.5" aria-hidden="true">
          <span className="block h-3 w-3 rounded-full border border-[#A08560]/50 bg-[#C9A876]/35" />
          <span className="block h-3 w-3 rounded-full border border-[#A08560]/45 bg-[#C9A876]/3" />
        </div>
        <div
          className="pointer-events-none absolute inset-y-3 right-0 w-7"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(160,133,96,0.1))' }}
          aria-hidden="true"
        />
      </>
    )
  }
  if (variant === 'quote') {
    return (
      <>
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 26px, rgba(74,51,35,0.13) 26px, rgba(74,51,35,0.13) 27px)',
            backgroundPosition: '0 44px',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-3 top-10 w-px bg-[#E4A5A5]/55"
          style={{ left: 28 }}
          aria-hidden="true"
        />
      </>
    )
  }
  if (variant === 'photo') {
    return (
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-6"
        style={{ background: 'linear-gradient(180deg, rgba(107,74,46,0.1), transparent)' }}
        aria-hidden="true"
      />
    )
  }
  if (variant === 'postcard') {
    return (
      <>
        <p
          className="font-type pointer-events-none absolute left-1/2 top-2 z-[2] -translate-x-1/2 text-[0.52rem] tracking-[0.18em] text-[#6B4A2E]/65"
          aria-hidden="true"
        >
          POSTCARD
        </p>
        <div
          className="pointer-events-none absolute -right-1 top-8 z-[2]"
          style={{ transform: 'rotate(16deg)', opacity: 0.32 }}
          aria-hidden="true"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#2C4A6B]">
            <p className="font-type text-center text-[0.4rem] leading-tight text-[#2C4A6B]">
              POST
              <br />
              MMXXVI
            </p>
          </div>
        </div>
      </>
    )
  }
  if (variant === 'letter') {
    return (
      <>
        <div className="pointer-events-none absolute inset-x-5 top-[34%] h-px bg-[#A08560]/22" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-5 top-[66%] h-px bg-[#A08560]/18" aria-hidden="true" />
      </>
    )
  }
  if (variant === 'ticket') {
    return (
      <div
        className="pointer-events-none absolute inset-y-0 left-0 flex w-4 flex-col items-center justify-around border-r border-dashed border-[#A08560]/45 bg-[#EDE0C4]/35 py-1"
        aria-hidden="true"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="block h-1.5 w-1.5 rounded-full bg-[#C9A876]" />
        ))}
      </div>
    )
  }
  if (variant === 'list') {
    return (
      <>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex w-6 flex-col items-center justify-around border-r border-[#A08560]/2 bg-[#E8DCB8]/35 py-3"
          aria-hidden="true"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <span
              key={i}
              className="block h-2 w-2 rounded-full border border-[#A08560]/5 bg-[#C9A876]/65"
            />
          ))}
        </div>
        <div
          className="pointer-events-none absolute bottom-0 right-0 top-0 opacity-45"
          style={{
            left: 24,
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 25px, rgba(184,203,218,0.5) 25px, rgba(184,203,218,0.5) 26px)',
            backgroundPosition: '0 50px',
          }}
          aria-hidden="true"
        />
      </>
    )
  }
  return null
}

const OFFSET_CLASS = {
  left: 'form-field-offset-left',
  right: 'form-field-offset-right',
  short: 'form-field-short',
  tilt: 'form-field-tilt',
  none: '',
}

export function Field({ label, children, labelStyle = 'hand', offset = 'none' }) {
  const labelClass = labelStyle === 'type' ? 'label-type' : 'label-hand'
  return (
    <div className={OFFSET_CLASS[offset] || ''}>
      {label ? <label className={labelClass}>{label}</label> : null}
      {children}
    </div>
  )
}

export function AddMore({ children, label = 'add more' }) {
  const [open, setOpen] = useState(false)
  const labelClass = label.length % 2 === 0 ? 'font-type text-[0.65rem]' : 'font-hand text-base'
  return (
    <div style={{ marginLeft: open ? 0 : '6%' }}>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`${labelClass} text-[#1E3A5F] underline-offset-2 hover:underline`}
          style={{ transform: 'rotate(-1deg)' }}
        >
          {label}
        </button>
      ) : (
        <div className="space-y-2 border-t border-dashed border-[#A08560]/3 pt-2">{children}</div>
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
