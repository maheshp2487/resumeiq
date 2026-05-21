import ToolPage from '../components/ui/ToolPage'
import { TOOLS } from '../utils/constants'

export default function JdMatch() {
  return <ToolPage tool={TOOLS.find(t => t.id === 'jd-match')} />
}
