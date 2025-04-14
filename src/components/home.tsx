import {
  BookOpen,
  CalendarDays,
  CheckCircle,
  Handshake,
  ShieldCheck,
  User,
} from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

const HomePage = () => {
  return (
    <section className='flex flex-col items-center gap-32 my-16'>
      <div className='w-full max-w-5xl text-center'>
        <div className='text-3xl font-bold'>DESIGNED FOR MODERN WORKERS</div>
        <p className='text-lg text-gray-600 mt-2'>
          Flexible spaces for productivity and collaboration.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
          <div className='flex flex-col items-center'>
            <span className='text-4xl'>
              <ShieldCheck />
            </span>
            <h3 className='font-semibold mt-2'>100% Satisfaction Guarantee</h3>
            <p className='text-gray-600 text-sm'>
              Full refund if you&apos;re not satisfied.
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-4xl'>
              <Handshake />
            </span>
            <h3 className='font-semibold mt-2'>Trusted Coworking Spaces</h3>
            <p className='text-gray-600 text-sm'>
              Real user reviews, real experiences.
            </p>
          </div>
          <div className='flex flex-col items-center'>
            <span className='text-4xl'>
              <CalendarDays />
            </span>
            <h3 className='font-semibold mt-2'>Peace of Mind</h3>
            <p className='text-gray-600 text-sm'>
              Once booked, your seat is secured.
            </p>
          </div>
        </div>
      </div>

      <div className='w-full max-w-5xl px-4 text-center'>
        <h2 className='text-3xl font-bold text-gray-800'>
          Why Users Love Spaceflow
        </h2>
        <p className='text-lg text-gray-600 mt-2'>
          Discover why professionals and teams trust us for their workspace
          needs.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
          {/* Feature 1 */}
          <Card className='shadow-md'>
            <CardHeader className='flex items-center justify-center'>
              <BookOpen className='w-12 h-12 text-gray-700' />
            </CardHeader>
            <CardContent>
              <h3 className='font-semibold'>Easy Booking</h3>
              <p className='text-sm text-gray-600'>
                Reserve a workspace in just a few clicks.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className='shadow-md'>
            <CardHeader className='flex items-center justify-center'>
              <User className='w-12 h-12 text-gray-700' />
            </CardHeader>
            <CardContent>
              <h3 className='font-semibold'>User-Friendly</h3>
              <p className='text-sm text-gray-600'>
                A simple and intuitive interface for everyone.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className='shadow-md'>
            <CardHeader className='flex items-center justify-center'>
              <CheckCircle className='w-12 h-12 text-gray-700' />
            </CardHeader>
            <CardContent>
              <h3 className='font-semibold'>Verified Spaces</h3>
              <p className='text-sm text-gray-600'>
                Only high-quality, verified workspaces available.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default HomePage
