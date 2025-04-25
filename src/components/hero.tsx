import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const HeroSection = () => {
  const pages = [
    {
      heading: 'Find your Perfect Spaces',
      sub: 'Book a room for meetings, study, or coworking—anytime, anywhere.',
      button: 'Explore spaces',
      link: '/spaces',
    },
    {
      heading: 'Including Events',
      sub: 'Our co-working space now also host events, checkout ongoing events here!',
      button: 'Check Ongoing Events',
      link: '/events',
    },
  ]
  return (
    <section
      className='flex w-full min-h-[50vh] md:min-h-[80vh]  justify-center items-center border-dashed border-b bg-muted/80'
      id='hero'
    >
      <div className='w-full max-w-[1400px]'>
        <Carousel className='flex w-full min-h-[20vh] md:min-h-[80vh] items-center justify-center text-center'>
          <CarouselContent className='w-full'>
            {pages.map((page) => (
              <CarouselItem key={page.heading}>
                <div className='flex flex-col space-y-16 md:space-y-24 items-center'>
                  <div className='flex flex-col space-y-4 items-center'>
                    <h1 className='text-3xl md:text-5xl font-bold'>
                      {page.heading}
                    </h1>
                    <h2 className='w-xl text-md md:text-lg opacity-90'>
                      {page.sub}
                    </h2>
                  </div>
                  <Button
                    className='absolute bottom-0 w-xs md:w-sm text-lg h-8 md:h-12'
                    asChild
                  >
                    <Link href={page.link}>{page.button}</Link>
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute left-4' />
          <CarouselNext className='absolute right-4' />
        </Carousel>
      </div>
    </section>
  )
}

export default HeroSection
