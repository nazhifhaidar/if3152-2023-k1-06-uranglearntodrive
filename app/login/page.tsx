//login page
'use client'

import React, { ChangeEvent } from 'react';
import Button1 from '../components/Buttons/Button1';
import TextField1 from '../components/TextField/TextField1';
import Center from '../components/Center';
import RoundedBoxContainer from '../components/Containers/RoundedBoxContainer';
import { Roboto } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import PasswordField from '../components/TextField/PasswordField';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { options } from '../api/auth/[...nextauth]/options';

import Provider from '../Provider';
import { getServerSideProps } from './get_server_props';
import Logout from './logout';
import LoginForm from './LoginForm';

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
    <Provider>
      <Center alignItems='center'>
        <RoundedBoxContainer warna_latar_belakang='lightBlue'border_color='#80a2ad' lebar={480} tinggi={320} sudut={15}>
          <div className={montserrat.className}>
            <h1 className={montserratBold.className} style={{ textAlign: 'center', fontSize: '48px' }}>LOGIN</h1>
            <LoginForm>

            </LoginForm>
          </div>
        </RoundedBoxContainer>
      </Center>  
    </Provider>
    
  );
};

export default LoginPage;
