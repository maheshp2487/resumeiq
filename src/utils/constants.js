export const TOOLS = [
  {
    id: 'ats-checker',
    name: 'ATS Resume Checker',
    shortName: 'ATS Checker',
    icon: '◉',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    desc: 'Analyze how well your resume performs with Applicant Tracking Systems used by modern recruiters.',
    needsJD: false,
    path: '/ats-checker',
  },

  {
    id: 'resume-analyzer',
    name: 'Resume Analyzer',
    shortName: 'Analyzer',
    icon: '◎',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
    desc: 'Receive detailed AI insights on resume quality, structure, impact, and technical depth.',
    needsJD: false,
    path: '/resume-analyzer',
  },

  {
    id: 'jd-match',
    name: 'Resume vs Job Match',
    shortName: 'JD Match',
    icon: '⇄',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    desc: 'Compare your resume against a target role and measure alignment with job requirements.',
    needsJD: true,
    path: '/jd-match',
  },

  {
    id: 'skill-gap',
    name: 'Skill Gap Analysis',
    shortName: 'Skill Gap',
    icon: '◈',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    desc: 'Identify missing technical skills and discover what to improve for your target position.',
    needsJD: true,
    path: '/skill-gap',
  },

  {
    id: 'improvements',
    name: 'Resume Improvements',
    shortName: 'Improvements',
    icon: '↑',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    desc: 'Generate actionable suggestions to strengthen resume clarity, impact, and recruiter appeal.',
    needsJD: false,
    path: '/improvements',
  },

  {
    id: 'score-checker',
    name: 'Resume Score',
    shortName: 'Score',
    icon: '★',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
    desc: 'Get an overall resume score with detailed evaluation across critical hiring metrics.',
    needsJD: false,
    path: '/score-checker',
  },
]

export const LOADING_STEPS_DEFAULT = [
  'Reading resume text...',
  'Validating input quality...',
  'Calling AI model...',
  'Structuring results...',
  'Almost done...',
]

export function getLoadingSteps(toolId) {
  const id = String(toolId || '')

  const base = [
    'Extracting text from your upload...',
    'Validating content...',
    'Running AI analysis...',
  ]

  if (id.includes('ats-checker')) {
    return [
      ...base,
      'Checking ATS parsing & formatting signals...',
      'Compiling ATS report...',
    ]
  }

  if (id.includes('resume-analyzer')) {
    return [
      ...base,
      'Reviewing impact, clarity, and structure...',
      'Building quality assessment...',
    ]
  }

  if (id.includes('jd-match')) {
    return [
      ...base,
      'Comparing resume vs job description...',
      'Computing alignment & gaps...',
    ]
  }

  if (id.includes('skill-gap')) {
    return [
      ...base,
      'Mapping required vs demonstrated skills...',
      'Prioritizing learning roadmap...',
    ]
  }

  if (id.includes('improvements')) {
    return [
      ...base,
      'Drafting rewrite-ready suggestions...',
      'Polishing recommendations...',
    ]
  }

  if (id.includes('score-checker')) {
    return [
      ...base,
      'Scoring categories with weights...',
      'Finalizing employability summary...',
    ]
  }

  return [...LOADING_STEPS_DEFAULT]
}