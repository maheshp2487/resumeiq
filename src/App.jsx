import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/layout/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AtsChecker from './pages/AtsChecker'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import JdMatch from './pages/JdMatch'
import SkillGap from './pages/SkillGap'
import Improvements from './pages/Improvements'
import ScoreChecker from './pages/ScoreChecker'
import About from './pages/About'

export default function App() {
  useEffect(() => {
    document.title = 'ResumeIQ'
  }, [])

  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes inside AppLayout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ats-checker" element={<AtsChecker />} />
          <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
          <Route path="jd-match" element={<JdMatch />} />
          <Route path="skill-gap" element={<SkillGap />} />
          <Route path="improvements" element={<Improvements />} />
          <Route path="score-checker" element={<ScoreChecker />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  )
}