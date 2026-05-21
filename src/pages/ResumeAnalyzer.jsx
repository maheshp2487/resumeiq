import ToolPage from '../components/ui/ToolPage'
import { TOOLS } from '../utils/constants'

export default function ResumeAnalyzer() {
  return <ToolPage tool={TOOLS.find(t => t.id === 'resume-analyzer')} />
}
