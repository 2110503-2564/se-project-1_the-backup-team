'use client'

import { usePathname } from 'next/navigation'

import { MousePointer2, PencilLine, Plus, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCursor } from '@/context/admin-cursor'

import AddRoomForm from './add-room-form'
import AddSpaceForm from './add-space-form'

const AdminPanel = () => {
  const { cursor, setCursor } = useCursor()
  const path = usePathname().split('/').slice(1)

  return (
    <aside className='clear-both fixed block right-4 top-1/4'>
      <div className='flex flex-col rounded-md '>
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div>
                <Button
                  variant={cursor === 'normal' ? 'default' : 'outline'}
                  size='icon'
                  className='rounded-b-none'
                  onClick={() => setCursor('normal')}
                >
                  <MousePointer2 className='size-4' />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side='left'>
              <p>Normal</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              {path.length == 2 ? (
                <AddRoomForm>
                  <div>
                    <Button
                      variant={cursor === 'add' ? 'default' : 'outline'}
                      size='icon'
                      className='rounded-none'
                      onClick={() => setCursor('add')}
                    >
                      <Plus className='size-4' />
                    </Button>
                  </div>
                </AddRoomForm>
              ) : (
                <AddSpaceForm>
                  <div>
                    <Button
                      variant={cursor === 'add' ? 'default' : 'outline'}
                      size='icon'
                      className='rounded-none'
                      onClick={() => setCursor('add')}
                    >
                      <Plus className='size-4' />
                    </Button>
                  </div>
                </AddSpaceForm>
              )}
            </TooltipTrigger>
            <TooltipContent side='left'>
              <p>Add</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div>
                <Button
                  variant={cursor === 'edit' ? 'default' : 'outline'}
                  size='icon'
                  className='rounded-none'
                  onClick={() => setCursor('edit')}
                >
                  <PencilLine className='size-4' />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side='left'>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <div>
                <Button
                  variant={cursor === 'delete' ? 'default' : 'outline'}
                  size='icon'
                  className='rounded-t-none'
                  onClick={() => setCursor('delete')}
                >
                  <Trash className='size-4' />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent side='left'>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  )
}

export default AdminPanel
