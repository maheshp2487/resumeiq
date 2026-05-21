export default function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  loading = false,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-2xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.985]'

  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-0.5',

    outline:
      'border border-white/10 bg-white/5 text-[#d0d0dc] hover:border-indigo-500/20 hover:bg-indigo-500/5 hover:text-white',

    ghost:
      'bg-transparent text-[#9b9bb0] hover:bg-white/5 hover:text-white',

    danger:
      'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20',
  }

  const sizes = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-[0.92rem]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}

      <span className="tracking-tight">
        {children}
      </span>
    </button>
  )
}