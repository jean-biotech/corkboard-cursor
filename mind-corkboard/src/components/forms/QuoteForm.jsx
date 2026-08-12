import { useState } from 'react'
import FormShell, { Field, AddMore } from './FormShell'

const EMPTY = { text: '', attribution: '', context: '' }

export default function QuoteForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }))
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      title="a few words"
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
          placeholder="words that stayed"
          required
          autoFocus
          rows={3}
        />
      </Field>
      <Field label="who said it">
        <input
          className="font-type text-sm"
          value={form.attribution}
          onChange={(e) => set('attribution', e.target.value)}
          placeholder="author, source"
        />
      </Field>
      <AddMore>
        <Field label="context">
          <input
            className="font-hand text-lg"
            value={form.context}
            onChange={(e) => set('context', e.target.value)}
            placeholder="why it hit"
          />
        </Field>
      </AddMore>
    </FormShell>
  )
}
