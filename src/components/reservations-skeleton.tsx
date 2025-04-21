import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const ReservationsSkeleton = () => {
  return (
    <div className='border rounded-md'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            <TableHead>Space & Room</TableHead>
            <TableHead className='hidden md:table-cell'>Date</TableHead>
            <TableHead className='hidden md:table-cell'>Time</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className='h-5 w-16' />
                </TableCell>
                <TableCell>
                  <div className='flex flex-col gap-1'>
                    <Skeleton className='h-5 w-40' />
                    <Skeleton className='h-4 w-20' />
                  </div>
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <Skeleton className='h-5 w-24' />
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <Skeleton className='h-5 w-16' />
                </TableCell>
                <TableCell className='text-right'>
                  <Skeleton className='h-9 w-9 rounded-md ml-auto' />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ReservationsSkeleton
