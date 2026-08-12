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

      // Draw onto canvas with watermark + optional frame
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

      // hand-drawn frame
      const pad = 28
      ctx.drawImage(img, pad, pad, width - pad * 2, height - pad * 2)
      ctx.strokeStyle = '#4A3323'
      ctx.lineWidth = 8
      ctx.strokeRect(pad / 2, pad / 2, width - pad, height - pad)
      ctx.strokeStyle = '#6B4A2E'
      ctx.lineWidth = 2
      ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2)

      ctx.fillStyle = 'rgba(31,24,21,0.55)'
      ctx.font = '22px "Caveat", cursive'
      ctx.fillText('made on Mind Corkboard', width - 260, height - 18)

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
    <div className="flex flex-wrap items-center gap-3">
      <p className="font-hand text-base text-[#1E3A5F]/80">
        your board has {itemCount} pinned item{itemCount === 1 ? '' : 's'}
      </p>

      <button
        type="button"
        onClick={toggleSound}
        className="font-type text-[0.65rem] tracking-wide text-[#6B4A2E] underline-offset-2 hover:underline"
      >
        chime {soundEnabled ? 'on' : 'off'}
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          disabled={exporting}
          className="font-hand px-3 py-1 text-lg text-[#F1E7C7]"
          style={{ background: '#4A3323' }}
        >
          {exporting ? 'saving…' : 'save board as image'}
        </button>
        {open && (
          <div
            className="absolute right-0 top-full z-50 mt-1 min-w-[180px] py-2"
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
      {message && <span className="font-hand text-base text-[#5C7A4F]">{message}</span>}
    </div>
  )
}
