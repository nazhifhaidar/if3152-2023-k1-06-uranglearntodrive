import React, { useState } from 'react';
import DatePickerInput from '@/app/components/DatePickerInput/DatePickerInput';
///owner/manage-admin Page

import { options } from '@/app/api/auth/[...nextauth]/options'
import AppBar from '@/app/components/AppBar'
import Row from '@/app/components/Row'
import SideBar from '@/app/components/SideBar/SideBar'
import CurrentPageStyle from '@/app/components/Style/current_page_style'
import LoginLogout from '@/app/utils/loginlogout'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import Button1 from '@/app/components/Buttons/Button1'
import Center from '@/app/components/Center'
import OpenClosedSideBar from '@/app/components/SideBar/OpenClosedSideBar'
import Button2 from '@/app/components/Buttons/Button2'
import { redirect } from 'next/navigation'
import CreateJadwalForm from './createJadwalForm';
import LinkButton from '@/app/components/Buttons/LinkButton';

const ManageJadwalPage: React.FC = async () => {    
  return (
    <div className='owner-content'>
      <AppBar > <LoginLogout></LoginLogout></AppBar> 
      <Row>
        <OpenClosedSideBar width='300px' background_color='rgba(113, 251, 111, 0.1)' border_color='black' margin='0px 0px 0px 0px'>
          <Link href={"/admin"}><h2 style={{paddingLeft: '8px'}} >Homepage</h2></Link>
          <Link style={{paddingLeft:'8px'}} href={"/admin/manage-status"}>Manage Status Kendaraan</Link> 
          <Link style={{paddingLeft:'8px'}} href={"/admin/manage-pelanggan"}>Manage Pelanggan</Link> 
          <Link href={"/admin/manage-jadwal"}><h2 style={CurrentPageStyle}>Manage Jadwal Kelas</h2></Link>
        </OpenClosedSideBar>
        <div style={{margin: '16px', flex:'1'}}>
          {/* <h2>Hello, {session?.user.name}</h2> */}
          <CreateJadwalForm/>
        </div>
      </Row>
    </div>
  )
}

export default ManageJadwalPage