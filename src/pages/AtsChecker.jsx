import ToolPage from '../components/ui/ToolPage'
import { TOOLS } from '../utils/constants'

export default function AtsChecker() {
  return <ToolPage tool={TOOLS.find(t => t.id === 'ats-checker')} />
}
