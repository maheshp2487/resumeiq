export function getInitials(name = '') {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getScoreColor(score) {
  if (score >= 80) return '#22c55e'
  if (score >= 60) return '#f59e0b'
  return '#ef4444'
}

export function getScoreLabel(score) {
  if (score >= 80) return 'Excellent'
  if (score >= 65) return 'Good'
  if (score >= 50) return 'Fair'
  return 'Needs Work'
}

export function getConfidenceStyle(level) {
  switch (level) {
    case 'High':
      return { bg: 'bg-green-500/10', border: 'border-green-500/25', text: 'text-green-400', dot: '#22c55e' }
    case 'Low':
      return { bg: 'bg-red-500/10', border: 'border-red-500/25', text: 'text-red-400', dot: '#ef4444' }
    default:
      return { bg: 'bg-amber-500/10', border: 'border-amber-500/25', text: 'text-amber-400', dot: '#f59e0b' }
  }
}
