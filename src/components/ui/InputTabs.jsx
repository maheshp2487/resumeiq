export default function InputTabs({ active, onChange }) {
  return (
    <div className="inline-flex items-center gap-2 p-1 rounded-2xl bg-[#171720] border border-white/5">
      {[
        {
          key: 'upload',
          label: 'Upload PDF',
          icon: '⬆',
        },
        {
          key: 'paste',
          label: 'Paste Text',
          icon: '✎',
        },
      ].map(mode => {
        const isActive = active === mode.key

        return (
          <button
            key={mode.key}
            onClick={() => onChange(mode.key)}
            className={`
              relative overflow-hidden
              px-4 py-2.5
              rounded-xl
              text-sm font-medium
              transition-all duration-300
              flex items-center gap-2
              ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500/15 to-violet-500/10 text-white border border-indigo-500/10 shadow-lg shadow-indigo-500/5'
                  : 'text-[#8c8ca3] hover:text-white hover:bg-white/5'
              }
            `}
          >
            {/* Glow */}
            {isActive && (
              <div className="absolute inset-0 bg-indigo-500/5 blur-xl" />
            )}

            <span className="relative z-10 text-[0.9rem]">
              {mode.icon}
            </span>

            <span className="relative z-10 tracking-tight">
              {mode.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}