import { getServerSession } from 'next-auth';
import Image from 'next/image'
import { options } from './api/auth/[...nextauth]/options';
import { ReactNode } from 'react';
import Logout from './login/logout';
import Link from 'next/link';
import AppBar from './components/AppBar';
import LoginLogout from './utils/loginlogout';
import { Montserrat } from 'next/font/google';
import Provider from './Provider';

const montserrat = Montserrat({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font montserrat'
})

export default async function Home() {
  return (
    <Provider>
      <AppBar > <LoginLogout></LoginLogout></AppBar> 
      Hello World
    </Provider>

  )
}
