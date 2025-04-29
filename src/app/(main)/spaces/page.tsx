import { Suspense } from 'react'

import NotFound from '@/components/not-found'
import PaginationBar from '@/components/pagination'
import SpacesView from '@/components/spaces'
import SpacesSkeleton from '@/components/spaces-skeleton'
import { SpacesPageParams } from '@/interfaces/interface'
import { fetchSpaces } from '@/repo/spaces'

const SpacesPage = async (props: {
  searchParams: Promise<SpacesPageParams>
}) => {
  const searchParams = await props.searchParams
  const currentPage = parseInt(searchParams.page || '1')
  try {
    const { spaces, pagination } = await fetchSpaces(currentPage, 6)
    return (
      <Suspense fallback={<SpacesSkeleton />}>
        <div className='flex flex-col gap-8'>
          <SpacesView spaces={spaces} />
          {pagination.totalPages > 1 && (
            <PaginationBar
              currentPage={currentPage}
              pagination={pagination}
              paginationFor='spaces'
            />
          )}
        </div>
      </Suspense>
    )
  } catch (_) {
    return <NotFound message='Unable to load spaces' retryPath='/spaces' />
  }
}

export default SpacesPage
