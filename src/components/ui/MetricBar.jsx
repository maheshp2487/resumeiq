import { useEffect, useState } from 'react'
import { getScoreColor } from '../../utils/helpers'

export default function MetricBar({ label, value, color }) {
  const [width, setWidth] = useState(0)

  const barColor = color || getScoreColor(value)

  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 180)

    return () => clearTimeout(t)
  }, [value])

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#13131c] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/10 hover:shadow-xl hover:shadow-black/20">
      {/* Background Glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 transition-opacity duration-300 group-hover:opacity-20"
        style={{
          background: barColor,
        }}
      />

      <div className="relative z-10">
        {/* Label */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-wider text-[#7d7d94] font-medium">
            {label}
          </p>

          <span
            className="text-sm font-semibold"
            style={{
              color: barColor,
            }}
          >
            {value}
            <span className="text-[#5f5f75] text-xs font-normal ml-0.5">
              /100
            </span>
          </span>
        </div>

        {/* Bar */}
        <div className="relative h-3 rounded-full overflow-hidden bg-[#1d1d28] border border-white/[0.04]">
          {/* Progress Glow */}
          <div
            className="absolute inset-y-0 left-0 blur-md opacity-40"
            style={{
              width: `${width}%`,
              background: barColor,
              transition: 'width 1.1s cubic-bezier(0.22,1,0.36,1)',
            }}
          />

          {/* Main Progress */}
          <div
            className="relative h-full rounded-full"
            style={{
              width: `${width}%`,
              background: `linear-gradient(to right, ${barColor}, ${barColor}dd)`,
              transition: 'width 1.1s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-[#6f6f86]">
            AI evaluated metric
          </p>

          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: barColor,
            }}
          />
        </div>
      </div>
    </div>
  )
}