import Spaces from '@/components/spaces'
import SpacesSkeleton from '@/components/spaces-skeleton'
import { SpacesPageProps } from '@/interfaces/interface'
import { Suspense } from 'react'

const SpacesPage = ({ searchParams }: SpacesPageProps) => {
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1
  return (
    <Suspense fallback={<SpacesSkeleton />}>
      <Spaces currentPage={currentPage} />
    </Suspense>
  )
}

export default SpacesPage
