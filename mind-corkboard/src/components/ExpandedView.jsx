import { motion, AnimatePresence } from 'framer-motion'
import BookCard from './items/BookCard'
import QuoteCard from './items/QuoteCard'
import PhotoCard from './items/PhotoCard'
import NoteCard from './items/NoteCard'
import PostcardCard from './items/PostcardCard'
import LetterCard from './items/LetterCard'
import TicketCard from './items/TicketCard'
import ListCard from './items/ListCard'
import Stars from './items/Stars'

function DetailPanel({ item }) {
  const { type, data } = item

  if (type === 'book') {
    const note = data.note || data.takeaway || data.review
    return (
      <div className="space-y-4">
        <div>
          <h2 className="font-serif text-4xl font-medium italic text-[#1F1815]">{data.title}</h2>
          <p className="font-type mt-1 text-sm text-[#6B4A2E]">{data.author}</p>
        </div>
        <Stars rating={data.rating || 0} size={22} />
        {note && (
          <p className="font-hand text-2xl text-[#1E3A5F] whitespace-pre-wrap">{note}</p>
        )}
        {data.dateRead && (
          <p className="font-type text-xs text-[#6B4A2E]">read {data.dateRead}</p>
        )}
      </div>
    )
  }

  if (type === 'quote') {
    return (
      <div>
        <p className="font-serif text-3xl italic leading-snug text-[#1F1815]">
          “{data.text}”
        </p>
        <p className="font-type mt-4 text-sm text-[#6B4A2E]">— {data.attribution}</p>
        {data.context && (
          <p className="font-hand mt-4 text-xl text-[#1E3A5F]">{data.context}</p>
        )}
      </div>
    )
  }

  if (type === 'letter') {
    return (
      <div>
        <h2 className="font-serif text-3xl font-medium">{data.title}</h2>
        <p className="font-serif mt-4 whitespace-pre-wrap text-lg leading-relaxed text-[#1F1815]/90">
          {data.body}
        </p>
        {data.signature && (
          <p className="font-hand mt-6 text-2xl text-[#1E3A5F]">{data.signature}</p>
        )}
      </div>
    )
  }

  if (type === 'postcard') {
    return (
      <div className="space-y-4">
        <PostcardCard item={item} showBack />
        <p className="font-hand text-xl text-[#1E3A5F]">{data.message}</p>
      </div>
    )
  }

  return null
}

function MiniPreview({ item }) {
  switch (item.type) {
    case 'book':
      return <BookCard item={item} compact />
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
      return <ListCard item={item} />
    default:
      return null
  }
}

export default function ExpandedView({ item, onClose, onEdit }) {
  const hasDetail = item && ['book', 'quote', 'letter', 'postcard'].includes(item.type)

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[75] flex items-center justify-center bg-[rgba(31,24,21,0.45)] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto p-6 sm:p-10"
            style={{
              background: '#F1E7C7',
              boxShadow: '0 20px 60px rgba(74,51,35,0.4)',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="font-type text-xs tracking-wide text-[#6B4A2E]">{item.type}</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="font-hand text-lg text-[#1E3A5F] underline-offset-2 hover:underline"
                  onClick={onEdit}
                >
                  edit
                </button>
                <button
                  type="button"
                  className="font-type text-xs text-[#6B4A2E]"
                  onClick={onClose}
                >
                  close
                </button>
              </div>
            </div>

            <div className={`flex flex-col gap-8 ${hasDetail ? 'sm:flex-row' : 'items-center'}`}>
              <div className="shrink-0" style={{ transform: `rotate(${item.rotation}deg)` }}>
                <MiniPreview item={item} />
              </div>
              {hasDetail && (
                <div className="min-w-0 flex-1">
                  <DetailPanel item={item} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
