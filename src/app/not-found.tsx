import { Separator } from '@/components/ui/separator'

const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='flex space-x-4 h-5 text-lg items-center'>
        <h1>404</h1>
        <Separator orientation='vertical' />
        <h1>Page not found</h1>
      </div>
    </div>
  )
}

export default NotFoundPage
