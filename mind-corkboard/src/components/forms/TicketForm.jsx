import { useState } from 'react'
import FormShell, { Field } from './FormShell'

const EMPTY = {
  eventName: '',
  date: '',
  venue: '',
  seat: '',
  artist: '',
  memory: '',
}

export default function TicketForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }))
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      title="admit one"
      subtitle="pin a ticket"
      onClose={onClose}
      onSubmit={() => {
        if (!form.eventName.trim()) return
        onSubmit({ ...form, eventName: form.eventName.trim() })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin ticket"
    >
      <Field label="event">
        <input
          className="font-serif text-xl"
          value={form.eventName}
          onChange={(e) => set('eventName', e.target.value)}
          placeholder="concert, film, play…"
          required
          autoFocus
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="date">
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
        </Field>
        <Field label="venue">
          <input
            value={form.venue}
            onChange={(e) => set('venue', e.target.value)}
            placeholder="where"
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="artist / film">
          <input
            value={form.artist}
            onChange={(e) => set('artist', e.target.value)}
            placeholder="optional"
          />
        </Field>
        <Field label="seat">
          <input
            value={form.seat}
            onChange={(e) => set('seat', e.target.value)}
            placeholder="row, seat…"
          />
        </Field>
      </div>
      <Field label="one-line memory">
        <input
          className="font-hand text-lg"
          value={form.memory}
          onChange={(e) => set('memory', e.target.value)}
          placeholder="what you still hear"
        />
      </Field>
    </FormShell>
  )
}
