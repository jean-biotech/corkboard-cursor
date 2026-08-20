import { useState } from 'react'
import FormShell, { Field, AddMore } from './FormShell'

export default function ListForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => {
    if (initial) {
      return {
        title: initial.title || '',
        category: initial.category || '',
        items: (initial.items || []).map((i) => ({ text: i.text, done: !!i.done })),
      }
    }
    return { title: '', category: '', items: [] }
  })
  const [draft, setDraft] = useState('')

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
      onClose={onClose}
      onSubmit={() => {
        if (!form.title.trim() && form.items.length === 0) return
        onSubmit({
          title: form.title.trim() || 'to remember',
          category: form.category,
          items: form.items,
        })
        setForm({ title: '', category: '', items: [] })
        setDraft('')
      }}
      submitLabel="pin list"
      className="pl-5"
    >
      <Field label="what's this for">
        <input
          className="font-display text-lg italic"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="what's this list for?"
          autoFocus
        />
      </Field>

      <Field label="items" focal>
        <ul className="mb-2 space-y-2">
          {form.items.map((entry, i) => (
            <li key={`${entry.text}-${i}`} className="flex items-start gap-2">
              <button
                type="button"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    items: f.items.map((it, idx) =>
                      idx === i ? { ...it, done: !it.done } : it,
                    ),
                  }))
                }
                className="mt-1.5 h-3 w-3 shrink-0 border border-[#1E3A5F]/55"
                style={{ background: entry.done ? '#1E3A5F' : 'transparent' }}
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
          placeholder="type + enter"
        />
      </Field>

      <AddMore label="add tag">
        <Field label="tag">
          <input
            className="font-type text-[15px]"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            placeholder="reading, watching…"
          />
        </Field>
      </AddMore>
    </FormShell>
  )
}
