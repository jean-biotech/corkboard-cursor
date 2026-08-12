import { PIN_COLORS } from '../../lib/store'

export default function PushPin({ color = 'red', size = 22, className = '' }) {
  const fill = PIN_COLORS[color] || PIN_COLORS.red
  const highlight =
    color === 'yellow' ? '#F0D070' : color === 'green' ? '#8AAA7A' : color === 'blue' ? '#5A7A9B' : '#E85A55'

  return (
    <svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 24 32"
      className={`drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="10" rx="9" ry="8" fill={fill} />
      <ellipse cx="9" cy="7.5" rx="3.2" ry="2.2" fill={highlight} opacity="0.55" />
      <circle cx="12" cy="10" r="2.2" fill="#1F1815" opacity="0.25" />
      <path d="M12 17 L11 30 L13 30 Z" fill="#6B4A2E" />
      <path d="M12 17 L11.5 28" stroke="#4A3323" strokeWidth="0.7" />
    </svg>
  )
}
