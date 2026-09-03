import { useMemo } from 'react'

function getTier(score) {
  if (score >= 750) return { label: 'Prime', color: '#10b981', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' }
  if (score >= 620) return { label: 'Near-Prime', color: '#f59e0b', bg: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' }
  return { label: 'Sub-Prime', color: '#ef4444', bg: 'bg-red-500/10 text-red-400 border-red-500/30' }
}

export default function ScoreGauge({ score = 650 }) {
  const tier = useMemo(() => getTier(score), [score])
  
  // SVG arc math
  const radius = 90
  const strokeWidth = 14
  const cx = 110
  const cy = 110
  const minAngle = -200
  const maxAngle = 20
  const totalAngle = maxAngle - minAngle   // 220 degrees
  const pct = Math.max(0, Math.min(1, (score - 300) / 600))
  const angle = minAngle + pct * totalAngle

  // Arc path helper
  function polarToCartesian(angleDeg) {
    const rad = ((angleDeg - 90) * Math.PI) / 180
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    }
  }

  function arcPath(startAngle, endAngle) {
    const start = polarToCartesian(startAngle)
    const end = polarToCartesian(endAngle)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`
  }

  const needle = polarToCartesian(angle)

  return (
    <div className="flex flex-col items-center">
      <svg width="220" height="160" viewBox="0 0 220 180">
        {/* Background arc */}
        <path
          d={arcPath(minAngle + 90, maxAngle + 90)}
          fill="none"
          stroke="#1a2d52"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Colored score arc */}
        <path
          d={arcPath(minAngle + 90, angle + 90)}
          fill="none"
          stroke={tier.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${tier.color}80)` }}
        />
        {/* Zone labels */}
        <text x="18" y="148" fill="#6b7280" fontSize="9" fontFamily="Inter">300</text>
        <text x="96" y="22" fill="#6b7280" fontSize="9" fontFamily="Inter">600</text>
        <text x="186" y="148" fill="#6b7280" fontSize="9" fontFamily="Inter">900</text>
        {/* Needle dot */}
        <circle cx={needle.x} cy={needle.y} r="7" fill={tier.color} style={{ filter: `drop-shadow(0 0 8px ${tier.color})` }} />
        {/* Score text */}
        <text x="110" y="128" textAnchor="middle" fill="white" fontSize="36" fontWeight="700" fontFamily="Inter">{score}</text>
        <text x="110" y="148" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="Inter">Credit Score</text>
      </svg>

      <span className={`border text-xs font-bold px-4 py-1 rounded-full -mt-2 ${tier.bg}`}>
        {tier.label} Tier
      </span>
    </div>
  )
}
