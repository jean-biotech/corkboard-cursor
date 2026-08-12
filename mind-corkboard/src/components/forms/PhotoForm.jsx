import { useState } from 'react'
import FormShell, { Field, AddMore, readFileAsDataUrl } from './FormShell'

const EMPTY = {
  image: null,
  caption: '',
  style: 'polaroid',
  tapeColor: 'cream',
}

export default function PhotoForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }))
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      title="a moment kept"
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
          type="file"
          accept="image/*"
          required={!form.image}
          onChange={async (e) => {
            const url = await readFileAsDataUrl(e.target.files?.[0])
            set('image', url)
          }}
        />
        {form.image && (
          <img
            src={form.image}
            alt=""
            className="mt-2 h-32 w-full object-cover"
            style={{ border: '6px solid #FAF6EE', borderBottomWidth: 22 }}
          />
        )}
      </Field>
      <Field label="caption">
        <input
          className="font-hand text-xl"
          value={form.caption}
          onChange={(e) => set('caption', e.target.value)}
          placeholder="scribble something underneath"
        />
      </Field>
      <AddMore>
        <Field label="style">
          <div className="flex gap-4 font-hand text-lg text-[#1E3A5F]">
            {['polaroid', 'regular'].map((s) => (
              <label key={s} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="style"
                  checked={form.style === s}
                  onChange={() => set('style', s)}
                />
                {s}
              </label>
            ))}
          </div>
        </Field>
        <Field label="tape color">
          <select value={form.tapeColor} onChange={(e) => set('tapeColor', e.target.value)}>
            <option value="cream">cream stripe</option>
            <option value="rose">dusty rose</option>
            <option value="sage">sage</option>
            <option value="blue">pale blue</option>
          </select>
        </Field>
      </AddMore>
    </FormShell>
  )
}
