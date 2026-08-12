import { useRef, useState } from 'react'
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
  const fileRef = useRef(null)
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      variant="postcard"
      title="postcard"
      subtitle="pin a memory"
      onClose={onClose}
      onSubmit={() => {
        onSubmit({ ...form })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin postcard"
    >
      <div className="relative mt-1 grid gap-3 sm:grid-cols-2">
        <div
          className="pointer-events-none absolute inset-y-2 left-1/2 hidden w-px -translate-x-1/2 bg-[#A08560]/35 sm:block"
          style={{ transform: 'translateX(-50%) rotate(1deg)' }}
          aria-hidden="true"
        />

        <Field label="message" labelStyle="hand" offset="tilt">
          <textarea
            className="font-serif text-base italic"
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder="your message..."
            rows={5}
            autoFocus
          />
        </Field>

        <div className="space-y-2" style={{ transform: 'rotate(0.6deg)' }}>
          <Field label="photo" labelStyle="type" offset="none">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const url = await readFileAsDataUrl(e.target.files?.[0])
                set('image', url)
              }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-20 w-16 flex-col items-center justify-center overflow-hidden"
              style={{
                border: '2px dashed rgba(200,50,46,0.4)',
                background: form.image ? '#2A221C' : 'rgba(255,255,255,0.15)',
                transform: 'rotate(4deg)',
              }}
            >
              {form.image ? (
                <img src={form.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="font-hand text-sm text-[#1E3A5F]/65">stamp</span>
              )}
            </button>
          </Field>

          <Field label="from" labelStyle="hand" offset="short">
            <input
              className="font-hand text-lg"
              value={form.sentFrom}
              onChange={(e) => set('sentFrom', e.target.value)}
              placeholder="sent from..."
            />
          </Field>
        </div>
      </div>

      <AddMore label="add date & place">
        <Field label="date" labelStyle="type">
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
        </Field>
        <Field label="place" labelStyle="hand">
          <input
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
            placeholder="where were you"
          />
        </Field>
      </AddMore>
    </FormShell>
  )
}
