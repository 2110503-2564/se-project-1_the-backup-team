import { Metadata } from 'next'

import LoginForm from '@/components/login-form'

const title = 'Login'
const description =
  'Login to manage and track your intergalactic journeys with Spaceflow.'
export const metadata: Metadata = {
  title,
  description,
}

const LoginPage = () => {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
