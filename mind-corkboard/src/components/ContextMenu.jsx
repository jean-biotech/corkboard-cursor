import { AnimatePresence, motion } from 'framer-motion'
import { PIN_COLORS } from '../lib/store'

export default function ContextMenu({ open, x, y, onClose, onEdit, onDuplicate, onDelete, onPinColor }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <button type="button" className="fixed inset-0 z-[85]" onClick={onClose} aria-label="close menu" />
          <motion.div
            className="fixed z-[90] min-w-[160px] py-2"
            style={{
              left: x,
              top: y,
              background: '#F1E7C7',
              boxShadow: '3px 4px 16px rgba(74,51,35,0.3), inset 0 0 0 1px rgba(74,51,35,0.15)',
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {[
              ['Edit', onEdit],
              ['Duplicate', onDuplicate],
              ['Delete', onDelete],
            ].map(([label, fn]) => (
              <button
                key={label}
                type="button"
                className="font-hand block w-full px-4 py-1.5 text-left text-lg text-[#1E3A5F] hover:bg-[rgba(200,50,46,0.08)]"
                onClick={() => {
                  fn()
                  onClose()
                }}
              >
                {label}
              </button>
            ))}
            <div className="mx-3 my-2 border-t border-[#A08560]/30" />
            <p className="font-type px-4 pb-1 text-[0.55rem] tracking-wide text-[#6B4A2E]">
              pin color
            </p>
            <div className="flex gap-2 px-4 pb-1">
              {Object.entries(PIN_COLORS).map(([name, color]) => (
                <button
                  key={name}
                  type="button"
                  className="h-5 w-5 rounded-full"
                  style={{ background: color, boxShadow: '0 1px 3px rgba(0,0,0,0.25)' }}
                  aria-label={name}
                  onClick={() => {
                    onPinColor(name)
                    onClose()
                  }}
                />
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
