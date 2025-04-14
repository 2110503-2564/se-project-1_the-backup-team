import React from 'react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

const NotFound = ({
  message,
  retryPath,
}: {
  message: string
  retryPath: string
}) => {
  return (
    <div className='py-10 text-center h-full mt-16'>
      <h3 className='text-lg font-semibold mb-2'>{message}</h3>
      <p className='text-muted-foreground'>Please try again later</p>
      <Button variant='outline' className='mt-4 cursor-pointer'>
        <Link href={retryPath}>Retry</Link>
      </Button>
    </div>
  )
}

export default NotFound
