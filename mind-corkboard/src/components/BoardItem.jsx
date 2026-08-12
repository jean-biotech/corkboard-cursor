import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import BookCard from './items/BookCard'
import QuoteCard from './items/QuoteCard'
import PhotoCard from './items/PhotoCard'
import NoteCard from './items/NoteCard'
import PostcardCard from './items/PostcardCard'
import LetterCard from './items/LetterCard'
import TicketCard from './items/TicketCard'
import ListCard from './items/ListCard'
import { ITEM_CQW, pctDeltaFromDrag } from '../lib/boardCoords'

function renderCard(item, onToggleListItem) {
  switch (item.type) {
    case 'book':
      return <BookCard item={item} />
    case 'quote':
      return <QuoteCard item={item} />
    case 'photo':
      return <PhotoCard item={item} />
    case 'note':
      return <NoteCard item={item} />
    case 'postcard':
      return <PostcardCard item={item} />
    case 'letter':
      return <LetterCard item={item} />
    case 'ticket':
      return <TicketCard item={item} />
    case 'list':
      return <ListCard item={item} onToggleItem={onToggleListItem} />
    default:
      return null
  }
}

export default function BoardItem({
  item,
  justPinned,
  onMove,
  onSelect,
  onEdit,
  onContextMenu,
  onToggleListItem,
  reduceMotion,
  corkWidth,
  corkHeight,
}) {
  const didDrag = useRef(false)
  const longPressTimer = useRef(null)
  const mobileBoost = corkWidth > 0 && corkWidth < 520 ? 1.12 : 1
  const widthCqw = (ITEM_CQW[item.type] || 16) * mobileBoost

  useEffect(() => () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current)
  }, [])

  return (
    <motion.div
      data-board-item
      className={`absolute touch-none board-item-cursor ${reduceMotion ? '' : 'ambient-sway'}`}
      style={{
        left: `${item.xPct}%`,
        top: `${item.yPct}%`,
        width: `${widthCqw}cqw`,
        zIndex: item.z,
        '--base-rot': `${item.rotation}deg`,
        '--sway-delay': `${(item.z % 5) * 0.9}s`,
      }}
      initial={justPinned && !reduceMotion ? { scale: 1.12, opacity: 0.85 } : false}
      animate={
        justPinned && !reduceMotion
          ? { scale: [1.12, 0.96, 1.02, 1], opacity: 1 }
          : { opacity: 1 }
      }
      transition={
        justPinned
          ? { duration: 0.45, times: [0, 0.45, 0.75, 1] }
          : { duration: 0.2 }
      }
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.03,
              filter: 'drop-shadow(4px 8px 12px rgba(74,51,35,0.32))',
            }
      }
      drag
      dragMomentum={false}
      dragElastic={0.04}
      onPointerDown={(e) => {
        if (e.pointerType === 'touch') {
          const { clientX, clientY } = e
          longPressTimer.current = setTimeout(() => {
            onContextMenu(item, clientX, clientY)
          }, 550)
        }
      }}
      onPointerUp={() => {
        if (longPressTimer.current) clearTimeout(longPressTimer.current)
      }}
      onPointerCancel={() => {
        if (longPressTimer.current) clearTimeout(longPressTimer.current)
      }}
      onDragStart={() => {
        didDrag.current = true
        if (longPressTimer.current) clearTimeout(longPressTimer.current)
      }}
      onDragEnd={(_, info) => {
        const { dxPct, dyPct } = pctDeltaFromDrag(
          info.offset.x,
          info.offset.y,
          corkWidth,
          corkHeight,
        )
        onMove(item.id, item.xPct + dxPct, item.yPct + dyPct)
        requestAnimationFrame(() => {
          didDrag.current = false
        })
      }}
      onClick={(e) => {
        e.stopPropagation()
        if (didDrag.current) return
        onSelect(item)
      }}
      onDoubleClick={(e) => {
        e.stopPropagation()
        onEdit(item)
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onContextMenu(item, e.clientX, e.clientY)
      }}
    >
      <div
        className="relative w-full"
        style={{
          filter: 'drop-shadow(2px 3px 5px rgba(74,51,35,0.2))',
        }}
      >
        {renderCard(item, onToggleListItem)}
        {justPinned && !reduceMotion && (
          <span
            className="dust-puff pointer-events-none absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(212,183,136,0.7) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </motion.div>
  )
}
