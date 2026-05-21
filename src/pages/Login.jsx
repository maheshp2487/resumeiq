import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  const { login } = useAuth()

  const navigate = useNavigate()

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.')

      return
    }

    setLoading(true)

    try {
      login(email.trim(), password)

      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] flex items-center justify-center px-4 py-10">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-indigo-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-violet-500/10 blur-3xl rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        {/* Branding */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 rounded-[1.7rem] bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-2xl shadow-2xl shadow-indigo-500/20 mb-5">
            IQ
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Welcome back
          </h1>

          <p className="text-[#8c8ca3] mt-3 leading-relaxed max-w-sm">
            Sign in to continue optimizing your resume with AI-powered career intelligence.
          </p>
        </div>

        {/* Login Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#13131c]/95 backdrop-blur-xl p-8 shadow-2xl">
          {/* Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full" />

          <div className="relative z-10">
            {/* Error */}
            {error && (
              <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-300 leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                loading={loading}
                className="justify-center mt-2"
                size="lg"
              >
                Sign In to ResumeIQ
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-7">
              <div className="flex-1 h-px bg-white/5" />

              <span className="text-xs uppercase tracking-widest text-[#5f5f75]">
                Resume Intelligence
              </span>

              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-[#7d7d94]">
              Don&apos;t have an account?{' '}

              <Link
                to="/signup"
                className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                Create one free
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <p className="text-center text-xs text-[#4f4f63] mt-7 tracking-wide">
          ResumeIQ • AI-Powered Career Platform
        </p>
      </div>
    </div>
  )
}