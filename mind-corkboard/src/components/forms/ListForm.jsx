import { useState } from 'react'
import FormShell, { Field, AddMore } from './FormShell'

const EMPTY = {
  title: '',
  category: '',
  items: [],
}

export default function ListForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => {
    if (initial) {
      return {
        title: initial.title || '',
        category: initial.category || '',
        items: (initial.items || []).map((i) => ({
          text: i.text,
          done: !!i.done,
        })),
      }
    }
    return { ...EMPTY, items: [] }
  })
  const [draft, setDraft] = useState('')

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  function addItem() {
    const text = draft.trim()
    if (!text) return
    setForm((f) => ({ ...f, items: [...f.items, { text, done: false }] }))
    setDraft('')
  }

  return (
    <FormShell
      open={open}
      variant="list"
      title="list"
      subtitle="pin things to remember"
      onClose={onClose}
      onSubmit={() => {
        if (!form.title.trim() && form.items.length === 0) return
        onSubmit({
          title: form.title.trim() || 'to remember',
          category: form.category,
          items: form.items,
        })
        setForm({ ...EMPTY, items: [] })
        setDraft('')
      }}
      submitLabel="pin list"
      className="pl-8"
    >
      <Field label="title">
        <input
          className="font-serif text-xl italic"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="what's this list for?"
          autoFocus
        />
      </Field>

      <Field label="items">
        <ul className="mb-2 space-y-1.5">
          {form.items.map((entry, i) => (
            <li key={`${entry.text}-${i}`} className="flex items-start gap-2">
              <button
                type="button"
                onClick={() => {
                  setForm((f) => ({
                    ...f,
                    items: f.items.map((it, idx) =>
                      idx === i ? { ...it, done: !it.done } : it,
                    ),
                  }))
                }}
                className="mt-1.5 h-3.5 w-3.5 shrink-0 border border-[#1E3A5F]/65"
                style={{ background: entry.done ? '#1E3A5F' : 'transparent' }}
                aria-label={entry.done ? 'uncheck' : 'check'}
              />
              <span
                className="font-hand flex-1 text-xl leading-tight text-[#1E3A5F]"
                style={{
                  textDecoration: entry.done ? 'line-through' : 'none',
                  opacity: entry.done ? 0.5 : 1,
                }}
              >
                {entry.text}
              </span>
              <button
                type="button"
                className="font-hand text-base text-[#6B4A2E]/70"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    items: f.items.filter((_, idx) => idx !== i),
                  }))
                }
                aria-label="remove item"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <input
          className="font-hand text-xl"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addItem()
            }
          }}
          placeholder="type an item, hit enter"
        />
        <button
          type="button"
          onClick={addItem}
          className="font-hand mt-1 text-base text-[#1E3A5F] underline-offset-2 hover:underline"
        >
          add item
        </button>
      </Field>

      <AddMore label="add category tag">
        <Field label="category">
          <input
            className="font-type text-sm"
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            placeholder="reading, watching, making…"
          />
        </Field>
      </AddMore>
    </FormShell>
  )
}
