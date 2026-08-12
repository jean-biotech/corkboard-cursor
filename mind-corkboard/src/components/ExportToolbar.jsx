import { useState } from 'react'
import { toPng } from 'html-to-image'
import { useStore } from '../lib/store'

const FORMATS = [
  { id: 'board', label: 'full board', ratio: '16:9' },
  { id: 'portrait', label: 'portrait', ratio: '9:16' },
  { id: 'square', label: 'square', ratio: '1:1' },
]

export default function ExportToolbar({ boardRef }) {
  const { soundEnabled, toggleSound, itemCount } = useStore()
  const [open, setOpen] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [message, setMessage] = useState('')

  async function exportBoard(formatId) {
    if (!boardRef?.current) return
    setExporting(true)
    setMessage('')
    try {
      const node = boardRef.current
      const rect = node.getBoundingClientRect()
      let width = 1600
      let height = 900
      let cropX = 0
      let cropY = 0
      let cropW = rect.width
      let cropH = rect.height

      if (formatId === 'square') {
        width = 1400
        height = 1400
        const side = Math.min(rect.width, rect.height)
        cropX = (rect.width - side) / 2
        cropY = (rect.height - side) / 2
        cropW = side
        cropH = side
      } else if (formatId === 'portrait') {
        width = 1080
        height = 1920
        cropW = rect.height * (9 / 16)
        if (cropW > rect.width) {
          cropW = rect.width
          cropH = rect.width * (16 / 9)
          cropY = (rect.height - cropH) / 2
        } else {
          cropX = (rect.width - cropW) / 2
          cropH = rect.height
        }
      }

      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        width: cropW,
        height: cropH,
        style: {
          transform: `translate(${-cropX}px, ${-cropY}px)`,
          transformOrigin: 'top left',
        },
        filter: (el) => {
          if (!(el instanceof HTMLElement)) return true
          return !el.dataset?.noExport
        },
      })

      const img = new Image()
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = dataUrl
      })

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#F5EFE4'
      ctx.fillRect(0, 0, width, height)

      const pad = 28
      ctx.drawImage(img, pad, pad, width - pad * 2, height - pad * 2)
      ctx.strokeStyle = '#4A3323'
      ctx.lineWidth = 8
      ctx.strokeRect(pad / 2, pad / 2, width - pad, height - pad)
      ctx.strokeStyle = '#6B4A2E'
      ctx.lineWidth = 2
      ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2)

      ctx.fillStyle = 'rgba(31,24,21,0.55)'
      ctx.font = '26px "Reenie Beanie", cursive'
      ctx.fillText('made on Mind Corkboard', width - 250, height - 16)

      const link = document.createElement('a')
      link.download = `mind-corkboard-${formatId}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      setMessage('saved.')
      setOpen(false)
    } catch (err) {
      console.error(err)
      setMessage('could not export')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      {/* handwritten counter note */}
      <div
        className="px-3 py-1"
        style={{
          background: '#F1E7C7',
          transform: 'rotate(-2deg)',
          boxShadow: '1px 2px 5px rgba(74,51,35,0.15)',
        }}
      >
        <p className="font-hand text-lg leading-none text-[#1E3A5F]">
          {itemCount} thing{itemCount === 1 ? '' : 's'} pinned
        </p>
      </div>

      {/* bell toggle */}
      <button
        type="button"
        onClick={toggleSound}
        className="relative"
        aria-label={soundEnabled ? 'turn chime off' : 'turn chime on'}
        title={soundEnabled ? 'chime on' : 'chime off'}
        style={{ transform: 'rotate(3deg)' }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
          <path
            d="M14 4 C10 4 8 8 8 12 L7 18 H21 L20 12 C20 8 18 4 14 4 Z"
            fill="none"
            stroke="#1E3A5F"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M11 20 Q14 23 17 20" fill="none" stroke="#1E3A5F" strokeWidth="1.4" />
          <circle cx="14" cy="3.5" r="1.2" fill="#1E3A5F" />
          {!soundEnabled && (
            <path d="M5 6 L23 23" stroke="#C8322E" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {/* save as tag */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          disabled={exporting}
          className="font-hand relative px-3 py-1.5 text-lg text-[#1E3A5F]"
          style={{
            background: '#EDE0C4',
            transform: 'rotate(1.5deg)',
            boxShadow: '1px 2px 6px rgba(74,51,35,0.18)',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)',
          }}
        >
          {exporting ? 'saving…' : 'save as image'}
        </button>
        {/* string */}
        <svg
          className="pointer-events-none absolute -top-3 left-2"
          width="20"
          height="14"
          viewBox="0 0 20 14"
          aria-hidden="true"
        >
          <path d="M2 12 Q8 2 16 8" stroke="#6B4A2E" strokeWidth="1" fill="none" opacity="0.55" />
        </svg>
        {open && (
          <div
            className="absolute right-0 top-full z-50 mt-2 min-w-[170px] py-2"
            style={{
              background: '#F1E7C7',
              boxShadow: '2px 4px 14px rgba(74,51,35,0.25)',
            }}
          >
            {FORMATS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="font-hand block w-full px-4 py-1.5 text-left text-lg text-[#1E3A5F] hover:bg-[rgba(74,51,35,0.06)]"
                onClick={() => exportBoard(f.id)}
              >
                {f.label}
                <span className="font-type ml-2 text-[0.55rem] text-[#6B4A2E]">{f.ratio}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {message && <span className="font-hand text-lg text-[#5C7A4F]">{message}</span>}
    </div>
  )
}
