import SiteFooter from '@/components/site-footer'
import SiteHeader from '@/components/site-header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <SiteHeader />
      <main className='flex-1'>{children}</main>
      <SiteFooter />
    </div>
  )
}

export default MainLayout
