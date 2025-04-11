'use client'

import { Button } from '@/components/ui/button'
import { Grip, List } from 'lucide-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const ReservationsLayoutSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentLayout = searchParams.get('layout') || 'grid'

  const updateLayout = useCallback(
    (layout: 'grid' | 'list') => {
      if (layout === currentLayout) return
      const params = new URLSearchParams(searchParams.toString())

      if (layout !== 'grid') {
        params.set('layout', layout)
      } else {
        params.delete('layout')
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [currentLayout, router, pathname, searchParams],
  )
  return (
    <div className='flex rounded-md'>
      <Button
        variant={currentLayout === 'list' ? 'default' : 'outline'}
        size='icon'
        className='rounded-r-none'
        onClick={() => updateLayout('list')}
      >
        <List className='h-4 w-4' />
      </Button>
      <Button
        variant={currentLayout === 'grid' ? 'default' : 'outline'}
        size='icon'
        className='rounded-l-none'
        onClick={() => updateLayout('grid')}
      >
        <Grip className='h-4 w-4' />
      </Button>
    </div>
  )
}

export default ReservationsLayoutSwitcher
