'use client'
import { useCallback } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { sortParams } from '@/types/types'

const ReservationsFilter = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get('sort') || 'date-desc'

  const updateFilters = useCallback(
    (sort: sortParams) => {
      if (sort === currentSort) return

      const params = new URLSearchParams(searchParams.toString())

      if (sort !== 'date-desc') {
        params.set('sort', sort)
      } else {
        params.delete('sort')
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname, currentSort, searchParams],
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[200px]'>
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => updateFilters('date-desc')}
          className={currentSort === 'date-desc' ? 'bg-muted' : ''}
        >
          Date Descending
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateFilters('date-asc')}
          className={currentSort === 'date-asc' ? 'bg-muted' : ''}
        >
          Date Ascending
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateFilters('price-desc')}
          className={currentSort === 'price-desc' ? 'bg-muted' : ''}
        >
          Price (High to low)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => updateFilters('price-asc')}
          className={currentSort === 'price-asc' ? 'bg-muted' : ''}
        >
          Price (Low to high)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ReservationsFilter
