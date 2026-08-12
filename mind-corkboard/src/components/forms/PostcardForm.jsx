import { useRef, useState } from 'react'
import FormShell, { Field, AddMore, readFileAsDataUrl } from './FormShell'

const EMPTY = {
  image: null,
  preset: 'coast',
  message: '',
  date: '',
  location: '',
  sentFrom: '',
  address: '',
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
      {/* split postcard back */}
      <div className="relative mt-2 grid gap-4 sm:grid-cols-2">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-[#A08560]/40 sm:block"
          aria-hidden="true"
        />

        <div>
          <p className="font-label mb-1 text-[12px] text-[#6B4A2E]">message</p>
          <textarea
            className="font-serif text-base italic"
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder="your message..."
            rows={6}
            autoFocus
          />
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-label mb-1 text-[12px] text-[#6B4A2E]">stamp / photo</p>
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
              className="relative flex h-24 w-20 flex-col items-center justify-center overflow-hidden"
              style={{
                border: '2px dashed rgba(200,50,46,0.45)',
                background: form.image ? '#2A221C' : 'rgba(255,255,255,0.2)',
              }}
            >
              {form.image ? (
                <img src={form.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <>
                  <span className="font-type text-[0.5rem] text-[#C8322E]">MMXXVI</span>
                  <span className="font-hand text-sm text-[#1E3A5F]/70">photo</span>
                </>
              )}
            </button>
            {!form.image && (
              <select
                className="mt-2"
                value={form.preset}
                onChange={(e) => set('preset', e.target.value)}
              >
                <option value="coast">or: coast light</option>
                <option value="forest">or: forest walk</option>
                <option value="city">or: city dusk</option>
                <option value="dusk">or: warm dusk</option>
              </select>
            )}
          </div>

          <Field label="from">
            <input
              className="font-hand text-lg"
              value={form.sentFrom}
              onChange={(e) => set('sentFrom', e.target.value)}
              placeholder="sent from..."
            />
          </Field>

          <Field label="date">
            <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
          </Field>
        </div>
      </div>

      <AddMore label="add address">
        <Field label="location">
          <input
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
            placeholder="where were you"
          />
        </Field>
        <Field label="address">
          <textarea
            value={form.address}
            onChange={(e) => set('address', e.target.value)}
            placeholder="to whom, where"
            rows={2}
          />
        </Field>
      </AddMore>
    </FormShell>
  )
}
