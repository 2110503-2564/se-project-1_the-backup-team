import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const BookingMenuSkeleton = () => {
  return (
    <Card className='sticky top-20 scroll-mt-20 max-h-[464px]'>
      <div className='p-6 space-y-6'>
        <Skeleton className='h-7 w-48' />
        <div className='space-y-4'>
          <Skeleton className='h-36 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>
    </Card>
  )
}

export default BookingMenuSkeleton
