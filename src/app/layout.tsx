/* eslint-disable @next/next/inline-script-id */
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

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
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-HZG7CCYJK7`}
      />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HZG7CCYJK7', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
    </html>
  )
}
