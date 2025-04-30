import './globals.css'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { PublicEnvScript } from 'next-runtime-env'
import { Toaster } from 'sonner'

import { AuthProvider } from '@/context/auth-context'
import { authOptions } from '@/lib/auth-options'
import { fontMono, fontSans } from '@/lib/font'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: {
    default: 'Spaceflow',
    template: '%s - Spaceflow',
  },
  description: 'Booking your next study session.',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      url: '/favicon/site.webmanifest',
    },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authSession = await getServerSession(authOptions)
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <PublicEnvScript />
      </head>
      <body
        className={cn(
          'min-h-svh bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <AuthProvider session={authSession}>{children}</AuthProvider>
        <Toaster richColors expand={false} closeButton />
      </body>
    </html>
  )
}
