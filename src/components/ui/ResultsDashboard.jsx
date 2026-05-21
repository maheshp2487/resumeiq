import { useNavigate } from 'react-router-dom'
import ScoreRing from './ScoreRing'
import MetricBar from './MetricBar'
import Button from './Button'
import { getConfidenceStyle, getScoreColor } from '../../utils/helpers'

function getRingConfig(tool, data) {
  const id = tool?.id || ''

  if (id === 'jd-match') {
    const v = data.matchScore ?? data.atsScore
    return { score: v, label: 'Match' }
  }

  if (id === 'skill-gap') {
    const v = data.techSkillMatch ?? data.atsScore
    return { score: v, label: 'Coverage' }
  }

  if (id === 'ats-checker') {
    return { score: data.atsScore, label: 'ATS' }
  }

  if (id === 'resume-analyzer') {
    return { score: data.atsScore, label: 'Quality' }
  }

  if (id === 'improvements') {
    return { score: data.atsScore, label: 'Lift' }
  }

  if (id === 'score-checker') {
    return { score: data.atsScore, label: 'Overall' }
  }

  return { score: data.atsScore, label: 'Score' }
}

function getBarLabels(tool) {
  const id = tool?.id || ''

  if (id === 'ats-checker') {
    return {
      a: 'ATS Compatibility',
      b: 'Keyword Fit',
      c: 'Technical Signals',
    }
  }

  if (id === 'resume-analyzer') {
    return {
      a: 'Content Quality',
      b: 'Role Alignment',
      c: 'Technical Depth',
    }
  }

  if (id === 'jd-match') {
    return {
      a: 'JD Alignment',
      b: 'Requirement Match',
      c: 'Stack Overlap',
    }
  }

  if (id === 'skill-gap') {
    return {
      a: 'Stack Coverage',
      b: 'Gap Analysis',
      c: 'Skill Evidence',
    }
  }

  return {
    a: 'Primary Score',
    b: 'Secondary Score',
    c: 'Technical Depth',
  }
}

export default function ResultsDashboard({ data, onReset, tool }) {
  const navigate = useNavigate()

  const confStyle = getConfidenceStyle(data.hiringConfidence)

  const ring = getRingConfig(tool, data)

  const bars = getBarLabels(tool)

  const barB =
    tool?.needsJD
      ? data.matchScore ?? data.atsScore
      : data.matchScore ?? Math.round(data.atsScore * 0.92)

  const barC =
    data.techSkillMatch ??
    Math.round((data.atsScore + (data.matchScore || data.atsScore)) / 2)

  return (
    <div className="space-y-6 animate-[fadeIn_0.45s_ease-out]">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-[2rem] border border-indigo-500/10 bg-gradient-to-br from-[#171726] via-[#12121b] to-[#101018] p-7 md:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          <ScoreRing score={ring.score} label={ring.label} />

          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[0.72rem] uppercase tracking-wider text-indigo-300 mb-4">
              AI Analysis Completed
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white mb-3">
              Your resume insights are ready
            </h2>

            <p className="text-[#9b9bb0] leading-relaxed max-w-2xl">
              ResumeIQ analyzed your resume for ATS performance, technical
              relevance, keyword optimization, and hiring alignment.
            </p>

            <div className="flex flex-wrap gap-3 mt-5 justify-center lg:justify-start">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm font-medium ${confStyle.bg} ${confStyle.border} ${confStyle.text}`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: confStyle.dot,
                  }}
                />

                {data.hiringConfidence} Hiring Confidence
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-sm text-[#d7d7e0]">
                Score:{' '}
                <span
                  className="font-semibold"
                  style={{
                    color: getScoreColor(ring.score),
                  }}
                >
                  {ring.score}/100
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricBar
          label={bars.a}
          value={data.atsScore}
          color="#6366f1"
        />

        <MetricBar
          label={bars.b}
          value={barB}
          color="#f59e0b"
        />

        <MetricBar
          label={bars.c}
          value={barC}
          color="#22c55e"
        />
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <TagSection
          title="Strengths"
          tags={data.strengths}
          variant="green"
          emptyHint="No strong areas detected."
        />

        <TagSection
          title="Missing Skills"
          tags={data.missingSkills}
          variant="red"
          emptyHint="No critical gaps identified."
        />
      </div>

      {/* Suggestions + Keywords */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <SuggestionSection
          title="AI Recommendations"
          items={data.suggestions}
          emptyHint="No suggestions available."
        />

        <div className="flex flex-col gap-5">
          <TagSection
            title="Keywords"
            tags={data.keywords}
            variant="blue"
            emptyHint="No keywords extracted."
          />

          <TagSection
            title="Weak Areas"
            tags={data.weakAreas}
            variant="amber"
            emptyHint="No major weak areas detected."
          />
        </div>
      </div>

      {/* Summary */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#13131c] p-6 md:p-7">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full" />

        <div className="relative z-10">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-indigo-300 font-semibold mb-4">
            Professional Summary
          </p>

          <p className="text-[#c7c7d4] leading-relaxed text-sm md:text-[0.95rem]">
            {data.summary}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 pt-1">
        <Button onClick={onReset} variant="outline">
          + Run New Analysis
        </Button>

        <Button
          onClick={() => navigate('/dashboard')}
          variant="ghost"
        >
          ← Back to Dashboard
        </Button>
      </div>
    </div>
  )
}

function TagSection({
  title,
  tags = [],
  variant,
  emptyHint,
}) {
  const variantMap = {
    green:
      'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',

    red:
      'bg-red-500/10 border-red-500/20 text-red-300',

    blue:
      'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',

    amber:
      'bg-amber-500/10 border-amber-500/20 text-amber-300',
  }

  const has = Array.isArray(tags) && tags.length > 0

  return (
    <div className="rounded-[2rem] border border-white/5 bg-[#13131c] p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold tracking-tight">
          {title}
        </h3>

        <div className="w-2 h-2 rounded-full bg-white/20" />
      </div>

      {has ? (
        <div className="flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span
              key={i}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${variantMap[variant]}`}
            >
              {t}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-[#6f6f86]">
          {emptyHint}
        </p>
      )}
    </div>
  )
}

function SuggestionSection({
  title,
  items = [],
  emptyHint,
}) {
  const has = Array.isArray(items) && items.length > 0

  return (
    <div className="rounded-[2rem] border border-white/5 bg-[#13131c] p-6">
      <h3 className="text-white font-semibold tracking-tight mb-5">
        {title}
      </h3>

      {has ? (
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm text-[#c7c7d4] leading-relaxed"
            >
              <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                →
              </div>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[#6f6f86]">
          {emptyHint}
        </p>
      )}
    </div>
  )
}