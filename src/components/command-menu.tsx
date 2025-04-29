'use client'

import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { type DialogProps } from '@radix-ui/react-dialog'
import { LogIn, LogOut, Search, User } from 'lucide-react'
import { signOut } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { commandConfig } from '@/config/commands'

const CommandMenu = ({ ...props }: DialogProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant='outline'
        className='relative hidden sm:flex h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64 cursor-pointer'
        onClick={() => setOpen(true)}
        {...props}
      >
        <Search />
        <span className='hidden lg:inline-flex'>Search command ...</span>
        <span className='inline-flex lg:hidden'>Search ...</span>
        <kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </Button>
      <Button
        size='icon'
        variant='ghost'
        className='relative flex sm:hidden'
        onClick={() => setOpen(true)}
        {...props}
      >
        <Search />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup heading='Links'>
            {commandConfig.mainNav.map((navItem) => (
              <CommandItem
                key={navItem.href}
                value={navItem.title}
                onSelect={() => {
                  runCommand(() => router.push(navItem.href as string))
                }}
              >
                <navItem.icon />
                {navItem.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading='Authentication'>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/register'))}
            >
              <User />
              Register
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/login'))}
            >
              <LogIn />
              Log in
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => signOut())}>
              <LogOut />
              Log out
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
