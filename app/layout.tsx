import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Badges - Reward Your Progress',
  description: 'Earn badges for completing tasks and building habits',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
