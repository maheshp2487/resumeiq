export default function Card({
  children,
  className = '',
  padding = true,
  hover = true,
}) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-[#13131c]
        border border-white/5
        rounded-3xl
        ${padding ? 'p-6' : ''}
        ${
          hover
            ? 'transition-all duration-300 hover:border-indigo-500/10 hover:shadow-2xl hover:shadow-indigo-500/5'
            : ''
        }
        ${className}
      `}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export function CardTitle({ children, className = '' }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h3
        className={`
          text-[1rem]
          font-semibold
          tracking-tight
          text-white
          ${className}
        `}
      >
        {children}
      </h3>
    </div>
  )
}