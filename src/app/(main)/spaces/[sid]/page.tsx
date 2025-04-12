import NotFound from '@/components/not-found'
import SpaceDetailClient from '@/components/space-detail'
import { getSpaceById } from '@/repo/spaces'

const SpacePage = async (props: { params: Promise<{ sid: string }> }) => {
  const params = await props.params
  try {
    const space = await getSpaceById(params.sid)
    if (!space) throw new Error()
    return <SpaceDetailClient space={space} />
  } catch (_) {
    return <NotFound message='Unable to load this space' retryPath='/spaces' />
  }
}

export default SpacePage
