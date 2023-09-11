import './globals.css'
import '../styles/main.scss'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Providers } from "@/redux/provider";

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Louis Alemar - Marvel',
  description: 'A Marvel Blog Site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
