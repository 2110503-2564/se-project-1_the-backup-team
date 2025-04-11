import { Suspense } from 'react'
import ReservationsSkeleton from '@/components/reservations-skeleton'

import { fetchReservationsByUser } from '@/repo/reservations'
import { sortParams } from '@/types/reservations-filter'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { ReservationsPageParams } from '@/interfaces/interface'
import ReservationsLayoutSwitcher from '@/components/reservations-layout-switcher'
import ReservationsView from '@/components/reservations'
import ReservationsFilter from '@/components/reservations-filter'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'

export const dynamic = 'force-dynamic'

const ReservationsPage = async ({
  searchParams,
}: {
  searchParams: ReservationsPageParams
}) => {
  const sort = (searchParams.sort as sortParams) || 'date-desc'
  const layout = searchParams.layout || 'grid'
  const session = await getServerSession(authOptions)

  if (!session?.accessToken)
    return (
      <div className='p-8 text-center'>
        Please log in to view your reservations
      </div>
    )

  const reservations = await fetchReservationsByUser(session.accessToken, sort)

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col justify-end sm:flex-row gap-4'>
        <div className='flex gap-2'>
          <ReservationsFilter>
            <div>
              <Button variant='outline' size='icon'>
                <Filter className='h-4 w-4' />
              </Button>
            </div>
          </ReservationsFilter>
          <ReservationsLayoutSwitcher />
        </div>
      </div>
      <Suspense fallback={<ReservationsSkeleton />}>
        <ReservationsView
          reservations={reservations}
          session={session}
          layout={layout}
        />
      </Suspense>
    </div>
  )
}

export default ReservationsPage
