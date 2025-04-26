'use client'

import { MouseEvent, useEffect, useState } from 'react'

import Link from 'next/link'

import Autoplay from 'embla-carousel-autoplay'
import { ArrowDown, CalendarSearch, Telescope } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const pages = [
  {
    id: 'spaces',
    heading: 'Find your Perfect Spaces',
    sub: 'Book a room for meetings, study, or coworking—anytime, anywhere.',
    button: 'Explore spaces',
    link: '/spaces',
    icon: <Telescope />,
  },
  {
    id: 'events',
    heading: 'Including Events',
    sub: 'Our co-working space now also host events, checkout ongoing events here!',
    button: 'Check ongoing events',
    link: '/events',
    icon: <CalendarSearch />,
  },
]

const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const handleCarouselClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault()
    if (!api) return
    const target = e.currentTarget
    const index = Number(target.getAttribute('data-index'))
    const autoplay = api.plugins().autoplay
    if (autoplay) autoplay.reset()
    api.scrollTo(index, false)
  }

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      const autoplay = api.plugins().autoplay
      if (autoplay) autoplay.reset()
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section
      className='flex w-full justify-center items-center border-dashed border-b bg-muted/80'
      id='hero'
    >
      <div className='w-full max-w-[1400px]'>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[Autoplay({ delay: 7000 })]}
          setApi={setApi}
          className='flex w-full items-center justify-center text-center'
        >
          <CarouselContent className='w-full h-[40vh] md:h-[45vh] lg:h-[70vh] items-center'>
            {pages.map((page) => (
              <CarouselItem key={page.id}>
                <div className='h-40 md:h-48 flex flex-col justify-between items-center'>
                  <div className='flex flex-col gap-4 items-center'>
                    <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold'>
                      {page.heading}
                    </h1>
                    <h2 className='w-xl text-md md:text-lg opacity-90'>
                      {page.sub}
                    </h2>
                  </div>
                  <div className='space-x-1'>
                    <Button size='icon' variant='ghost' asChild>
                      <Link href={`#featured-${page.id}`}>
                        <ArrowDown />
                      </Link>
                    </Button>
                    <Button asChild>
                      <div>
                        {page.icon}
                        <Link href={page.link}>{page.button}</Link>
                      </div>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='hidden md:inline-flex left-4' />
          <CarouselNext className='hidden md:inline-flex right-4' />
        </Carousel>
        <div className='flex gap-1 justify-center pb-4'>
          {pages.map((_, index) => (
            <span
              key={index}
              data-index={index}
              className={cn(
                'border-3 size-3 rounded-full cursor-pointer border-gray-300',
                current - 1 === index ? 'bg-gray-300' : '',
              )}
              onClick={handleCarouselClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
