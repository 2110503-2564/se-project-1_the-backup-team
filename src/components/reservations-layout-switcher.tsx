'use client'

import { Grip, List } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ReservationLayout } from '@/types/types'

const ReservationsLayoutSwitcher = ({
  layout,
  onLayoutChange,
}: {
  layout: ReservationLayout
  onLayoutChange: (layout: ReservationLayout) => void
}) => {
  const updateLayout = (newLayout: ReservationLayout) => {
    if (newLayout == layout) return

    onLayoutChange(newLayout)
  }

  return (
    <div className='flex rounded-md'>
      <Button
        variant={layout === 'list' ? 'default' : 'outline'}
        size='icon'
        className='rounded-r-none'
        onClick={() => updateLayout('list')}
      >
        <List className='h-4 w-4' />
      </Button>
      <Button
        variant={layout === 'grid' ? 'default' : 'outline'}
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
