import { useState } from 'react'
import { toPng } from 'html-to-image'

const FORMATS = [
  { id: 'board', label: 'full board', ratio: '16:9' },
  { id: 'portrait', label: 'portrait', ratio: '9:16' },
  { id: 'square', label: 'square', ratio: '1:1' },
]

/** Compact save control for corkboard corner — no bell, no pin counter */
export default function ExportToolbar({ boardRef }) {
  const [open, setOpen] = useState(false)
  const [exporting, setExporting] = useState(false)

  async function exportBoard(formatId) {
    if (!boardRef?.current) return
    setExporting(true)
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

      ctx.fillStyle = 'rgba(31,24,21,0.55)'
      ctx.font = '26px "Reenie Beanie", cursive'
      ctx.fillText('made on Mind Corkboard', width - 250, height - 16)

      const link = document.createElement('a')
      link.download = `mind-corkboard-${formatId}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      setOpen(false)
    } catch (err) {
      console.error(err)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="relative" data-no-export>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={exporting}
        className="font-hand px-2 py-0.5 text-[13px] leading-none text-[#1E3A5F]"
        style={{
          background: 'rgba(241,231,199,0.78)',
          transform: 'rotate(1deg)',
          boxShadow: '1px 1px 3px rgba(74,51,35,0.12)',
        }}
      >
        {exporting ? 'saving…' : 'save as image'}
      </button>
      {open && (
        <div
          className="absolute bottom-full right-0 z-50 mb-1.5 min-w-[150px] py-1.5"
          style={{
            background: '#F1E7C7',
            boxShadow: '2px 3px 10px rgba(74,51,35,0.22)',
          }}
        >
          {FORMATS.map((f) => (
            <button
              key={f.id}
              type="button"
              className="font-hand block w-full px-3 py-1 text-left text-[15px] text-[#1E3A5F] hover:bg-[rgba(74,51,35,0.06)]"
              onClick={() => exportBoard(f.id)}
            >
              {f.label}
              <span className="font-type ml-2 text-[9px] text-[#6B4A2E]">{f.ratio}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
