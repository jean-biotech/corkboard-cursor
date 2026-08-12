import { useState } from 'react'
import FormShell, { Field, AddMore, readFileAsDataUrl } from './FormShell'
import { StarPicker } from '../items/Stars'

const EMPTY = {
  title: '',
  author: '',
  rating: 0,
  note: '',
  genre: '',
  dateRead: '',
  coverImage: null,
  review: '',
  takeaway: '',
}

export default function BookForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => {
    const base = { ...EMPTY, ...initial }
    if (!base.note && (initial?.takeaway || initial?.review)) {
      base.note = [initial.takeaway, initial.review].filter(Boolean).join('\n')
    }
    return base
  })
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      variant="library"
      title="library card"
      onClose={onClose}
      onSubmit={() => {
        if (!form.title.trim()) return
        onSubmit({
          ...form,
          title: form.title.trim(),
          takeaway: form.note,
          review: form.note,
        })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin book"
    >
      <Field label="title" focal>
        <input
          className="font-display text-xl italic"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="what did you read?"
          required
          autoFocus
        />
      </Field>

      <Field label="author">
        <input
          className="font-type text-[15px]"
          value={form.author}
          onChange={(e) => set('author', e.target.value)}
          placeholder="who wrote it"
        />
      </Field>

      <Field label="rating">
        <StarPicker value={form.rating} onChange={(n) => set('rating', n)} />
      </Field>

      <Field label="note" breakAlign>
        <textarea
          className="font-hand text-xl"
          value={form.note}
          onChange={(e) => set('note', e.target.value)}
          placeholder="what stayed with you?"
          rows={2}
        />
      </Field>

      <AddMore label="more details">
        <Field label="genre">
          <input value={form.genre} onChange={(e) => set('genre', e.target.value)} placeholder="fiction…" />
        </Field>
        <Field label="date">
          <input type="date" value={form.dateRead} onChange={(e) => set('dateRead', e.target.value)} />
        </Field>
        <Field label="cover">
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const url = await readFileAsDataUrl(e.target.files?.[0])
              set('coverImage', url)
            }}
          />
        </Field>
      </AddMore>
    </FormShell>
  )
}
