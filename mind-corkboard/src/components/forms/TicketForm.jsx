import { useState } from 'react'
import FormShell, { Field, AddMore } from './FormShell'

const EMPTY = {
  eventName: '',
  date: '',
  venue: '',
  memory: '',
  seat: '',
  withWhom: '',
}

export default function TicketForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }))
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      variant="ticket"
      title="ticket booth"
      subtitle="pin a moment"
      onClose={onClose}
      onSubmit={() => {
        if (!form.eventName.trim()) return
        onSubmit({ ...form, eventName: form.eventName.trim() })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin ticket"
      className="pl-4"
    >
      <Field label="what was it" labelStyle="hand" focal>
        <input
          className="font-serif text-xl italic"
          value={form.eventName}
          onChange={(e) => set('eventName', e.target.value)}
          placeholder="concert, movie, show..."
          required
          autoFocus
        />
      </Field>

      <div className="grid grid-cols-2 gap-6">
        <Field label="when" labelStyle="type">
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
        </Field>
        <Field label="where" labelStyle="type">
          <input
            value={form.venue}
            onChange={(e) => set('venue', e.target.value)}
            placeholder="venue"
          />
        </Field>
      </div>

      <Field label="memory" labelStyle="hand" breakAlign>
        <input
          className="font-hand text-xl"
          value={form.memory}
          onChange={(e) => set('memory', e.target.value)}
          placeholder="what stays with you?"
        />
      </Field>

      <AddMore label="add seat / company">
        <Field label="seat" labelStyle="type">
          <input value={form.seat} onChange={(e) => set('seat', e.target.value)} placeholder="row…" />
        </Field>
        <Field label="with" labelStyle="type">
          <input
            className="font-hand text-lg"
            value={form.withWhom}
            onChange={(e) => set('withWhom', e.target.value)}
            placeholder="who was there"
          />
        </Field>
      </AddMore>
    </FormShell>
  )
}
