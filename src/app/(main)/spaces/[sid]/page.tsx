import { getServerSession } from 'next-auth'

import NotFound from '@/components/not-found'
import SpaceDetailClient from '@/components/space-detail'
import { authOptions } from '@/lib/auth-options'
import { fetchReservations } from '@/repo/reservations'
import { getReviews } from '@/repo/reviews'
import { getSpaceById } from '@/repo/spaces'

const SpacePage = async ({ params }: { params: { sid: string } }) => {
  const session = await getServerSession(authOptions)

  try {
    const space = await getSpaceById(params.sid)
    if (!space) throw new Error()

    const reservation = await fetchReservations(session?.accessToken || '')
    const reviews = await getReviews(params.sid)

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
