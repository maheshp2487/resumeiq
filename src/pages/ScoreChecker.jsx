import ToolPage from '../components/ui/ToolPage'
import { TOOLS } from '../utils/constants'

export default function ScoreChecker() {
  return <ToolPage tool={TOOLS.find(t => t.id === 'score-checker')} />
}
