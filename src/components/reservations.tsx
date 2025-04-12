'use client'
import { Suspense, useState } from 'react'

import { Filter } from 'lucide-react'
import { useSession } from 'next-auth/react'

import GridReservations from '@/components/grid-reservations'
import ListReservations from '@/components/list-reservations'
import { Button } from '@/components/ui/button'
import { Reservation } from '@/interfaces/reservation.interface'
import { ReservationLayout } from '@/types/types'

import ReservationsFilter from './reservations-filter'
import ReservationsLayoutSwitcher from './reservations-layout-switcher'
import ReservationsSkeleton from './reservations-skeleton'

const ReservationsView = ({
  reservations,
}: {
  reservations: Reservation[]
}) => {
  const [layout, setLayout] = useState<ReservationLayout>('grid')
  const { data: session } = useSession()

  return (
    <>
      <div className='flex flex-col justify-end sm:flex-row gap-4'>
        <div className='flex gap-2'>
          <ReservationsFilter>
            <div>
              <Button variant='outline' size='icon'>
                <Filter className='h-4 w-4' />
              </Button>
            </div>
          </ReservationsFilter>
          <ReservationsLayoutSwitcher
            layout={layout}
            onLayoutChange={setLayout}
          />
        </div>
      </div>
      <Suspense fallback={<ReservationsSkeleton />}>
        {layout === 'grid' ? (
          <GridReservations reservations={reservations} session={session} />
        ) : (
          <ListReservations reservations={reservations} session={session} />
        )}
      </Suspense>
    </>
  )
}

export default ReservationsView
