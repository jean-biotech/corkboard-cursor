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
      title="commonplace"
      subtitle="pin a quote"
      onClose={onClose}
      onSubmit={() => {
        if (!form.text.trim()) return
        onSubmit({ ...form, text: form.text.trim() })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin quote"
    >
      <Field label="the quote" labelStyle="hand" offset="none">
        <textarea
          className="font-serif text-lg italic"
          value={form.text}
          onChange={(e) => set('text', e.target.value)}
          placeholder="what did they say?"
          required
          autoFocus
          rows={3}
          style={{ backgroundImage: 'none', borderBottom: 'none' }}
        />
        <svg width="64" height="10" viewBox="0 0 64 10" aria-hidden="true" className="mt-0.5 opacity-50">
          <path d="M1 6 Q18 2 36 7 T62 4" fill="none" stroke="#1E3A5F" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </Field>

      <Field label="who said it" labelStyle="type" offset="right">
        <input
          className="font-type text-sm"
          value={form.attribution}
          onChange={(e) => set('attribution', e.target.value)}
          placeholder="attribution"
        />
      </Field>

      <AddMore label="add source">
        <Field label="source" labelStyle="hand">
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
