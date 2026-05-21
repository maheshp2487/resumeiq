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
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[270px] min-w-[270px] bg-[#101017]/95 border-r border-white/5 backdrop-blur-xl flex-col py-6 px-3 shadow-2xl">
        {/* Branding */}
        <div className="flex items-center gap-3 px-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">
            IQ
          </div>

          <div>
            <h1 className="text-white font-semibold text-[1rem]">
              ResumeIQ
            </h1>

            <p className="text-[#7d7d94] text-[0.72rem]">
              Smart Resume Intelligence
            </p>
          </div>
        </div>

        {/* Dashboard */}
        <div className="mb-5">
          <NavItem
            path="/dashboard"
            icon="◈"
            label="Dashboard"
          />
        </div>

        {/* Tools */}
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

        {/* About */}
        <div className="mt-5">
          <NavItem
            path="/about"
            icon="ℹ"
            label="About"
          />
        </div>

        {/* User */}
        <div className="mt-auto px-2">
          <div className="bg-[#171720] border border-white/5 rounded-[1.7rem] px-3 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-semibold">
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
              className="text-[#7d7d94] hover:text-red-400"
            >
              ⏻
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#101017]/95 border-t border-white/5 backdrop-blur-xl">
        <div className="flex items-center justify-around px-2 py-2">
          <MobileItem
            path="/dashboard"
            icon="◈"
            label="Home"
          />

          <MobileItem
            path="/ats-checker"
            icon="◉"
            label="ATS"
          />

          <MobileItem
            path="/resume-analyzer"
            icon="◎"
            label="AI"
          />

          <MobileItem
            path="/about"
            icon="ℹ"
            label="About"
          />

          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center text-[#8c8ca3] text-xs"
          >
            <span className="text-lg">⏻</span>
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

function NavItem({ path, icon, label }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-3 py-3 mx-1 rounded-xl text-[0.88rem] transition-all duration-200 ${
          isActive
            ? 'bg-gradient-to-r from-indigo-500/15 to-violet-500/10 text-indigo-300 border border-indigo-500/10'
            : 'text-[#9b9bb0] hover:bg-white/5 hover:text-white'
        }`
      }
    >
      <span className="w-5 text-center">
        {icon}
      </span>

      <span>{label}</span>
    </NavLink>
  )
}

function MobileItem({ path, icon, label }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center text-xs transition-all ${
          isActive
            ? 'text-indigo-300'
            : 'text-[#8c8ca3]'
        }`
      }
    >
      <span className="text-lg">
        {icon}
      </span>

      {label}
    </NavLink>
  )
}