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

const ManageAdminPage: React.FC = async () => {
    const session = await getServerSession(options);
  return (
    <div className='owner-content'>
      <AppBar > <LoginLogout></LoginLogout></AppBar> 
      <Row>
        <SideBar width='240px' background_color='rgba(113, 251, 111, 0.4)' border_color='black' margin='-3px 0px 0px 0px'>
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
            <h2 style={{paddingLeft:'8px'}}>Manage Kendaraan</h2> 
            <h2 style={{paddingLeft:'8px'}}>Manage Instruktur</h2>
            <h2 style={{paddingLeft:'8px'}}>Manage Kelas</h2>
        </SideBar>
        <div style={{margin: '8px'}}>
          <h2>Hello, {session?.user.name}</h2>
          <TableContent/>
        </div>
      </Row>
    </div>
  )
}

export default ManageAdminPage