'use client'

import React from 'react'
import AppBar from '../components/AppBar';
import LoginLogout from '../utils/loginlogout';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SideBar from '../components/SideBar/SideBar';
import Row from '../components/Row';

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
      <Row>
        <SideBar width='240px' background_color='orange' border_color='black' margin='-3px 0px 0px 0px'>
          <h2>Homepage</h2>
          <h2>Manage Admin</h2>
          <h2>Manage Kendaraan</h2> 
          <h2>Manage Instruktur</h2>
          <h2>Manage Kelas</h2>
        </SideBar>
        <div style={{marginLeft: '8px'}}>
          Hello, {session?.user.name}
        </div>
      </Row>
      
    </div>
  )
}

export default OwnerPage;