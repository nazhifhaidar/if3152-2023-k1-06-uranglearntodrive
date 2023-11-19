'use client'
import { ChangeEvent } from 'react';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import TextField1 from '../components/TextField/TextField1';
import PasswordField from '../components/TextField/PasswordField';
import Button1 from '../components/Buttons/Button1';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

const LoginForm:React.FC = () => {
    const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a data object to send in the POST request
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("username"))
    console.log(formData.get("password"))
    const response = await signIn('credentials', {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: "/check"
    });
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form onSubmit={handleSubmit} >
        <TextField1 label="Username" name='username' value={username} type="text" onChange={handleUsernameChange} />
        <PasswordField label="Password" value={password} onChange={handlePasswordChange} onToggleVisibility={handlePasswordVisibilityToggle} style={{ marginLeft: '28px', paddingLeft: '4px' }} />
        <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button1 id="submit-button" text="Login" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
        </div>
    </form>
  )
}

export default LoginForm