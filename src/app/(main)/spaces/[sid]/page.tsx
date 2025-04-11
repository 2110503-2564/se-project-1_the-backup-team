import SpaceDetailClient from '@/components/space-detail'
import SpaceDetailSkeleton from '@/components/space-detail-skeleton'
import { getSpaceById } from '@/repo/spaces'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

const SpaceDetailLoader = async ({ spaceID }: { spaceID: string }) => {
  let space
  try {
    space = await getSpaceById(spaceID)
    if (!space) notFound()
    return <SpaceDetailClient space={space} />
  } catch (_) {
    notFound()
  }
}

const SpacePage = async ({ params }: { params: { sid: string } }) => {
  return (
    <Suspense fallback={<SpaceDetailSkeleton />}>
      <SpaceDetailLoader spaceID={params.sid} />
    </Suspense>
  )
}

export default SpacePage
