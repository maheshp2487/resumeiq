import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

const ToastContext = createContext(null)

let idSeq = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback(id => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const push = useCallback(
    ({ message, variant = 'info', duration = 3800 }) => {
      const id = ++idSeq

      setToasts(prev => [
        ...prev,
        {
          id,
          message,
          variant,
        },
      ])

      window.setTimeout(() => dismiss(id), duration)
    },
    [dismiss]
  )

  const value = useMemo(
    () => ({
      push,
      dismiss,
    }),
    [push, dismiss]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast Container */}
      <div
        className="fixed top-5 right-5 z-[200] flex flex-col gap-3 w-[340px] max-w-[calc(100vw-2rem)] pointer-events-none"
        aria-live="polite"
      >
        {toasts.map(t => {
          const variants = {
            success: {
              icon: '✓',
              classes:
                'border-emerald-500/20 bg-[#141a16]/95 text-emerald-100',
              iconBg: 'bg-emerald-500/15 text-emerald-400',
            },

            error: {
              icon: '⚠',
              classes:
                'border-red-500/20 bg-[#1a1414]/95 text-red-100',
              iconBg: 'bg-red-500/15 text-red-400',
            },

            info: {
              icon: '◎',
              classes:
                'border-indigo-500/20 bg-[#13131c]/95 text-[#f2f2f7]',
              iconBg: 'bg-indigo-500/15 text-indigo-400',
            },
          }

          const current = variants[t.variant] || variants.info

          return (
            <div
              key={t.id}
              className={`
                pointer-events-auto
                relative overflow-hidden
                rounded-2xl border
                px-4 py-4
                shadow-2xl backdrop-blur-xl
                animate-[toastIn_0.35s_ease-out]
                transition-all duration-300
                ${current.classes}
              `}
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl rounded-full" />

              <div className="relative z-10 flex items-start gap-3">
                {/* Icon */}
                <div
                  className={`
                    w-9 h-9 rounded-xl
                    flex items-center justify-center
                    text-sm font-semibold flex-shrink-0
                    ${current.iconBg}
                  `}
                >
                  {current.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed font-medium">
                    {t.message}
                  </p>

                  <p className="text-[0.72rem] text-white/40 mt-1">
                    ResumeIQ Notification
                  </p>
                </div>

                {/* Close */}
                <button
                  onClick={() => dismiss(t.id)}
                  className="text-white/30 hover:text-white/70 transition-colors text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-white/30 animate-[toastProgress_linear_forwards]"
                  style={{
                    animationDuration: `${3800}ms`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)

  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return ctx
}