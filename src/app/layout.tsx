import './globals.css'
import '../styles/main.scss'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Providers } from "@/redux/provider";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Louis Alemar 10up Sample',
  description: 'A Marvel Blog Site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
