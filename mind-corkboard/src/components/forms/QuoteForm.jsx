import { useState } from 'react'
import FormShell, { Field, AddMore } from './FormShell'

const EMPTY = { text: '', attribution: '', context: '' }

export default function QuoteForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }))
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      variant="quote"
      title="commonplace book"
      subtitle="pin a quote"
      onClose={onClose}
      onSubmit={() => {
        if (!form.text.trim()) return
        onSubmit({ ...form, text: form.text.trim() })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin quote"
    >
      <Field label="the quote">
        <textarea
          className="font-serif text-lg italic"
          value={form.text}
          onChange={(e) => set('text', e.target.value)}
          placeholder="what did they say?"
          required
          autoFocus
          rows={4}
          style={{ backgroundImage: 'none', borderBottom: 'none' }}
        />
        {/* inked flourish */}
        <svg width="80" height="12" viewBox="0 0 80 12" aria-hidden="true" className="mt-1 opacity-60">
          <path
            d="M2 7 Q20 3 40 8 T78 5"
            fill="none"
            stroke="#1E3A5F"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </Field>

      <Field label="who said it">
        <input
          className="font-type text-sm"
          value={form.attribution}
          onChange={(e) => set('attribution', e.target.value)}
          placeholder="attribution"
        />
      </Field>

      <AddMore label="add source">
        <Field label="where it came from">
          <input
            className="font-hand text-lg"
            value={form.context}
            onChange={(e) => set('context', e.target.value)}
            placeholder="book, film, overheard…"
          />
        </Field>
      </AddMore>
    </FormShell>
  )
}
