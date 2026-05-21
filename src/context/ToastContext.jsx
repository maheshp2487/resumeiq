import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

const ToastContext = createContext(null)

let idSeq = 0

export function ToastProvider({
  children,
}) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback(id => {
    setToasts(prev =>
      prev.filter(t => t.id !== id)
    )
  }, [])

  const push = useCallback(
    ({
      message,
      variant = 'info',
      duration = 3200,
    }) => {
      const id = ++idSeq

      setToasts(prev => [
        ...prev,
        {
          id,
          message,
          variant,
        },
      ])

      window.setTimeout(
        () => dismiss(id),
        duration
      )
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
    <ToastContext.Provider
      value={value}
    >
      {children}

      <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-[100] flex flex-col gap-3 w-[calc(100vw-2rem)] md:w-auto md:max-w-sm">
        {toasts.map(t => (
          <div
            key={t.id}
            className={`group relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-2xl px-4 py-4 animate-[toastIn_0.25s_ease-out]
              ${
                t.variant === 'success'
                  ? 'bg-[#13131c]/95 border-emerald-500/15'
                  : t.variant === 'error'
                    ? 'bg-[#13131c]/95 border-red-500/15'
                    : 'bg-[#13131c]/95 border-white/5'
              }`}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm flex-shrink-0
                  ${
                    t.variant === 'success'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : t.variant === 'error'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-indigo-500/10 text-indigo-400'
                  }`}
              >
                {t.variant === 'success'
                  ? '✓'
                  : t.variant === 'error'
                    ? '⚠'
                    : '◎'}
              </div>

              {/* Message */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm text-[#f1f1f5] leading-relaxed font-medium">
                  {t.message}
                </p>
              </div>

              {/* Close */}
              <button
                onClick={() =>
                  dismiss(t.id)
                }
                className="text-[#6f6f86] hover:text-white transition-colors text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)

  if (!ctx) {
    throw new Error(
      'useToast must be used within ToastProvider'
    )
  }

  return ctx
}