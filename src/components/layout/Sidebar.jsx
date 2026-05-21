import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getInitials } from '../../utils/helpers'
import { TOOLS } from '../../utils/constants'

export default function Sidebar() {
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()

    navigate('/login')
  }

  return (
    <aside className="w-[270px] min-w-[270px] bg-[#101017]/95 border-r border-white/5 backdrop-blur-xl flex flex-col py-6 px-3 shadow-2xl">
      {/* Branding */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
          IQ
        </div>

        <div>
          <h1 className="text-white font-semibold text-[1rem] tracking-tight">
            ResumeIQ
          </h1>

          <p className="text-[#7d7d94] text-[0.72rem]">
            Smart Resume Intelligence
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mb-5">
        <p className="px-3 mb-2 text-[0.66rem] font-semibold text-[#5f5f75] uppercase tracking-[0.18em]">
          Workspace
        </p>

        <NavItem
          path="/dashboard"
          icon="◈"
          label="Dashboard"
        />
      </div>

      {/* AI Tools */}
      <div className="mb-5">
        <p className="px-3 mb-2 text-[0.66rem] font-semibold text-[#5f5f75] uppercase tracking-[0.18em]">
          AI Tools
        </p>

        <div className="space-y-1">
          {TOOLS.map(tool => (
            <NavItem
              key={tool.id}
              path={tool.path}
              icon={tool.icon}
              label={tool.shortName}
            />
          ))}
        </div>
      </div>

      {/* Insights Card */}
      <div className="mx-2 mb-6 rounded-[1.7rem] border border-indigo-500/10 bg-gradient-to-br from-indigo-500/10 to-transparent p-4">
        <p className="text-white text-[0.83rem] font-medium mb-1">
          AI Resume Insights
        </p>

        <p className="text-[#9b9bb0] text-[0.72rem] leading-relaxed">
          Improve ATS performance, optimize keywords, and enhance resume quality
          with intelligent AI analysis.
        </p>
      </div>

      {/* About */}
      <div className="mb-4">
        <p className="px-3 mb-2 text-[0.66rem] font-semibold text-[#5f5f75] uppercase tracking-[0.18em]">
          More
        </p>

        <NavItem
          path="/about"
          icon="ℹ"
          label="About"
        />
      </div>

      {/* User Section */}
      <div className="mt-auto px-2">
        <div className="bg-[#171720] border border-white/5 rounded-[1.7rem] px-3 py-3 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            {user ? getInitials(user.name) : 'U'}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white text-[0.83rem] font-medium truncate">
              {user?.name || 'User'}
            </p>

            <p className="text-[#7d7d94] text-[0.7rem]">
              ResumeIQ Free Plan
            </p>
          </div>

          <button
            onClick={handleLogout}
            title="Sign out"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#7d7d94] hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            ⏻
          </button>
        </div>
      </div>
    </aside>
  )
}

function NavItem({ path, icon, label }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-3 py-3 mx-1 rounded-xl text-[0.88rem] transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-indigo-500/15 to-violet-500/10 text-indigo-300 border border-indigo-500/10 shadow-lg shadow-indigo-500/5'
            : 'text-[#9b9bb0] hover:bg-white/5 hover:text-white'
        }`
      }
    >
      <span className="w-5 text-center text-[0.95rem] opacity-90">
        {icon}
      </span>

      <span className="font-medium tracking-tight">
        {label}
      </span>
    </NavLink>
  )
}