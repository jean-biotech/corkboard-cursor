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
      onClose={onClose}
      onSubmit={() => {
        if (!form.text.trim()) return
        onSubmit({ ...form, text: form.text.trim() })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin quote"
    >
      <Field label="the quote" focal>
        <textarea
          className="font-display text-lg italic"
          value={form.text}
          onChange={(e) => set('text', e.target.value)}
          placeholder="what did they say?"
          required
          autoFocus
          rows={3}
          style={{ backgroundImage: 'none', borderBottom: 'none' }}
        />
      </Field>

      <Field label="who said it">
        <input
          className="font-type text-[15px]"
          value={form.attribution}
          onChange={(e) => set('attribution', e.target.value)}
          placeholder="attribution"
        />
      </Field>

      <AddMore label="add source">
        <Field label="source">
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
