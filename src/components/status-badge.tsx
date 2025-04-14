import React from 'react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const styles = {
  completed: 'bg-green-100 text-green-700',
  active: 'bg-blue-100 text-blue-700',
  cancelled: 'bg-red-100 text-red-700',
}

const StatusBadge = ({
  status,
  className,
  ...props
}: {
  status: 'completed' | 'active' | 'cancelled'
} & React.ComponentProps<'span'>) => {
  return (
    <Badge
      className={cn(styles[status], 'capitalize w-20', className)}
      {...props}
    >
      {status}
    </Badge>
  )
}

export default StatusBadge
