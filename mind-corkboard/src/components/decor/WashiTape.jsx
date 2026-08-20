const COLORS = {
  rose: '#E4A5A5',
  sage: '#9AB5A0',
  cream: '#EDE0C4',
  blue: '#B8CBDA',
}

export default function WashiTape({
  color = 'rose',
  width = 90,
  height = 22,
  rotation = -12,
  striped = false,
  className = '',
}) {
  const fill = COLORS[color] || COLORS.rose
  const id = `tape-${color}-${width}-${rotation}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={fill} />
          {striped && <rect x="0" y="0" width="4" height="10" fill="#EDE0C4" opacity="0.55" />}
        </pattern>
      </defs>
      <path
        d={`M2 2 L${width - 2} 1 L${width - 1} ${height - 2} L3 ${height - 1} Z`}
        fill={`url(#${id})`}
        opacity="0.88"
        stroke="rgba(74,51,35,0.12)"
        strokeWidth="0.5"
      />
      {/* torn edge nicks */}
      <path
        d={`M0 4 L2 2 L1 8 Z`}
        fill={fill}
        opacity="0.7"
      />
      <path
        d={`M${width} ${height - 5} L${width - 2} ${height - 1} L${width - 1} ${height - 8} Z`}
        fill={fill}
        opacity="0.7"
      />
    </svg>
  )
}
