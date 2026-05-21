export default function Input({
  label,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[0.82rem] font-medium tracking-wide text-[#b3b3c7]">
          {label}
        </label>
      )}

      <div className="relative group">
        {/* Glow */}
        <div
          className={`
            absolute inset-0 rounded-2xl opacity-0 blur-xl transition-all duration-300
            ${
              error
                ? 'bg-red-500/10 group-focus-within:opacity-100'
                : 'bg-indigo-500/10 group-focus-within:opacity-100'
            }
          `}
        />

        <input
          className={`
            relative z-10
            w-full
            px-4 py-3
            rounded-2xl
            bg-[#1a1a24]
            border
            text-[#f3f3f7]
            text-sm
            outline-none
            transition-all duration-300
            placeholder:text-[#5f5f75]
            backdrop-blur-xl
            ${
              error
                ? 'border-red-500/30 focus:border-red-500/60'
                : 'border-white/5 focus:border-indigo-500/30 focus:bg-[#1d1d29]'
            }
            focus:shadow-lg
            focus:shadow-indigo-500/5
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs text-red-300 leading-relaxed px-1">
          {error}
        </p>
      )}
    </div>
  )
}