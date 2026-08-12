import { useState } from 'react'
import FormShell, { Field, AddMore } from './FormShell'

const EMPTY = {
  text: '',
  color: 'cream',
  fontStyle: 'reenie',
  showArrow: false,
}

export default function NoteForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => {
    const base = { ...EMPTY, ...initial }
    if (base.fontStyle === 'caveat') base.fontStyle = 'reenie'
    if (base.fontStyle === 'scribble') base.fontStyle = 'gloria'
    return base
  })
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  return (
    <FormShell
      open={open}
      title="torn scrap"
      subtitle="pin a note"
      onClose={onClose}
      onSubmit={() => {
        if (!form.text.trim()) return
        onSubmit({ ...form, text: form.text.trim() })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin note"
    >
      <Field label="your note">
        <textarea
          className={form.fontStyle === 'gloria' ? 'font-scribble text-lg' : 'font-hand text-2xl'}
          value={form.text}
          onChange={(e) => set('text', e.target.value)}
          placeholder="write freely"
          required
          autoFocus
          rows={4}
        />
      </Field>
      <Field label="paper color">
        <div className="flex gap-2">
          {[
            ['cream', '#F1E7C7'],
            ['rose', '#E4A5A5'],
            ['sage', '#9AB5A0'],
            ['blue', '#B8CBDA'],
          ].map(([name, color]) => (
            <button
              key={name}
              type="button"
              onClick={() => set('color', name)}
              className="h-8 w-8 border"
              style={{
                background: color,
                borderColor: form.color === name ? '#1F1815' : 'rgba(74,51,35,0.25)',
                outline: form.color === name ? '2px solid #1E3A5F' : 'none',
                outlineOffset: 2,
              }}
              aria-label={name}
            />
          ))}
        </div>
      </Field>
      <AddMore label="handwriting style">
        <div className="flex gap-4">
          <label className="font-hand text-xl">
            <input
              type="radio"
              checked={form.fontStyle === 'reenie'}
              onChange={() => set('fontStyle', 'reenie')}
              className="mr-1"
            />
            messy
          </label>
          <label className="font-scribble text-sm">
            <input
              type="radio"
              checked={form.fontStyle === 'gloria'}
              onChange={() => set('fontStyle', 'gloria')}
              className="mr-1"
            />
            careful
          </label>
        </div>
      </AddMore>
    </FormShell>
  )
}
