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
      onClose={onClose}
      onSubmit={() => {
        onSubmit({ ...form })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin postcard"
    >
      <div className="relative grid gap-6 sm:grid-cols-2">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#A08560]/30 sm:block"
          aria-hidden="true"
        />

        <Field label="message" focal>
          <textarea
            className="font-display text-base italic"
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder="your message..."
            rows={5}
            autoFocus
          />
        </Field>

        <div className="space-y-6">
          <Field label="photo">
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
                border: '1.5px dashed rgba(200,50,46,0.35)',
                background: form.image ? '#2A221C' : 'rgba(255,255,255,0.15)',
              }}
            >
              {form.image ? (
                <img src={form.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="font-hand text-sm text-[#1E3A5F]/55">stamp</span>
              )}
            </button>
          </Field>

          <Field label="from">
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
        <Field label="date">
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
        </Field>
        <Field label="place">
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
