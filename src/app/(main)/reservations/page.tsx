import { getServerSession } from 'next-auth'

import ReservationsView from '@/components/reservations'
import { ReservationsPageParams } from '@/interfaces/interface'
import { authOptions } from '@/lib/auth-options'
import { fetchReservations } from '@/repo/reservations'
import { sortParams } from '@/types/types'

const ReservationsPage = async (props: {
  searchParams: Promise<ReservationsPageParams>
}) => {
  const searchParams = await props.searchParams
  const sort = (searchParams.sort as sortParams) || 'date-desc'
  const session = await getServerSession(authOptions)

  if (!session?.accessToken)
    return (
      <div className='p-8 text-center'>
        Please log in to view your reservations
      </div>
    )

  const reservations = await fetchReservations(session.accessToken, sort)

  return (
    <div className='flex flex-col gap-6'>
      <ReservationsView reservations={reservations} />
    </div>
  )
}

export default ReservationsPage
