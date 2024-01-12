import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ENS Leaderboard',
  description: 'The most followed Farcaster accounts with .eth usernames',
  metadataBase: new URL("https://ensleaderboard.com"),
  openGraph: {images:["sharing.jpg"]}
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
