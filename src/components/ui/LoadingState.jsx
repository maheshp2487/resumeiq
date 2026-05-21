import { useEffect, useState } from 'react'
import { getLoadingSteps, LOADING_STEPS_DEFAULT } from '../../utils/constants'
import Card from './Card'

export default function LoadingState({ toolId, toolLabel }) {
  const steps = toolId ? getLoadingSteps(toolId) : LOADING_STEPS_DEFAULT

  const [stepIndex, setStepIndex] = useState(0)

  const total = steps.length

  const progress =
    total > 0
      ? Math.min(100, Math.round(((stepIndex + 1) / total) * 100))
      : 0

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex(i => Math.min(i + 1, total - 1))
    }, 700)

    return () => clearInterval(interval)
  }, [total])

  return (
    <Card className="overflow-hidden rounded-[2rem] border border-indigo-500/10 bg-gradient-to-br from-[#151522] via-[#111118] to-[#0f0f16] shadow-2xl shadow-black/20">
      <div className="relative overflow-hidden py-10 px-6">
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Animated Loader */}
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full border border-white/5 bg-white/5 backdrop-blur-xl flex items-center justify-center">
              <div className="w-12 h-12 border-[3px] border-indigo-500/20 border-t-indigo-400 rounded-full animate-spin" />
            </div>

            <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-pulse" />
          </div>

          {/* Header */}
          <div className="text-center max-w-lg">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-indigo-400 font-semibold mb-3">
              {toolLabel ? `${toolLabel} Analysis` : 'AI Analysis'}
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-white mb-3">
              Processing your resume
            </h2>

            <p className="text-sm text-[#8c8ca3] leading-relaxed">
              Our AI engine is analyzing resume quality, ATS performance,
              keyword optimization, and technical alignment.
            </p>
          </div>

          {/* Progress Section */}
          <div className="w-full max-w-xl mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#7d7d94] uppercase tracking-wider">
                Analysis Progress
              </span>

              <span className="text-sm font-semibold text-indigo-400">
                {progress}%
              </span>
            </div>

            <div className="h-3 rounded-full bg-[#1a1a24] overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="w-full max-w-xl mt-8 flex flex-col gap-3">
            {steps.map((step, i) => {
              const active = i === stepIndex
              const completed = i < stepIndex

              return (
                <div
                  key={i}
                  className={`
                    flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300
                    ${
                      active
                        ? 'bg-indigo-500/10 border border-indigo-500/10'
                        : completed
                          ? 'bg-emerald-500/5 border border-emerald-500/10'
                          : 'bg-white/[0.03] border border-white/[0.03]'
                    }
                  `}
                >
                  <div
                    className={`
                      w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300
                      ${
                        completed
                          ? 'bg-emerald-400'
                          : active
                            ? 'bg-indigo-400 animate-pulse'
                            : 'bg-[#4a4a5f]'
                      }
                    `}
                  />

                  <p
                    className={`
                      text-sm transition-colors duration-300
                      ${
                        completed
                          ? 'text-emerald-300'
                          : active
                            ? 'text-white'
                            : 'text-[#6f6f86]'
                      }
                    `}
                  >
                    {step}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-[#5f5f75]">
              This usually takes only a few seconds
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}