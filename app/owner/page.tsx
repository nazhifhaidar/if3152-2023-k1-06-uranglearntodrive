'use client'

import React from 'react'
import AppBar from '../components/AppBar';
import LoginLogout from '../utils/loginlogout';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

const OwnerPage: React.FC = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/api/auth/signin?callbackUrl=/owner');
    },
  });
  if (!session) redirect('/api/auth/signin?callbackUrl=/owner');
  if (session?.user.role !== "OWNER"){
    redirect("/hello");
  }
  return (
    <div>
      <AppBar > <LoginLogout></LoginLogout></AppBar> 
      Hello, {session?.user.name}
    </div>
  )
}

export default OwnerPage;