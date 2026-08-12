import { useState } from 'react'
import FormShell, { Field, AddMore } from './FormShell'

const EMPTY = { title: '', body: '', signature: '' }

export default function LetterForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }))
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      title="longer thoughts"
      subtitle="pin a letter"
      onClose={onClose}
      onSubmit={() => {
        if (!form.title.trim() && !form.body.trim()) return
        onSubmit({ ...form })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin letter"
    >
      <Field label="title">
        <input
          className="font-serif text-xl italic"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="what is this about"
          autoFocus
        />
      </Field>
      <Field label="body">
        <textarea
          className="font-serif"
          value={form.body}
          onChange={(e) => set('body', e.target.value)}
          placeholder="take your time"
          rows={7}
        />
      </Field>
      <AddMore>
        <Field label="signature">
          <input
            className="font-hand text-xl"
            value={form.signature}
            onChange={(e) => set('signature', e.target.value)}
            placeholder="yours,"
          />
        </Field>
      </AddMore>
    </FormShell>
  )
}
