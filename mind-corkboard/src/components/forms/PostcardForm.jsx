import { useState } from 'react'
import FormShell, { Field, AddMore, readFileAsDataUrl } from './FormShell'

const EMPTY = {
  image: null,
  preset: 'coast',
  message: '',
  date: '',
  location: '',
  sentFrom: '',
}

export default function PostcardForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }))
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      title="wish you were here"
      subtitle="pin a memory"
      onClose={onClose}
      onSubmit={() => {
        onSubmit({ ...form })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin postcard"
    >
      <Field label="image">
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const url = await readFileAsDataUrl(e.target.files?.[0])
            set('image', url)
          }}
        />
        {!form.image && (
          <select
            className="mt-2"
            value={form.preset}
            onChange={(e) => set('preset', e.target.value)}
          >
            <option value="coast">coast light</option>
            <option value="forest">forest walk</option>
            <option value="city">city dusk</option>
            <option value="dusk">warm dusk</option>
          </select>
        )}
      </Field>
      <Field label="message">
        <textarea
          className="font-hand text-xl"
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="dear future me…"
          rows={3}
        />
      </Field>
      <AddMore>
        <Field label="location">
          <input
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
            placeholder="where were you"
          />
        </Field>
        <Field label="date">
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
        </Field>
        <Field label="sent from">
          <input
            className="font-hand text-lg"
            value={form.sentFrom}
            onChange={(e) => set('sentFrom', e.target.value)}
            placeholder="from…"
          />
        </Field>
      </AddMore>
    </FormShell>
  )
}
