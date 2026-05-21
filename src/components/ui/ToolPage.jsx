import { useState } from 'react'
import Card, { CardTitle } from './Card'
import Button from './Button'
import InputTabs from './InputTabs'
import UploadArea from './UploadArea'
import LoadingState from './LoadingState'
import ResultsDashboard from './ResultsDashboard'
import PageHeader from './PageHeader'
import { analyzeResume } from '../../utils/api'
import { useAnalysis } from '../../hooks/useAnalysis'
import { extractPdfText } from '../../utils/pdfText'
import { validateAnalysisInputs } from '../../utils/validation'
import { useToast } from '../../context/ToastContext'

export default function ToolPage({ tool }) {
  const { recordAnalysis } = useAnalysis()

  const { push: toast } = useToast()

  const [resumeMode, setResumeMode] = useState('upload')
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeText, setResumeText] = useState('')

  const [jdMode, setJdMode] = useState('upload')
  const [jdFile, setJdFile] = useState(null)
  const [jdText, setJdText] = useState('')

  const [state, setState] = useState('idle')
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')

  const getResumeInput = () => {
    if (resumeMode === 'upload') return resumeFile

    return resumeText
  }

  const getJdInput = () => {
    if (jdMode === 'upload') return jdFile

    return jdText
  }

  const resolveText = async ({
    mode,
    file,
    text,
    emptyMessage,
  }) => {
    if (mode === 'paste') {
      return text.trim() || ''
    }

    if (!file) {
      return ''
    }

    try {
      const { text: extracted } = await extractPdfText(file)

      if (!extracted.trim()) {
        throw new Error(emptyMessage)
      }

      return extracted.trim()
    } catch (e) {
      if (e?.message) {
        throw e
      }

      throw new Error(emptyMessage)
    }
  }

  const handleAnalyze = async () => {
    setError('')

    const resumeInput = getResumeInput()

    if (
      !resumeInput ||
      (typeof resumeInput === 'string' &&
        !resumeInput.trim())
    ) {
      setError('Please upload a valid resume')

      return
    }

    const jdInput = tool.needsJD
      ? getJdInput()
      : null

    if (
      tool.needsJD &&
      (!jdInput ||
        (typeof jdInput === 'string' &&
          !jdInput.trim()))
    ) {
      setError('Job description too short')

      return
    }

    setState('loading')

    try {
      const resumeContent = await resolveText({
        mode: resumeMode,
        file: resumeFile,
        text: resumeText,
        emptyMessage: 'Please upload a valid resume',
      })

      const jdContent = tool.needsJD
        ? await resolveText({
            mode: jdMode,
            file: jdFile,
            text: jdText,
            emptyMessage: 'Job description too short',
          })
        : ''

      const validation = validateAnalysisInputs({
        resumeText: resumeContent,
        jdText: jdContent,
        needsJD: tool.needsJD,
      })

      if (!validation.ok) {
        setState('idle')
        setError(validation.message)

        return
      }

      const data = await analyzeResume({
        toolId: tool.id,
        toolName: tool.name,
        resumeContent,
        jdContent,
      })

      setResults(data)

      recordAnalysis(data.atsScore)

      setState('results')

      toast({
        message: 'Analysis completed successfully.',
        variant: 'success',
      })
    } catch (err) {
      console.error(err)

      setResults(null)

      setState('idle')

      setError(
        err?.message ||
          'Analysis failed. Please try again.'
      )
    }
  }

  const handleReset = () => {
    setState('idle')

    setResults(null)

    setResumeFile(null)

    setResumeText('')

    setJdFile(null)

    setJdText('')

    setError('')
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
      <PageHeader
        title={tool.name}
        subtitle={tool.desc}
        breadcrumb={tool.shortName}
      />

      {state === 'idle' && (
        <div className="space-y-6">
          {/* Resume Section */}
          <Card className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#13131c] shadow-xl hover:border-indigo-500/10 transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <CardTitle>
                    Resume Input
                  </CardTitle>

                  <p className="text-sm text-[#7d7d94] mt-1">
                    Upload or paste your resume
                    for AI-powered analysis.
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 text-xs text-[#6f6f86] bg-white/5 border border-white/5 rounded-full px-3 py-1.5">
                  AI Ready
                </div>
              </div>

              <InputTabs
                active={resumeMode}
                onChange={setResumeMode}
              />

              <div className="mt-5">
                {resumeMode === 'upload' ? (
                  <UploadArea
                    file={resumeFile}
                    onFile={setResumeFile}
                    onRemove={() =>
                      setResumeFile(null)
                    }
                    label="resume"
                  />
                ) : (
                  <textarea
                    value={resumeText}
                    onChange={e =>
                      setResumeText(e.target.value)
                    }
                    placeholder="Paste your full resume text here..."
                    className="w-full px-5 py-4 bg-[#1a1a24] border border-white/5 rounded-[1.4rem] text-sm text-[#e8e8f0] placeholder-[#5a5a70] outline-none focus:border-indigo-500/30 focus:bg-[#1d1d29] focus:ring-4 focus:ring-indigo-500/5 resize-y leading-relaxed transition-all duration-300 min-h-[180px]"
                    rows={8}
                  />
                )}
              </div>
            </div>
          </Card>

          {/* JD Section */}
          {tool.needsJD && (
            <Card className="group rounded-[2rem] border border-white/5 bg-[#13131c] shadow-xl hover:border-indigo-500/10 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <CardTitle>
                    Job Description
                  </CardTitle>

                  <p className="text-sm text-[#7d7d94] mt-1">
                    Match your resume against
                    specific role requirements.
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 text-xs text-[#6f6f86] bg-white/5 border border-white/5 rounded-full px-3 py-1.5">
                  Smart Match
                </div>
              </div>

              <InputTabs
                active={jdMode}
                onChange={setJdMode}
              />

              <div className="mt-5">
                {jdMode === 'upload' ? (
                  <UploadArea
                    file={jdFile}
                    onFile={setJdFile}
                    onRemove={() =>
                      setJdFile(null)
                    }
                    label="job description"
                  />
                ) : (
                  <textarea
                    value={jdText}
                    onChange={e =>
                      setJdText(e.target.value)
                    }
                    placeholder="Paste the job description here..."
                    className="w-full px-5 py-4 bg-[#1a1a24] border border-white/5 rounded-[1.4rem] text-sm text-[#e8e8f0] placeholder-[#5a5a70] outline-none focus:border-indigo-500/30 focus:bg-[#1d1d29] focus:ring-4 focus:ring-indigo-500/5 resize-y leading-relaxed transition-all duration-300 min-h-[150px]"
                    rows={6}
                  />
                )}
              </div>
            </Card>
          )}

          {/* CTA */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
            <Button
              onClick={handleAnalyze}
              size="lg"
            >
              ◎ Run AI Analysis
            </Button>

            {error && (
              <div className="flex-1 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300 leading-relaxed">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {state === 'loading' && (
        <LoadingState
          toolId={tool.id}
          toolLabel={tool.shortName}
        />
      )}

      {state === 'results' &&
        results && (
          <ResultsDashboard
            data={results}
            onReset={handleReset}
            tool={tool}
          />
        )}
    </div>
  )
}