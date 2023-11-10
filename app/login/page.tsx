//login page

'use client'

import React, { useState, ChangeEvent, FormEvent, useEffect, FormEventHandler } from 'react';
import Button1 from '../components/Buttons/Button1';
import TextField1 from '../components/TextField/TextField1';
import Center from '../components/Center';
import RoundedBoxContainer from '../components/Containers/RoundedBoxContainer';
import { Roboto } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import PasswordField from '../components/TextField/PasswordField';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'
import Provider from '../Provider';

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

const url = process.env.NEXTAUTH_URL

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a data object to send in the POST request
    const data = { username, password };
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("username"))
    console.log(formData.get("password"))
    const response = await signIn('credentials', {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: `/hello`

    })

    console.log(response);
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.title = 'Login Page';
  }, []);

  return (
    <Provider>
      <Center alignItems='center'>
        <RoundedBoxContainer warna_latar_belakang='lightBlue' lebar={480} tinggi={320} sudut={15}>
          <div className={montserrat.className}>
            <h1 className={montserratBold.className} style={{ textAlign: 'center', fontSize: '48px' }}>LOGIN</h1>
            <form onSubmit={handleSubmit} >
              <TextField1 label="Username" name='username' value={username} type="text" onChange={handleUsernameChange} />
              <PasswordField label="Password" value={password} onChange={handlePasswordChange} onToggleVisibility={handlePasswordVisibilityToggle} style={{ marginLeft: '28px', paddingLeft: '4px' }} />
              <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button1 id="submit-button" text="Login" textColor="black" bgColor="yellow" type='submit' />
              </div>

            </form>
          </div>
        </RoundedBoxContainer>
      </Center>  
    </Provider>
    
  );
};

export default LoginPage;
