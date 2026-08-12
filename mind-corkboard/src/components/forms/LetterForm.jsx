import { useState } from 'react'
import FormShell, { Field, AddMore } from './FormShell'

const EMPTY = { title: '', body: '', signature: '', date: '', recipient: '' }

export default function LetterForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }))
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      variant="letter"
      title="letter"
      subtitle="a longer thought"
      onClose={onClose}
      onSubmit={() => {
        if (!form.title.trim() && !form.body.trim()) return
        onSubmit({ ...form })
        setForm({ ...EMPTY })
      }}
      submitLabel="seal and pin"
      submitIcon="seal"
    >
      <Field label="subject" labelStyle="hand">
        <input
          className="font-serif text-lg italic"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="the subject at hand"
          autoFocus
        />
      </Field>

      <Field label="body" labelStyle="hand" focal>
        <textarea
          className="font-hand text-xl"
          value={form.body}
          onChange={(e) => set('body', e.target.value)}
          placeholder="dear diary, or dear anyone..."
          rows={7}
        />
      </Field>

      <Field label="sign-off" labelStyle="type" breakAlign>
        <input
          className="font-hand text-xl"
          value={form.signature}
          onChange={(e) => set('signature', e.target.value)}
          placeholder="yours,"
        />
      </Field>

      <AddMore label="add date">
        <Field label="date" labelStyle="type">
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
        </Field>
        <Field label="to" labelStyle="type">
          <input
            value={form.recipient}
            onChange={(e) => set('recipient', e.target.value)}
            placeholder="to whom"
          />
        </Field>
      </AddMore>
    </FormShell>
  )
}
