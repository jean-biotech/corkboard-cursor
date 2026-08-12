import { useState } from 'react'
import FormShell, { Field, readFileAsDataUrl } from './FormShell'

const EMPTY = {
  image: null,
  preset: 'coast',
  date: '',
  location: '',
  sentFrom: '',
  message: '',
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
      <div
        className="grid gap-4 border border-[#A08560]/30 p-4 sm:grid-cols-2"
        style={{ background: 'rgba(255,255,255,0.15)' }}
      >
        <div>
          <p className="font-type mb-2 text-[0.6rem] tracking-wide text-[#6B4A2E]">FRONT</p>
          <Field label="upload image">
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const url = await readFileAsDataUrl(e.target.files?.[0])
                set('image', url)
              }}
            />
          </Field>
          <Field label="or choose a scene">
            <select value={form.preset} onChange={(e) => set('preset', e.target.value)}>
              <option value="coast">coast light</option>
              <option value="forest">forest walk</option>
              <option value="city">city dusk</option>
              <option value="dusk">warm dusk</option>
            </select>
          </Field>
        </div>
        <div>
          <p className="font-type mb-2 text-[0.6rem] tracking-wide text-[#6B4A2E]">BACK</p>
          <Field label="to / from">
            <input
              className="font-hand text-lg"
              value={form.sentFrom}
              onChange={(e) => set('sentFrom', e.target.value)}
              placeholder="sent from…"
            />
          </Field>
          <Field label="date">
            <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
          </Field>
          <Field label="location">
            <input
              value={form.location}
              onChange={(e) => set('location', e.target.value)}
              placeholder="where were you"
            />
          </Field>
        </div>
      </div>
      <Field label="message">
        <textarea
          className="font-hand text-lg"
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="dear future me…"
          rows={3}
        />
      </Field>
    </FormShell>
  )
}
