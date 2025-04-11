import { Skeleton } from '@/components/ui/skeleton'

const SpacesSkeleton = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:grid-rows-2'>
      {Array(6)
        .fill(null)
        .map((_, i) => (
          <Skeleton
            key={i}
            className='w-full rounded-lg overflow-hidden shadow-md pt-0 min-h-[30rem]'
          />
        ))}
    </div>
  )
}

export default SpacesSkeleton
