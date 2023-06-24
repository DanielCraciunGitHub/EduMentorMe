import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './components/providers'
import DarkModeButton from './components/DarkMode'

export const metadata: Metadata = {
  title: 'Template',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}