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

const AdminPage: React.FC = async () => {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //       redirect('/api/auth/signin?callbackUrl=/owner');
  //   },
  // });
  const session = await getServerSession(options);
  if (!session) redirect('/api/auth/signin?callbackUrl=/owner');
  if (session?.user.role !== "ADMIN"){
    redirect("/");
  }
  return (
    <div className='admin-content'>
      <AppBar > <LoginLogout></LoginLogout></AppBar> 
      <Row>
        <OpenClosedSideBar width='300px' background_color='rgba(113, 251, 111, 0.1)' border_color='black' margin='-9px 0px 0px 0px'>
          <h2 style={CurrentPageStyle} >Homepage</h2>
          <Link style={{paddingLeft:'8px'}} href={"/admin/manage-status"}>Manage Status Kendaraan</Link> 
          <Link style={{paddingLeft:'8px'}} href={"/admin/manage-pelanggan"}>Manage Pelanggan</Link> 
          <h2 style={{paddingLeft:'8px'}}>Manage Jadwal Kelas</h2>
        </OpenClosedSideBar>
        <div style={{marginLeft: '8px'}}>
          Hello, {session?.user.name}
        </div>
      </Row>
    </div>
  )
}

export default AdminPage;