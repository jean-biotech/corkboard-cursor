export default function Stars({ rating = 0, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            d="M10 2.2 L12.1 7.4 L17.8 7.8 L13.4 11.6 L14.9 17.2 L10 14.2 L5.1 17.2 L6.6 11.6 L2.2 7.8 L7.9 7.4 Z"
            fill={n <= rating ? '#C8322E' : 'none'}
            stroke="#C8322E"
            strokeWidth="1.2"
            opacity={n <= rating ? 0.9 : 0.35}
            style={{ transform: `rotate(${(n % 2 === 0 ? 3 : -2)}deg)` }}
          />
        </svg>
      ))}
    </div>
  )
}

export function StarPicker({ value, onChange }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110"
          aria-label={`${n} stars`}
        >
          <svg width="26" height="26" viewBox="0 0 20 20">
            <path
              d="M10 2.2 L12.1 7.4 L17.8 7.8 L13.4 11.6 L14.9 17.2 L10 14.2 L5.1 17.2 L6.6 11.6 L2.2 7.8 L7.9 7.4 Z"
              fill={n <= value ? '#C8322E' : 'none'}
              stroke="#C8322E"
              strokeWidth="1.2"
              opacity={n <= value ? 0.95 : 0.4}
            />
          </svg>
        </button>
      ))}
    </div>
  )
}
