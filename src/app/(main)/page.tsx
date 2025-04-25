import FeaturedSpaces from '@/components/featured'
import HeroSection from '@/components/hero'
import HomePage from '@/components/home'

const Home = async () => {
  return (
    <main>
      <div className='flex flex-col items-center justify-center'>
        <HeroSection />

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
