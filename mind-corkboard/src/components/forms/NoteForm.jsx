import { useState } from 'react'
import FormShell, { Field } from './FormShell'

const EMPTY = {
  text: '',
  color: 'cream',
  fontStyle: 'caveat',
  showArrow: false,
}

export default function NoteForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...initial }))
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
          className={form.fontStyle === 'scribble' ? 'font-scribble' : 'font-hand'}
          style={{ fontSize: '1.25rem' }}
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
                outline: form.color === name ? '2px solid #C8322E' : 'none',
                outlineOffset: 2,
              }}
              aria-label={name}
            />
          ))}
        </div>
      </Field>
      <Field label="handwriting">
        <div className="flex gap-4">
          <label className="font-hand text-lg">
            <input
              type="radio"
              checked={form.fontStyle === 'caveat'}
              onChange={() => set('fontStyle', 'caveat')}
              className="mr-1"
            />
            careful
          </label>
          <label className="font-scribble text-base">
            <input
              type="radio"
              checked={form.fontStyle === 'scribble'}
              onChange={() => set('fontStyle', 'scribble')}
              className="mr-1"
            />
            scribbled
          </label>
        </div>
      </Field>
    </FormShell>
  )
}
