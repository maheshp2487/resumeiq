import { useEffect, useState } from 'react'
import { getScoreColor } from '../../utils/helpers'

export default function ScoreRing({
  score,
  size = 125,
  strokeWidth = 10,
  label = 'Score',
}) {
  const [animated, setAnimated] = useState(0)

  const radius = (size - strokeWidth * 2) / 2

  const circumference = 2 * Math.PI * radius

  const offset = circumference * (1 - animated / 100)

  const color = getScoreColor(score)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 120)

    return () => clearTimeout(t)
  }, [score])

  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20"
        style={{
          background: color,
        }}
      />

      {/* Ring */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{
          transform: 'rotate(-90deg)',
        }}
        className="relative z-10"
      >
        {/* Background Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />

        {/* Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)',
            filter: `drop-shadow(0 0 10px ${color}40)`,
          }}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span
          className="text-3xl font-bold tracking-tight"
          style={{
            color,
          }}
        >
          {score}
        </span>

        <span className="text-[0.62rem] uppercase tracking-[0.22em] text-[#7d7d94] mt-1">
          {label}
        </span>
      </div>
    </div>
  )
}