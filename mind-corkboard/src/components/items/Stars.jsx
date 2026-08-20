/** Slightly wobbly hand-drawn star paths (not perfect geometry) */
const WOBBLE = [
  'M10 1.8 L12.4 7.1 L18.2 7.3 L13.2 11.2 L15.1 17.3 L9.8 13.9 L4.6 17.6 L6.3 11.4 L1.4 7.6 L7.3 7.2 Z',
  'M10.2 2.1 L11.8 7.6 L17.9 7.5 L13.1 11.8 L15.4 17 L9.9 14.1 L4.8 17.4 L6.7 11.5 L1.6 7.9 L7.6 7.4 Z',
  'M9.8 2 L12.6 7.2 L18 8 L13.5 11.3 L14.7 17.4 L10 13.8 L5.2 17.1 L6.5 11.1 L2 7.7 L7.5 7.3 Z',
  'M10 1.9 L11.9 7 L17.6 7.9 L13 11.6 L14.8 16.9 L10.1 14.3 L5 17.2 L6.8 11.7 L1.8 7.4 L7.8 7.1 Z',
  'M10.1 2.2 L12.2 7.5 L17.7 7.2 L13.4 11.4 L15.2 17.2 L9.7 14 L4.5 17 L6.4 11.2 L1.9 8 L7.4 7.5 Z',
]

export default function Stars({ rating = 0, size = 16, ink = '#1E3A5F' }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
          <path
            d={WOBBLE[n - 1]}
            fill={n <= rating ? ink : 'none'}
            stroke={ink}
            strokeWidth="1.15"
            strokeLinejoin="round"
            opacity={n <= rating ? 0.92 : 0.38}
            style={{ transform: `rotate(${n % 2 === 0 ? 4 : -3}deg)` }}
          />
          {n <= rating && (
            <circle cx="10" cy="10" r="8" fill={ink} opacity="0.06" />
          )}
        </svg>
      ))}
    </div>
  )
}

export function StarPicker({ value, onChange, ink = '#1E3A5F' }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n === value ? 0 : n)}
          className="transition-transform hover:scale-110"
          aria-label={`${n} stars`}
        >
          <svg width="24" height="24" viewBox="0 0 20 20">
            <path
              d={WOBBLE[n - 1]}
              fill={n <= value ? ink : 'none'}
              stroke={ink}
              strokeWidth="1.2"
              strokeLinejoin="round"
              opacity={n <= value ? 0.95 : 0.4}
            />
            {n <= value && (
              <ellipse cx="10" cy="11" rx="7" ry="6.5" fill={ink} opacity="0.08" />
            )}
          </svg>
        </button>
      ))}
    </div>
  )
}
