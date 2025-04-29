import FeaturedEvents from '@/components/featured-events'
import FeaturedSpaces from '@/components/featured-space'
import HeroSection from '@/components/hero'
import HomePage from '@/components/home'

const Home = async () => {
  return (
    <main>
      <div className='flex flex-col items-center justify-center'>
        <HeroSection />
        <div className='container-wrapper gap-6'>
          <section
            id='featured'
            className='container border-b border-dashed scroll-mt-14'
          >
            <FeaturedEvents />
            <FeaturedSpaces />
          </section>
          <div className='container'>
            <HomePage />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
