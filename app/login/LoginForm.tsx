'use client'
import { ChangeEvent } from 'react';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import TextField1 from '../components/TextField/TextField1';
import PasswordField from '../components/TextField/PasswordField';
import Button1 from '../components/Buttons/Button1';
import Row from '../components/Row';
import Link from 'next/link';
import { useMessageContext } from '../components/Providers/MessageProvider';
import { useRouter } from 'next/navigation';

const LoginForm: React.FC = () => {
  const {showMessage} = useMessageContext();
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
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("username"))
    console.log(formData.get("password"))
    try {
      const response = await signIn('credentials', {
        username: formData.get("username"),
        password: formData.get("password"),
        redirect: false
      });

      if (!response?.error) {
        // Login successful
        router.push("/check");
      } else {
        // Login failed
        showMessage(response.error, "error"); // Display the error message
      }
    } catch (error) {
      showMessage("An error occurred during login.", "error");
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form onSubmit={handleSubmit} >
      <TextField1 label="Username" name='username' value={username} type="text" onChange={handleUsernameChange} />
      <PasswordField label="Password" value={password} onChange={handlePasswordChange} onToggleVisibility={handlePasswordVisibilityToggle} style={{ marginLeft: '33px', paddingLeft: '4px', border: '1px solid rgba(191, 219, 254,1)' }} />
      <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
        <Row>
          <Button1 id="submit-button" text="Login" textColor="black" bgColor="yellow" type='submit' style={{ margin: '8px' }} />
          <Link href={'/'}><Button1 id="back-button" text="Kembali" textColor="black" bgColor="rgba(191, 219, 254, 1)" type='button' style={{ margin: '8px' }} /></Link>
        </Row>

      </div>
    </form>
  )
}

export default LoginForm