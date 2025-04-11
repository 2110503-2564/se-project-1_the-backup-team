import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'

const BookingMenuSkeleton = () => {
  return (
    <div className='lg:sticky lg:top-20 h-fit'>
      <Card className='w-full'>
        <div className='p-6 space-y-6'>
          <Skeleton className='h-7 w-48' />
          <div className='space-y-4'>
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-10 w-full' />
            <Skeleton className='h-20 w-full' />
            <Skeleton className='h-10 w-full' />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BookingMenuSkeleton
