import ToolPage from '../components/ui/ToolPage'
import { TOOLS } from '../utils/constants'

export default function SkillGap() {
  return <ToolPage tool={TOOLS.find(t => t.id === 'skill-gap')} />
}
