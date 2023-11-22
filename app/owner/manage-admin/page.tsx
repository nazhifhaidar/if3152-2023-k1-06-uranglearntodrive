///owner/manage-admin Page

import { options } from '@/app/api/auth/[...nextauth]/options'
import AppBar from '@/app/components/AppBar'
import Row from '@/app/components/Row'
import SideBar from '@/app/components/SideBar/SideBar'
import CurrentPageStyle from '@/app/components/Style/current_page_style'
import LoginLogout from '@/app/utils/loginlogout'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import TableContent from './table-content'
import Button1 from '@/app/components/Buttons/Button1'
import Center from '@/app/components/Center'
import OpenClosedSideBar from '@/app/components/SideBar/OpenClosedSideBar'
import Button2 from '@/app/components/Buttons/Button2'
import { redirect } from 'next/navigation'
import CreateAdminButton from './CreateAdminButton'
import AdminList from './AdminList'
const ManageAdminPage: React.FC = async () => {    
  return (
    <div className='owner-content'>
      <AppBar > <LoginLogout></LoginLogout></AppBar> 
      <Row>
        <OpenClosedSideBar width='240px' background_color='rgba(113, 251, 111, 0.1)' border_color='black' margin='-9px 0px 0px 0px'>
            <Link href={"/owner"} >
                <h2 style={{paddingLeft:'8px'}}>
                    Homepage
                </h2>
            </Link>
            <Link href={"/owner/manage-admin"}>
                <h2 style={CurrentPageStyle}>
                    Manage Admin
                </h2>
            </Link>
            <Link href={"/owner/manage-kendaraan"}>
              <h2 style={{paddingLeft:'8px'}}>Manage Kendaraan</h2> 
            </Link>
            <Link href={"/owner/manage-instruktur"}>
                <h2 style={{paddingLeft:'8px'}}>
                    Manage Instruktur
                </h2>
            </Link>
            <h2 style={{paddingLeft:'8px'}}>Manage Kelas</h2>
        </OpenClosedSideBar>
        <div style={{margin: '16px', flex:'1'}}>
          <h1>Admin List</h1>
          {/* <h2>Hello, {session?.user.name}</h2> */}
          <AdminList/>
          <div className='mt-2'>
            <CreateAdminButton></CreateAdminButton>
          </div>
        </div>
      </Row>
    </div>
  )
}

export default ManageAdminPage