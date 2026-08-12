import { useState } from 'react'
import FormShell, { Field, AddMore } from './FormShell'

const COLORS = [
  ['cream', '#F1E7C7'],
  ['rose', '#E4A5A5'],
  ['sage', '#9AB5A0'],
  ['blue', '#B8CBDA'],
]

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
  const bg = COLORS.find(([n]) => n === form.color)?.[1] || '#F1E7C7'

  return (
    <FormShell
      open={open}
      variant="note"
      hideDefaultHeader
      paperColor={bg}
      onClose={onClose}
      onSubmit={() => {
        if (!form.text.trim()) return
        onSubmit({ ...form, text: form.text.trim() })
        setForm({ ...EMPTY })
      }}
      submitLabel="pin it"
      topRight={
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-5 z-10"
          aria-label="close"
        >
          <svg width="14" height="14" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M3 4 L14 15" stroke="#1E3A5F" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 3 L4 14" stroke="#1E3A5F" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      }
    >
      <div className="mb-6 flex items-center justify-between pr-6">
        <p className="font-type text-[0.58rem] text-[#6B4A2E]">quick note</p>
        <div className="flex gap-1.5">
          {COLORS.map(([name, color]) => (
            <button
              key={name}
              type="button"
              onClick={() => set('color', name)}
              className="h-5 w-5 border"
              style={{
                background: color,
                borderColor: form.color === name ? '#1F1815' : 'rgba(74,51,35,0.25)',
                outline: form.color === name ? '1.5px solid #1E3A5F' : 'none',
                outlineOffset: 1,
              }}
              aria-label={name}
            />
          ))}
        </div>
      </div>

      <Field labelStyle="hand" focal>
        <textarea
          className={form.fontStyle === 'gloria' ? 'font-scribble text-lg' : 'font-hand text-2xl'}
          value={form.text}
          onChange={(e) => set('text', e.target.value)}
          placeholder="jot it down..."
          required
          autoFocus
          rows={4}
          style={{ backgroundImage: 'none', borderBottom: 'none', minHeight: '5.5rem' }}
        />
      </Field>

      <AddMore label="handwriting">
        <Field label="style" labelStyle="type">
          <div className="flex gap-4">
            <label className="font-hand text-lg">
              <input type="radio" checked={form.fontStyle === 'reenie'} onChange={() => set('fontStyle', 'reenie')} className="mr-1" />
              messy
            </label>
            <label className="font-scribble text-sm">
              <input type="radio" checked={form.fontStyle === 'gloria'} onChange={() => set('fontStyle', 'gloria')} className="mr-1" />
              careful
            </label>
          </div>
        </Field>
      </AddMore>
    </FormShell>
  )
}
