import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAnalysis } from '../hooks/useAnalysis'
import { TOOLS } from '../utils/constants'
import PageHeader from '../components/ui/PageHeader'

export default function Dashboard() {
  const { user } = useAuth()
  const { count, lastAts } = useAnalysis()
  const navigate = useNavigate()

  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="w-full space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-[#171726] via-[#111118] to-[#0f0f16] p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />

        <div className="relative z-10">
          <PageHeader
            title={`Welcome back, ${firstName} 👋`}
            subtitle="Analyze, optimize, and strengthen your resume using intelligent AI-powered insights."
          />

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => navigate('/resume-analyzer')}
              className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/20"
            >
              Start Analysis
            </button>

            <button
              onClick={() => navigate('/ats-checker')}
              className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-[#d7d7e0] text-sm font-medium transition-all duration-200"
            >
              Check ATS Score
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          label="Analyses Run"
          value={count}
          sub="Total resume analyses completed"
        />

        <StatCard
          label="Last ATS Score"
          value={lastAts || '—'}
          sub="Most recent evaluation result"
          highlight
        />

        <StatCard
          label="AI Tools"
          value="6"
          sub="All premium tools unlocked"
        />
      </div>

      {/* Tools Section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              AI-Powered Resume Tools
            </h2>

            <p className="text-sm text-[#7d7d94] mt-1">
              Smart tools designed to improve resume quality and hiring success.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {TOOLS.map(tool => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onClick={() => navigate(tool.path)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, highlight }) {
  return (
    <div
      className={`rounded-3xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        highlight
          ? 'bg-gradient-to-br from-indigo-500/10 to-violet-500/5 border-indigo-500/20'
          : 'bg-[#13131c] border-white/5'
      }`}
    >
      <p className="text-xs uppercase tracking-wider text-[#7d7d94] font-medium mb-3">
        {label}
      </p>

      <p className="text-3xl font-semibold text-white tracking-tight">
        {value}
      </p>

      <p className="text-sm text-[#7d7d94] mt-2 leading-relaxed">
        {sub}
      </p>
    </div>
  )
}

function ToolCard({ tool, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#13131c] p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" />

      <div
        className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center text-lg mb-5 ${tool.iconBg} ${tool.iconColor}`}
      >
        {tool.icon}
      </div>

      <div className="relative z-10">
        <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
          {tool.name}
        </h3>

        <p className="text-sm text-[#8c8ca3] leading-relaxed">
          {tool.desc}
        </p>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between">
        <span className="text-xs text-[#6f6f86]">
          AI Powered
        </span>

        <span className="text-[#6f6f86] group-hover:text-indigo-400 transition-all duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
    </button>
  )
}