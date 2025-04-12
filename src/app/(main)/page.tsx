import FeaturedSpaces from '@/components/featured'
import HomePage from '@/components/home'

const Home = async () => {
  return (
    <main>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center w-full text-center bg-gray min-h-[80vh] bg-gray-50 border-b border-dashed'>
          <div className='text-4xl font-bold md:text-5xl'>
            Find your Perfect Spaces
          </div>
          <div className='mt-3 text-lg opacity-90'>
            Book a room for meetings, study, or coworking—anytime, anywhere.
          </div>
        </div>
        <div className='container-wrapper gap-6'>
          <div className='container border-b border-dashed'>
            <FeaturedSpaces />
          </div>
          <div className='container'>
            <HomePage />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
