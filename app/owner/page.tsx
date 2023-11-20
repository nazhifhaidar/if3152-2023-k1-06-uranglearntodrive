import React from 'react'
import AppBar from '../components/AppBar';
import LoginLogout from '../utils/loginlogout';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import SideBar from '../components/SideBar/SideBar';
import Row from '../components/Row';
import CurrentPageStyle from '../components/Style/current_page_style';
import Link from 'next/link';
import OpenClosedSideBar from '../components/SideBar/OpenClosedSideBar';

const OwnerPage: React.FC = async () => {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //       redirect('/api/auth/signin?callbackUrl=/owner');
  //   },
  // });
  const session = await getServerSession(options);
  if (!session) redirect('/api/auth/signin?callbackUrl=/owner');
  if (session?.user.role !== "OWNER"){
    redirect("/hello");
  }
  return (
    <div className='owner-content'>
      <AppBar > <LoginLogout></LoginLogout></AppBar> 
      <Row>
        <OpenClosedSideBar width='240px' background_color='rgba(113, 251, 111, 0.1)' border_color='black' margin='-9px 0px 0px 0px'>
          <h2 style={CurrentPageStyle} >Homepage</h2>
          <Link style={{paddingLeft:'8px'}} href={"/owner/manage-admin"}>Manage Admin</Link>
          <Link style={{paddingLeft:'8px'}} href={"/owner/manage-kendaraan"}>Manage Kendaraan</Link>
          <Link style={{paddingLeft:'8px'}} href={"/owner/manage-instruktur"}>Manage Instruktur</Link>
          <Link style={{paddingLeft:'8px'}} href={"/owner/manage-kelas"}>Manage Kelas</Link>
        </OpenClosedSideBar>
        <div style={{marginLeft: '8px'}}>
          Hello, {session?.user.name}
        </div>
      </Row>
    </div>
  )
}

export default OwnerPage;
