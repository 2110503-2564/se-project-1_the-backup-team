import ListReservations from '@/components/list-reservations'
import GridReservations from '@/components/grid-reservations'
import { ReservationsClientProps } from '@/interfaces/interface'

const ReservationsView = ({
  reservations,
  session,
  layout = 'grid',
}: ReservationsClientProps & { layout?: string }) => {
  return layout === 'grid' ? (
    <GridReservations reservations={reservations} />
  ) : (
    <ListReservations reservations={reservations} session={session} />
  )
}

export default ReservationsView
