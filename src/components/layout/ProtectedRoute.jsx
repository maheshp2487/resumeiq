import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center">
          {/* Glow */}
          <div className="absolute w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full" />

          {/* Loader */}
          <div className="relative z-10 w-20 h-20 rounded-full border border-white/5 bg-white/[0.03] flex items-center justify-center backdrop-blur-xl shadow-2xl">
            <div className="w-10 h-10 border-[3px] border-indigo-500/20 border-t-indigo-400 rounded-full animate-spin" />
          </div>

          {/* Branding */}
          <div className="relative z-10 mt-6 text-center">
            <h2 className="text-white text-xl font-semibold tracking-tight">
              ResumeIQ
            </h2>

            <p className="text-[#8c8ca3] text-sm mt-2">
              Preparing your workspace...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}