import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'

export function useAnalysis() {
  const { user } = useAuth()
  const [count, setCount] = useState(0)
  const [lastAts, setLastAts] = useState(null)

  useEffect(() => {
    if (!user) return
    setCount(parseInt(localStorage.getItem(`rai_count_${user.id}`) || '0'))
    setLastAts(localStorage.getItem(`rai_ats_${user.id}`) || null)
  }, [user])

  const recordAnalysis = (atsScore) => {
    if (!user) return
    const newCount = count + 1
    setCount(newCount)
    localStorage.setItem(`rai_count_${user.id}`, newCount.toString())
    if (atsScore != null) {
      const label = `${atsScore}%`
      setLastAts(label)
      localStorage.setItem(`rai_ats_${user.id}`, label)
    }
  }

  return { count, lastAts, recordAnalysis }
}
