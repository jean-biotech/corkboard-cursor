import { useState } from 'react'
import FormShell, { Field } from './FormShell'

const EMPTY = {
  title: '',
  category: '',
  itemsText: '',
}

export default function ListForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => {
    if (initial) {
      return {
        title: initial.title || '',
        category: initial.category || '',
        itemsText: (initial.items || []).map((i) => i.text).join('\n'),
        _items: initial.items,
      }
    }
    return { ...EMPTY }
  })
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      title="to remember"
      subtitle="pin a list"
      onClose={onClose}
      onSubmit={() => {
        const lines = form.itemsText
          .split('\n')
          .map((t) => t.trim())
          .filter(Boolean)
        if (!form.title.trim() && lines.length === 0) return
        const existing = form._items || []
        const items = lines.map((text, i) => ({
          text,
          done: existing[i]?.text === text ? !!existing[i].done : false,
        }))
        onSubmit({
          title: form.title.trim() || 'to remember',
          category: form.category,
          items,
        })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin list"
    >
      <Field label="list title">
        <input
          className="font-hand text-xl"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="books to read, songs, ideas…"
          autoFocus
        />
      </Field>
      <Field label="category">
        <input
          className="font-type text-sm"
          value={form.category}
          onChange={(e) => set('category', e.target.value)}
          placeholder="reading, watching, making…"
        />
      </Field>
      <Field label="items (one per line)">
        <textarea
          className="font-hand text-lg"
          value={form.itemsText}
          onChange={(e) => set('itemsText', e.target.value)}
          placeholder={'first thing\nsecond thing\nthird thing'}
          rows={6}
        />
      </Field>
    </FormShell>
  )
}
