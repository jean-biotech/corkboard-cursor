import { useState } from 'react'
import FormShell, { Field, readFileAsDataUrl } from './FormShell'
import { StarPicker } from '../items/Stars'

const EMPTY = {
  title: '',
  author: '',
  genre: '',
  rating: 0,
  review: '',
  takeaway: '',
  dateRead: '',
  coverImage: null,
  coverEmoji: '◆',
}

export default function BookForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }))

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      title="library card"
      subtitle="pin a book"
      onClose={onClose}
      onSubmit={() => {
        if (!form.title.trim()) return
        onSubmit({ ...form, title: form.title.trim() })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin book"
    >
      <Field label="title">
        <input
          className="font-serif text-xl"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="what did you read?"
          required
          autoFocus
        />
      </Field>
      <Field label="author">
        <input
          value={form.author}
          onChange={(e) => set('author', e.target.value)}
          placeholder="who wrote it"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
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
      </div>
      <Field label="rating">
        <StarPicker value={form.rating} onChange={(n) => set('rating', n)} />
      </Field>
      <Field label="one-line takeaway">
        <input
          className="font-hand text-lg"
          value={form.takeaway}
          onChange={(e) => set('takeaway', e.target.value)}
          placeholder="what stayed with you"
        />
      </Field>
      <Field label="personal review">
        <textarea
          className="font-serif"
          value={form.review}
          onChange={(e) => set('review', e.target.value)}
          placeholder="the long version, if you want it"
          rows={4}
        />
      </Field>
      <Field label="cover image (optional)">
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const url = await readFileAsDataUrl(e.target.files?.[0])
            set('coverImage', url)
          }}
        />
      </Field>
    </FormShell>
  )
}
