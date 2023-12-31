import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Provider from './Provider'
import { ReactNode, useEffect, useState } from 'react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { options } from './api/auth/[...nextauth]/options'
import Logout from './login/logout'
import AppBar from './components/AppBar'
import { useRouter } from 'next/navigation'
import { MessageProvider } from './components/Providers/MessageProvider'
import Toast from './components/Toast/Toast'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font montserrat'
})

export const metadata: Metadata = {
  title: 'Urang Learn to Drive v1.0',
  description: 'Lulus Janten Mamank Resing',
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title as ReactNode}</title>
        <meta name="description" content={metadata.description as string} />
        {/* Add any other meta tags or link tags as needed */}
      </head>
      <body className={montserrat.className} style={{padding:'0px'}}>
        <div className={montserrat.className} >
          <MessageProvider>
            <Provider session={session}>
              {children}
              <Toast/>
            </Provider>
          </MessageProvider>
          
        
        </div>
      </body>
    </html>
  )
}
