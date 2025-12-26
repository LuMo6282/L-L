import type { Metadata, Viewport } from 'next'
import './globals.css'
import PasswordGate from '@/components/PasswordGate'
import MusicPlayer from '@/components/MusicPlayer'

export const metadata: Metadata = {
  title: 'L&L Scrapbook',
  description: 'A scrapbook of our beautiful journey together - 3 years of memories',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PasswordGate>
          <MusicPlayer />
          {children}
        </PasswordGate>
      </body>
    </html>
  )
}
