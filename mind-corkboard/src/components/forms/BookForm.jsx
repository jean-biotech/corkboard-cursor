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
      subtitle="pin a book"
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
      <Field label="title">
        <input
          className="font-serif text-xl italic"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="what did you read?"
          required
          autoFocus
        />
      </Field>

      <Field label="author">
        <input
          className="font-type text-sm"
          value={form.author}
          onChange={(e) => set('author', e.target.value)}
          placeholder="who wrote it (optional)"
        />
      </Field>

      <Field label="rating">
        <StarPicker value={form.rating} onChange={(n) => set('rating', n)} />
      </Field>

      <Field label="note">
        <textarea
          className="font-hand text-xl ruled-field"
          value={form.note}
          onChange={(e) => set('note', e.target.value)}
          placeholder="what stayed with you?"
          rows={3}
        />
      </Field>

      <AddMore>
        <Field label="genre">
          <input
            value={form.genre}
            onChange={(e) => set('genre', e.target.value)}
            placeholder="fiction, memoir…"
          />
        </Field>
        <Field label="date read">
          <input
            type="date"
            value={form.dateRead}
            onChange={(e) => set('dateRead', e.target.value)}
          />
        </Field>
        <Field label="cover image">
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
