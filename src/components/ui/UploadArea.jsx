import { useRef, useState } from 'react'
import { formatFileSize } from '../../utils/helpers'
import { useToast } from '../../context/ToastContext'

export default function UploadArea({
  file,
  onFile,
  onRemove,
  label = 'Resume PDF',
}) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const { push: toast } = useToast()

  const handleFile = f => {
    if (!f) return

    if (f.type !== 'application/pdf') {
      toast({
        message: 'Only PDF files are supported.',
        variant: 'error',
        duration: 4200,
      })

      return
    }

    onFile(f)

    toast({
      message: String(label).toLowerCase().includes('job')
        ? `Job description uploaded successfully`
        : `Resume uploaded successfully`,
      variant: 'success',
    })
  }

  const handleDrop = e => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  if (file) {
    return (
      <div className="group relative overflow-hidden rounded-3xl border border-indigo-500/10 bg-gradient-to-br from-[#181824] to-[#13131c] px-5 py-4 transition-all duration-300 hover:border-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/5">
        <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/5 blur-3xl rounded-full" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-400 text-lg flex-shrink-0">
            📄
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {file.name}
            </p>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-[#7d7d94]">
                {formatFileSize(file.size)}
              </span>

              <span className="w-1 h-1 rounded-full bg-[#4a4a5f]" />

              <span className="text-xs text-emerald-400">
                Ready for analysis
              </span>
            </div>
          </div>

          <button
            onClick={onRemove}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-500/10 text-[#7d7d94] hover:text-red-400 transition-all duration-200 flex items-center justify-center"
            title="Remove file"
          >
            ✕
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        onDragOver={e => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative overflow-hidden
          border rounded-3xl
          px-8 py-12
          text-center cursor-pointer
          transition-all duration-300
          ${
            dragging
              ? 'border-indigo-500/40 bg-indigo-500/5 shadow-2xl shadow-indigo-500/10 scale-[1.01]'
              : 'border-white/5 bg-[#13131c] hover:border-indigo-500/15 hover:bg-[#171722]'
          }
        `}
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col items-center">
          <div
            className={`
              w-16 h-16 rounded-2xl mb-5
              flex items-center justify-center
              text-2xl transition-all duration-300
              ${
                dragging
                  ? 'bg-indigo-500/15 text-indigo-300 scale-110'
                  : 'bg-white/5 text-[#7d7d94]'
              }
            `}
          >
            ⬆
          </div>

          <h3 className="text-white font-semibold text-[1rem] mb-2 tracking-tight">
            Upload your {label}
          </h3>

          <p className="text-sm text-[#8c8ca3] mb-5 max-w-sm leading-relaxed">
            Drag and drop your PDF file here or browse from your device for AI-powered analysis.
          </p>

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-sm text-[#d7d7e0] hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all duration-200">
            Browse Files
          </div>

          <p className="text-xs text-[#5f5f75] mt-5">
            PDF files only • Max quality extraction supported
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={e => handleFile(e.target.files[0])}
      />
    </div>
  )
}