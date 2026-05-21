function normalizeText(input) {
  return (input || '').replace(/\s+/g, ' ').trim()
}

function tokenize(text) {
  return normalizeText(text)
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/i)
    .filter(Boolean)
}

function uniqueWordCount(text) {
  return new Set(tokenize(text)).size
}

/** Repeated same token (e.g. "hello hello hello") */
function isDominantRepetition(text) {
  const tokens = tokenize(text)
  if (tokens.length < 4) return false
  const counts = {}
  for (const t of tokens) {
    counts[t] = (counts[t] || 0) + 1
  }
  const max = Math.max(...Object.values(counts))
  return max / tokens.length > 0.45
}

/** Looks like keyboard mashing: many long nonsense tokens */
function looksLikeKeyboardSpam(text) {
  const tokens = tokenize(text)
  if (tokens.length === 0) return true
  const suspicious = tokens.filter(t => t.length >= 8 && !/[aeiou]/i.test(t)).length
  return suspicious / tokens.length > 0.35 && tokens.length >= 3
}

/**
 * Weak signal but still "content" — not spam.
 * Beginner resumes often lack traditional section headers.
 */
function hasResumeLikeSignals(text) {
  const t = text.toLowerCase()
  const blobSignals = [
    /\b(react|vue|angular|node|javascript|typescript|python|java|sql|tailwind|css|html)\b/i.test(t),
    /\b(intern|internship|freelance|freelancer|student|university|college|bootcamp)\b/i.test(t),
    /\b(project|portfolio|github|website|app|built|developed)\b/i.test(t),
    /\b(skill|experience|education|summary|objective|work)\b/i.test(t),
    /\b(engineer|developer|designer|analyst)\b/i.test(t),
    /@/.test(t),
    /\b(20\d{2}|19\d{2})\b/.test(t),
    /\b(work|employment|job|role|company|employer|created|managed|responsible|assisted)\b/i.test(t),
  ]
  return blobSignals.filter(Boolean).length >= 1
}

function hasJobLikeSignals(text) {
  const t = text.toLowerCase()
  const blobSignals = [
    /\b(intern|internship|full[\s-]?time|part[\s-]?time|contract|remote|hybrid)\b/i.test(t),
    /\b(requirement|responsibilit|qualification|experience with|must have|nice to have|preferred)\b/i.test(t),
    /\b(we are|you will|looking for|join (our|the) team)\b/i.test(t),
    /\b(react|python|aws|docker|kubernetes|sql)\b/i.test(t),
    /\$\d|\b(salary|compensation)\b/i.test(t),
  ]
  return blobSignals.filter(Boolean).length >= 1
}

function isJunkOrSpam(text) {
  const t = normalizeText(text)
  if (!t.length) return true
  // Single token junk
  if (/^[a-z]$/i.test(t) && t.length <= 2) return true
  const tokens = tokenize(t)

  if (tokens.length <= 1 && t.length < 25) return true
  if (isDominantRepetition(t)) return true
  if (looksLikeKeyboardSpam(t)) return true

  const uniq = uniqueWordCount(t)
  // Very low variety relative to length — likely spam or nonsense
  if (t.length > 120 && uniq < 4) return true
  if (t.length > 40 && uniq <= 2) return true

  return false
}

const MIN_RESUME_CHARS = 80
const MIN_RESUME_CHARS_WITH_SIGNALS = 45
const MIN_JD_CHARS = 80
const MIN_JD_CHARS_WITH_SIGNALS = 45

export function validateAnalysisInputs({ resumeText, jdText, needsJD }) {
  const resume = normalizeText(resumeText)
  const jd = normalizeText(jdText)

  if (!resume.length) {
    return { ok: false, message: 'Please upload a valid resume' }
  }

  if (isJunkOrSpam(resume)) {
    return { ok: false, message: 'Insufficient content for analysis' }
  }

  const resumeLongEnough =
    resume.length >= MIN_RESUME_CHARS ||
    (resume.length >= MIN_RESUME_CHARS_WITH_SIGNALS && hasResumeLikeSignals(resume))

  if (!resumeLongEnough) {
    return { ok: false, message: 'Insufficient content for analysis' }
  }

  if (needsJD) {
    if (!jd.length) {
      return { ok: false, message: 'Job description too short' }
    }
    if (isJunkOrSpam(jd)) {
      return { ok: false, message: 'Job description too short' }
    }
    const jdLongEnough =
      jd.length >= MIN_JD_CHARS ||
      (jd.length >= MIN_JD_CHARS_WITH_SIGNALS && hasJobLikeSignals(jd))

    if (!jdLongEnough) {
      return { ok: false, message: 'Job description too short' }
    }
  }

  return { ok: true }
}
