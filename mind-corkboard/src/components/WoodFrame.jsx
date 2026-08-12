export default function WoodFrame() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1464 1064"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="woodTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B4A2E" />
          <stop offset="40%" stopColor="#5A3D26" />
          <stop offset="100%" stopColor="#4A3323" />
        </linearGradient>
        <linearGradient id="woodBottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A3323" />
          <stop offset="50%" stopColor="#3A2818" />
          <stop offset="100%" stopColor="#2E1F14" />
        </linearGradient>
        <linearGradient id="woodSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5A3D26" />
          <stop offset="35%" stopColor="#4A3323" />
          <stop offset="70%" stopColor="#3F2C1C" />
          <stop offset="100%" stopColor="#5A3D26" />
        </linearGradient>
        <pattern id="woodGrainH" width="80" height="32" patternUnits="userSpaceOnUse">
          <path d="M0 8 Q20 6 40 10 T80 8" stroke="#3A2818" strokeWidth="0.8" fill="none" opacity="0.35" />
          <path d="M0 18 Q25 22 50 16 T80 20" stroke="#6B4A2E" strokeWidth="0.6" fill="none" opacity="0.25" />
          <path d="M0 26 Q30 24 55 28 T80 25" stroke="#2E1F14" strokeWidth="0.5" fill="none" opacity="0.3" />
        </pattern>
        <pattern id="woodGrainV" width="32" height="80" patternUnits="userSpaceOnUse">
          <path d="M8 0 Q6 20 10 40 T8 80" stroke="#3A2818" strokeWidth="0.8" fill="none" opacity="0.35" />
          <path d="M18 0 Q22 25 16 50 T20 80" stroke="#6B4A2E" strokeWidth="0.6" fill="none" opacity="0.25" />
          <path d="M26 0 Q24 30 28 55 T25 80" stroke="#2E1F14" strokeWidth="0.5" fill="none" opacity="0.3" />
        </pattern>
        <linearGradient id="brass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8C97A" />
          <stop offset="45%" stopColor="#C4A04A" />
          <stop offset="100%" stopColor="#8B6B2E" />
        </linearGradient>
      </defs>

      {/* Outer shadow edge */}
      <rect x="0" y="0" width="1464" height="1064" fill="none" stroke="#2E1F14" strokeWidth="2" opacity="0.4" />

      {/* Top rail — lighter oak highlight */}
      <rect x="0" y="0" width="1464" height="32" fill="url(#woodTop)" />
      <rect x="0" y="0" width="1464" height="32" fill="url(#woodGrainH)" opacity="0.85" />
      <rect x="0" y="0" width="1464" height="4" fill="#7A5635" opacity="0.55" />
      <rect x="0" y="28" width="1464" height="4" fill="#2E1F14" opacity="0.35" />

      {/* Bottom rail — darker (gravity/shadow) */}
      <rect x="0" y="1032" width="1464" height="32" fill="url(#woodBottom)" />
      <rect x="0" y="1032" width="1464" height="32" fill="url(#woodGrainH)" opacity="0.9" />
      <rect x="0" y="1032" width="1464" height="3" fill="#2E1F14" opacity="0.45" />
      <rect x="0" y="1060" width="1464" height="4" fill="#1A120C" opacity="0.5" />

      {/* Left rail */}
      <rect x="0" y="32" width="32" height="1000" fill="url(#woodSide)" />
      <rect x="0" y="32" width="32" height="1000" fill="url(#woodGrainV)" opacity="0.85" />
      <rect x="28" y="32" width="4" height="1000" fill="#2E1F14" opacity="0.3" />

      {/* Right rail */}
      <rect x="1432" y="32" width="32" height="1000" fill="url(#woodSide)" />
      <rect x="1432" y="32" width="32" height="1000" fill="url(#woodGrainV)" opacity="0.85" />
      <rect x="1432" y="32" width="4" height="1000" fill="#2E1F14" opacity="0.3" />

      {/* Inner bevel around cork */}
      <rect
        x="32"
        y="32"
        width="1400"
        height="1000"
        fill="none"
        stroke="#2E1F14"
        strokeWidth="3"
        opacity="0.45"
      />
      <rect
        x="34"
        y="34"
        width="1396"
        height="996"
        fill="none"
        stroke="#6B4A2E"
        strokeWidth="1.5"
        opacity="0.35"
      />

      {/* Brass corner brackets */}
      <g fill="url(#brass)" stroke="#8B6B2E" strokeWidth="0.8">
        {/* Top-left */}
        <path d="M8 8 h28 v6 h-22 v22 h-6 z" opacity="0.95" />
        <circle cx="14" cy="14" r="2.2" fill="#6B4A2E" opacity="0.55" />
        <circle cx="28" cy="14" r="2.2" fill="#6B4A2E" opacity="0.55" />
        <circle cx="14" cy="28" r="2.2" fill="#6B4A2E" opacity="0.55" />

        {/* Top-right */}
        <path d="M1456 8 h-28 v6 h22 v22 h6 z" opacity="0.95" />
        <circle cx="1450" cy="14" r="2.2" fill="#6B4A2E" opacity="0.55" />
        <circle cx="1436" cy="14" r="2.2" fill="#6B4A2E" opacity="0.55" />
        <circle cx="1450" cy="28" r="2.2" fill="#6B4A2E" opacity="0.55" />

        {/* Bottom-left */}
        <path d="M8 1056 h28 v-6 h-22 v-22 h-6 z" opacity="0.95" />
        <circle cx="14" cy="1050" r="2.2" fill="#6B4A2E" opacity="0.55" />
        <circle cx="28" cy="1050" r="2.2" fill="#6B4A2E" opacity="0.55" />
        <circle cx="14" cy="1036" r="2.2" fill="#6B4A2E" opacity="0.55" />

        {/* Bottom-right */}
        <path d="M1456 1056 h-28 v-6 h22 v-22 h6 z" opacity="0.95" />
        <circle cx="1450" cy="1050" r="2.2" fill="#6B4A2E" opacity="0.55" />
        <circle cx="1436" cy="1050" r="2.2" fill="#6B4A2E" opacity="0.55" />
        <circle cx="1450" cy="1036" r="2.2" fill="#6B4A2E" opacity="0.55" />
      </g>

      {/* Chip / uneven edge on bottom-right rail */}
      <path
        d="M1420 1048 L1435 1052 L1448 1045 L1455 1055 L1425 1058 Z"
        fill="#F5EFE4"
        opacity="0.55"
      />
      <path
        d="M1418 1046 Q1430 1054 1450 1048"
        fill="none"
        stroke="#2E1F14"
        strokeWidth="1.2"
        opacity="0.4"
      />

      {/* Hanging ribbon string off top edge */}
      <path
        d="M220 32 Q230 70 218 110 Q210 130 225 150"
        fill="none"
        stroke="#C8322E"
        strokeWidth="2.2"
        opacity="0.55"
        strokeLinecap="round"
      />
      <path
        d="M218 148 L210 165 L225 158 L232 168 L226 150"
        fill="#C8322E"
        opacity="0.5"
      />
    </svg>
  )
}
