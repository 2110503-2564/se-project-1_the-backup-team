import EventDetailClient from '@/components/event-detail'
import { getEventById } from '@/repo/events'
import { getSpaceById } from '@/repo/spaces'

export default async function EventsdetailPage({
  params,
}: {
  params: Promise<{ eid: string }>
}) {
  const { eid } = await params

  const event = await getEventById(eid)

  const space = await getSpaceById(event.space._id)

  return <EventDetailClient event={event} space={space} />
}
