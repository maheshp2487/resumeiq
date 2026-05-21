import { useNavigate } from 'react-router-dom'

export default function PageHeader({ title, subtitle, breadcrumb }) {
  const navigate = useNavigate()

  return (
    <div className="mb-8">
      {breadcrumb && (
        <div className="flex items-center gap-2 text-[0.78rem] text-[#6f6f86] mb-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="hover:text-white transition-colors duration-200"
          >
            Dashboard
          </button>

          <span className="text-[#44445a]">/</span>

          <span className="text-[#a0a0b8]">
            {breadcrumb}
          </span>
        </div>
      )}

      <div className="space-y-2">
        <h1 className="text-3xl md:text-[2rem] font-semibold tracking-tight text-white leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-[0.95rem] text-[#8c8ca3] leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}