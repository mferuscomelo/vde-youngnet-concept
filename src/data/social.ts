// Channels linked from vde.com/de/vde-youngnet (October 2026). Young Net has its own
// Instagram and social wall; LinkedIn is the VDE group page, labelled as such.

import type { IconName } from '../components/Icon'

export type Channel = { id: string; name: string; handle: string; url: string; icon: IconName; vde?: boolean }

export const CHANNELS: Channel[] = [
  { id: 'instagram', name: 'Instagram', handle: '@vdeyoungnet', url: 'https://www.instagram.com/vdeyoungnet/', icon: 'instagram' },
  { id: 'wall', name: 'Social Wall', handle: 'my.walls.io/youngnet', url: 'https://my.walls.io/youngnet', icon: 'grid' },
  { id: 'linkedin', name: 'LinkedIn', handle: 'VDE Group', url: 'https://www.linkedin.com/company/vde-group/', icon: 'linkedin', vde: true },
]
