'use client'
import { Suspense, useState, useEffect } from 'react'

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
  const [isActive, setIsActive] = useState(false)
  const activeReservations = reservations.filter(
    (res) => res.status === 'active',
  )

  useEffect(() => {
    const stored = localStorage.getItem('isActive')
    if (stored === 'true') {
      setIsActive(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('isActive', isActive.toString())
  }, [isActive])

  return (
    <>
      <div className='flex flex-col justify-between sm:flex-row gap-4'>
        <Button
          variant='outline'
          className={`w-20 h-8 ${isActive ? 'bg-black text-white' : ''}`}
          onClick={() => setIsActive(!isActive)}
        >
          History
        </Button>
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
          !isActive ? (
            <GridReservations
              reservations={activeReservations}
              session={session}
            />
          ) : (
            <GridReservations reservations={reservations} session={session} />
          )
        ) : !isActive ? (
          <ListReservations
            reservations={activeReservations}
            session={session}
          />
        ) : (
          <ListReservations reservations={reservations} session={session} />
        )}
      </Suspense>
    </>
  )
}

export default ReservationsView
