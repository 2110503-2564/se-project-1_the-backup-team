import { Suspense } from 'react'

import EditModalContainer from '@/components/EditModalContainer'
import EventsView from '@/components/events'
import NotFound from '@/components/not-found'
import PaginationBar from '@/components/pagination'
import SpacesSkeleton from '@/components/spaces-skeleton'
import EditEventModalProvider from '@/context/event-status'
import { SpacesPageParams } from '@/interfaces/interface'
import { fetchEvents } from '@/repo/events'
import { fetchSpaces } from '@/repo/spaces'

const EventsPage = async (props: {
  searchParams: Promise<SpacesPageParams>
}) => {
  const searchParams = await props.searchParams
  const currentPage = parseInt(searchParams.page || '1')
  try {
    const { events, pagination } = await fetchEvents(currentPage, 6)

    return (
      <Suspense fallback={<SpacesSkeleton />}>
        <div className='flex flex-col gap-8'>
          <EditEventModalProvider>
            <EventsView events={events} />
            <EditModalContainer></EditModalContainer>
          </EditEventModalProvider>

          {pagination.totalPages > 1 && (
            <PaginationBar
              currentPage={currentPage}
              pagination={pagination}
              paginationFor='events'
            />
          )}
        </div>
      </Suspense>
    )
  } catch (_) {
    return <NotFound message='Unable to load events' retryPath='/spaces' />
  }
}

export default EventsPage
