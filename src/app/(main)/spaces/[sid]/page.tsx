import { getServerSession } from 'next-auth'

import NotFound from '@/components/not-found'
import SpaceDetailClient from '@/components/space-detail'
import { authOptions } from '@/lib/auth-options'
import { fetchReservations } from '@/repo/reservations'
import { getReviews } from '@/repo/reviews'
import { getSpaceById } from '@/repo/spaces'

const SpacePage = async ({ params }: { params: Promise<{ sid: string }> }) => {
  const session = await getServerSession(authOptions)
  const { sid } = await params

  try {
    const space = await getSpaceById(sid)
    if (!space) throw new Error()

    const reservation = await fetchReservations(session?.accessToken || '')
    const reviews = await getReviews(sid)

    return (
      <SpaceDetailClient
        space={space}
        reservations={reservation}
        reviews={reviews.data}
      />
    )
  } catch (_) {
    return <NotFound message='Unable to load this space' retryPath='/spaces' />
  }
}

export default SpacePage
