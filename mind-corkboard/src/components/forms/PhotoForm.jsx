import { useRef, useState } from 'react'
import FormShell, { Field, AddMore, readFileAsDataUrl } from './FormShell'

const EMPTY = {
  image: null,
  caption: '',
  style: 'polaroid',
  tapeColor: 'cream',
  location: '',
  date: '',
}

export default function PhotoForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }))
  const fileRef = useRef(null)
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  async function handleFiles(files) {
    const url = await readFileAsDataUrl(files?.[0])
    if (url) set('image', url)
  }

  return (
    <FormShell
      open={open}
      variant="photo"
      title="photo lab"
      subtitle="pin a photo"
      onClose={onClose}
      onSubmit={() => {
        if (!form.image) return
        onSubmit({ ...form })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin photo"
    >
      <Field label="image">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => handleFiles(e.target.files)}
        />
        <button
          type="button"
          className="photo-dropzone w-full"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={async (e) => {
            e.preventDefault()
            handleFiles(e.dataTransfer.files)
          }}
        >
          {form.image ? (
            <img
              src={form.image}
              alt=""
              className="max-h-44 w-full object-cover"
              style={{ border: '6px solid #FAF6EE', borderBottomWidth: 20 }}
            />
          ) : (
            <p className="font-hand px-4 text-center text-xl text-[#1E3A5F]/70">
              drop a photo or click to upload
            </p>
          )}
        </button>
      </Field>

      <Field label="caption">
        <input
          className="font-hand text-xl"
          value={form.caption}
          onChange={(e) => set('caption', e.target.value)}
          placeholder="what's the moment?"
        />
      </Field>

      <Field label="style">
        <div className="flex gap-5">
          {[
            { id: 'polaroid', label: 'polaroid' },
            { id: 'regular', label: 'regular' },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => set('style', opt.id)}
              className="flex items-center gap-2"
            >
              <span
                className="inline-block"
                style={{
                  width: opt.id === 'polaroid' ? 22 : 24,
                  height: opt.id === 'polaroid' ? 26 : 18,
                  border: `1.5px solid ${form.style === opt.id ? '#1E3A5F' : 'rgba(74,51,35,0.35)'}`,
                  background: form.style === opt.id ? 'rgba(30,58,95,0.08)' : '#FAF6EE',
                  boxShadow: form.style === opt.id ? '1px 1px 0 #1E3A5F' : 'none',
                }}
                aria-hidden="true"
              />
              <span className="font-hand text-lg text-[#1E3A5F]">{opt.label}</span>
            </button>
          ))}
        </div>
      </Field>

      <AddMore label="add location and date">
        <Field label="location">
          <input
            value={form.location}
            onChange={(e) => set('location', e.target.value)}
            placeholder="where was this"
          />
        </Field>
        <Field label="date">
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
        </Field>
      </AddMore>
    </FormShell>
  )
}
