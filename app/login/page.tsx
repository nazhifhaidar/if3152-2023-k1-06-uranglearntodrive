//login page
'use client'

import React from 'react';
import Center from '../components/Center';
import RoundedBoxContainer from '../components/Containers/RoundedBoxContainer';
import { Roboto } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';

import LoginForm from './LoginForm';
import Toast from '../components/Toast/Toast';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font roboto'
})

const montserrat = Montserrat({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font montserrat'
})

const montserratBold = Montserrat({
  weight: '700',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font montserrat'
})



const LoginPage: React.FC = () => {
  return (

    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Image
        src="/bg-lalin.jpg"
        alt="Background Image"
        layout="fill"
        objectFit="cover"
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className='pt-16 justify-center flex'>
          <Center alignItems='center'>
            <RoundedBoxContainer warna_latar_belakang='rgba(239, 246, 255,1.0)' border_color='#80a2ad' lebar={400} tinggi={480} sudut={10}>
              <div className={montserrat.className}>
                <h1 className={montserratBold.className} style={{ textAlign: 'center', fontSize: '48px' }}>LOGIN</h1>
                <LoginForm></LoginForm>
              </div>
            </RoundedBoxContainer>
          </Center>
        </div>
      </div>
      <Toast/>
    </div>

  );
};

export default LoginPage;
