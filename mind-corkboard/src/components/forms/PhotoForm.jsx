import { useRef, useState } from 'react'
import FormShell, { Field, readFileAsDataUrl } from './FormShell'

const EMPTY = {
  image: null,
  caption: '',
  style: 'polaroid',
  tapeColor: 'cream',
  location: '',
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
      <Field label="photo" labelStyle="hand" focal>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => handleFiles(e.target.files)}
        />
        <button
          type="button"
          className="w-full overflow-hidden text-left"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={async (e) => {
            e.preventDefault()
            handleFiles(e.dataTransfer.files)
          }}
          style={{
            background: form.image ? '#2A221C' : '#FAF6EE',
            boxShadow: '3px 5px 12px rgba(74,51,35,0.22)',
            minHeight: 160,
            maxHeight: 200,
          }}
        >
          {form.image ? (
            <img src={form.image} alt="" className="max-h-[200px] w-full object-cover" />
          ) : (
            <p className="font-hand px-4 py-12 text-center text-xl text-[#1E3A5F]/55">
              drop a photo here
            </p>
          )}
        </button>
      </Field>

      <Field label="caption" labelStyle="hand">
        <input
          className="font-hand text-xl"
          value={form.caption}
          onChange={(e) => set('caption', e.target.value)}
          placeholder="what's the moment?"
        />
      </Field>

      <Field label="location" labelStyle="type" breakAlign>
        <input
          className="font-hand text-lg"
          value={form.location}
          onChange={(e) => set('location', e.target.value)}
          placeholder="optional place"
        />
      </Field>

      <div className="flex items-end gap-5">
        <button type="button" onClick={() => set('style', 'polaroid')} className="flex flex-col items-center gap-1">
          <span
            aria-hidden="true"
            style={{
              width: 26,
              height: 32,
              background: '#FAF6EE',
              boxShadow: form.style === 'polaroid' ? '1px 1px 0 #1E3A5F' : '1px 2px 3px rgba(74,51,35,0.15)',
              borderBottom: '7px solid #FAF6EE',
              outline: form.style === 'polaroid' ? '1px solid #1E3A5F' : '1px solid rgba(74,51,35,0.2)',
              opacity: 0.9,
            }}
          />
          <span className="font-hand text-sm text-[#1E3A5F]/80">polaroid</span>
        </button>
        <button type="button" onClick={() => set('style', 'regular')} className="flex flex-col items-center gap-1">
          <span
            aria-hidden="true"
            style={{
              width: 32,
              height: 22,
              background: '#FAF6EE',
              boxShadow: form.style === 'regular' ? '1px 1px 0 #1E3A5F' : '1px 2px 3px rgba(74,51,35,0.15)',
              outline: form.style === 'regular' ? '1px solid #1E3A5F' : '1px solid rgba(74,51,35,0.2)',
              opacity: 0.9,
            }}
          />
          <span className="font-type text-[0.55rem] text-[#6B4A2E]">regular</span>
        </button>
      </div>
    </FormShell>
  )
}
