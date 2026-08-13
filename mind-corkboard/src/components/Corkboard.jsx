import { useCallback, useEffect, useRef, useState, lazy, Suspense } from 'react'
import CorkTexture from './CorkTexture'
import WoodFrame from './WoodFrame'
import { BoardDecorations } from './decor/Doodles'
import AddItemPopover from './AddItemPopover'
import BoardItem from './BoardItem'
import ContextMenu from './ContextMenu'
import ExpandedView from './ExpandedView'
import { playPinChime, useStore } from '../lib/store'
import { useBoardLayout } from '../lib/useBoardLayout'

const FORM_MAP = {
  book: lazy(() => import('./forms/BookForm')),
  quote: lazy(() => import('./forms/QuoteForm')),
  photo: lazy(() => import('./forms/PhotoForm')),
  note: lazy(() => import('./forms/NoteForm')),
  postcard: lazy(() => import('./forms/PostcardForm')),
  letter: lazy(() => import('./forms/LetterForm')),
  ticket: lazy(() => import('./forms/TicketForm')),
  list: lazy(() => import('./forms/ListForm')),
}

export default function Corkboard({ boardRef }) {
  const {
    board,
    soundEnabled,
    addItem,
    updateItem,
    moveItem,
    nudgeItems,
    bringToFront,
    duplicateItem,
    deleteItem,
    setPinColor,
  } = useStore()

  const layout = useBoardLayout()
  const surfaceRef = useRef(null)
  const [addMenu, setAddMenu] = useState(null)
  const [formType, setFormType] = useState(null)
  const [formPos, setFormPos] = useState({ xPct: 50, yPct: 50 })
  const [editingItem, setEditingItem] = useState(null)
  const [expanded, setExpanded] = useState(null)
  const [context, setContext] = useState(null)
  const [justPinnedId, setJustPinnedId] = useState(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [pinnedFlash, setPinnedFlash] = useState(false)
  const [corkSize, setCorkSize] = useState({ w: layout.corkWidth, h: layout.corkHeight })
  const ignoreBoardClickUntil = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const handler = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!surfaceRef.current) return
    const el = surfaceRef.current
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setCorkSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [layout.frameWidth, layout.frameHeight])

  useEffect(() => {
    if (!justPinnedId) return
    const t = setTimeout(() => setJustPinnedId(null), 600)
    return () => clearTimeout(t)
  }, [justPinnedId])

  const handleBoardClick = useCallback(
    (e) => {
      if (Date.now() < ignoreBoardClickUntil.current) return
      if (e.target.closest('[data-board-item]')) return
      if (e.target.closest('[data-add-popover]')) return

      const rect = surfaceRef.current.getBoundingClientRect()
      const xPct = ((e.clientX - rect.left) / rect.width) * 100
      const yPct = ((e.clientY - rect.top) / rect.height) * 100
      setAddMenu({ xPct, yPct })
      setContext(null)
    },
    [],
  )

  const openForm = (type, xPct, yPct, item = null) => {
    setFormType(type)
    setFormPos({ xPct, yPct })
    setEditingItem(item)
    setAddMenu(null)
    setExpanded(null)
  }

  const handleFormSubmit = (data) => {
    if (editingItem) {
      updateItem(editingItem.id, data)
      setEditingItem(null)
      setFormType(null)
      return
    }
    addItem(formType, formPos.xPct - 3, formPos.yPct - 2, data)
    setJustPinnedId('pending')
    if (soundEnabled) playPinChime()
    setPinnedFlash(true)
    setTimeout(() => setPinnedFlash(false), 1200)
    setFormType(null)
  }

  const prevCount = useRef(board.items.length)
  useEffect(() => {
    if (board.items.length > prevCount.current) {
      const newest = [...board.items].sort((a, b) => b.createdAt - a.createdAt)[0]
      if (newest) setJustPinnedId(newest.id)
    }
    prevCount.current = board.items.length
  }, [board.items])

  const FormComponent = formType ? FORM_MAP[formType] : null
  const { frameWidth, frameHeight, frameInset } = layout

  return (
    <>
      <div
        className="corkboard-slot mx-auto"
        style={{
          width: frameWidth,
          height: frameHeight,
          maxWidth: '100%',
        }}
      >
        <div
          ref={boardRef}
          className="corkboard-frame relative h-full w-full"
          style={{
            filter: 'drop-shadow(6px 20px 32px rgba(74, 51, 35, 0.32))',
            transform: 'rotate(-0.4deg)',
          }}
        >
          <WoodFrame />

          <div
            ref={surfaceRef}
            data-cork-surface
            className="cork-surface cork-surface-responsive absolute overflow-hidden"
            style={{
              left: frameInset,
              top: frameInset,
              right: frameInset,
              bottom: frameInset,
            }}
            onClick={handleBoardClick}
          >
            <CorkTexture />
            <div className="window-light" />
            <div className="grain-overlay" />
            <BoardDecorations />

            <div
              className="pointer-events-none absolute top-[5%] px-[2.5%] py-1.5"
              style={{
                left: '38%',
                background: '#F1E7C7',
                transform: 'rotate(-2.8deg)',
                boxShadow: '2px 3px 8px rgba(74,51,35,0.2)',
              }}
            >
              <p
                className="font-display font-medium italic text-[#1F1815]"
                style={{ fontSize: 'clamp(12px, 1.2cqw, 17px)' }}
              >
                {board.titleCard || board.name}
              </p>
            </div>

            {board.items.map((item) => (
              <BoardItem
                key={item.id}
                item={item}
                justPinned={justPinnedId === item.id}
                reduceMotion={reduceMotion}
                corkWidth={corkSize.w}
                corkHeight={corkSize.h}
                onMove={(id, nxPct, nyPct) => {
                  ignoreBoardClickUntil.current = Date.now() + 250
                  moveItem(id, nxPct, nyPct)
                  if (!reduceMotion && corkSize.w > 0) {
                    const nudges = {}
                    board.items.forEach((other) => {
                      if (other.id === id) return
                      const dxPct = other.xPct - nxPct
                      const dyPct = other.yPct - nyPct
                      const distPx = Math.hypot(
                        (dxPct / 100) * corkSize.w,
                        (dyPct / 100) * corkSize.h,
                      )
                      if (distPx < 90 && distPx > 0) {
                        const push = (90 - distPx) / 90
                        nudges[other.id] = {
                          dxPct: (dxPct / distPx) * push * 1.4,
                          dyPct: (dyPct / distPx) * push * 1.4,
                        }
                      }
                    })
                    if (Object.keys(nudges).length) nudgeItems(nudges)
                  }
                }}
                onSelect={(it) => {
                  bringToFront(it.id)
                  setExpanded(it)
                }}
                onEdit={(it) => openForm(it.type, it.xPct, it.yPct, it)}
                onContextMenu={(it, cx, cy) => {
                  bringToFront(it.id)
                  setContext({ item: it, x: cx, y: cy })
                }}
                onToggleListItem={(index) => {
                  const items = [...(item.data.items || [])]
                  items[index] = { ...items[index], done: !items[index].done }
                  updateItem(item.id, { items })
                }}
              />
            ))}

            {addMenu && (
              <AddItemPopover
                open
                xPct={addMenu.xPct}
                yPct={addMenu.yPct}
                corkWidth={corkSize.w}
                corkHeight={corkSize.h}
                onClose={() => setAddMenu(null)}
                onSelect={(type) => openForm(type, addMenu.xPct, addMenu.yPct)}
              />
            )}
          </div>
        </div>
      </div>

      {pinnedFlash && (
        <p className="font-hand pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 text-2xl text-[#C8322E]">
          pinned.
        </p>
      )}

      {FormComponent && (
        <Suspense fallback={null}>
          <FormComponent
            key={editingItem?.id || formType}
            open
            initial={editingItem?.data}
            onClose={() => {
              setFormType(null)
              setEditingItem(null)
            }}
            onSubmit={handleFormSubmit}
          />
        </Suspense>
      )}

      <ExpandedView
        item={expanded ? board.items.find((i) => i.id === expanded.id) || expanded : null}
        onClose={() => setExpanded(null)}
        onEdit={() => {
          if (expanded) openForm(expanded.type, expanded.xPct, expanded.yPct, expanded)
        }}
      />

      <ContextMenu
        open={!!context}
        x={context?.x ?? 0}
        y={context?.y ?? 0}
        onClose={() => setContext(null)}
        onEdit={() => {
          if (context) {
            openForm(context.item.type, context.item.xPct, context.item.yPct, context.item)
          }
        }}
        onDuplicate={() => {
          if (context) duplicateItem(context.item.id)
        }}
        onDelete={() => {
          if (context && window.confirm('take this down?')) {
            deleteItem(context.item.id)
          }
        }}
        onPinColor={(color) => {
          if (context) setPinColor(context.item.id, color)
        }}
      />
    </>
  )
}
