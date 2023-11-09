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

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font roboto'
})

const montserrat = Montserrat({
  weight:'400',
  style:'normal',
  subsets:['latin'],
  variable: '--font montserrat'
})

const montserratBold = Montserrat({
  weight:'700',
  style:'normal',
  subsets:['latin'],
  variable: '--font montserrat'
})


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit= async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a data object to send in the POST request
    const data = { username, password };

    const clickedButtonId = document.activeElement?.id;
    // console.log(clickedButtonId);
    if (clickedButtonId !== "submit-button") {
      return; // Ignore form submission if the clicked button is not "submit-button"
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Login successful, handle the response or redirect to the next page
        const res = await response.json();
        console.log(res);
      } else {
        // Login failed, handle the error
        const res = await response.json();
        console.error(res);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.title = 'Login Page';
  }, []);

  return (
    <>
      <Center alignItems='center'>
      <RoundedBoxContainer warna_latar_belakang = 'lightBlue' lebar={480} tinggi={320} sudut={15} child={
        <div className={montserrat.className}>
          <h1 className={montserratBold.className} style={{textAlign:'center', fontSize:'48px'}}>LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <TextField1 label="Username" value={username} type="text" onChange={handleUsernameChange} />
            <PasswordField label="Password" value={password} onChange={handlePasswordChange} onToggleVisibility={handlePasswordVisibilityToggle} style={{marginLeft:'28px', paddingLeft:'4px'}}/>
            <div style={{maxWidth: '100%' , display:'flex', justifyContent: 'center'}}>
              <Button1 id="submit-button"  text="Login" textColor="black" bgColor="yellow"/>
            </div>
            
          </form>
        </div>
      }/>
    </Center>
    
    </>
    
  );
};

export default LoginPage;
