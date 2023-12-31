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
import TableContent from './tablecontent'
import Button1 from '@/app/components/Buttons/Button1'
import Center from '@/app/components/Center'
import OpenClosedSideBar from '@/app/components/SideBar/OpenClosedSideBar'

import Button2 from '@/app/components/Buttons/Button2'
import { redirect } from 'next/navigation'
import CreateKendaraanButton from './CreateKendaraanButton'
import KendaraanList from './KendaraanList'

const ManageAdminPage: React.FC = async () => {
    // const session = await getServerSession(options);
  return (
    <div className='owner-content'>
      <AppBar > <LoginLogout></LoginLogout></AppBar> 
      <Row>
        <OpenClosedSideBar width='240px' background_color='rgba(113, 251, 111, 0.1)' border_color='black' margin='0px 0px 0px 0px'>
            <Link href={"/owner"} >
                <h2 style={{paddingLeft:'8px'}}>
                    Homepage
                </h2>
            </Link>
            <Link href={"/owner/manage-admin"}>
              <h2 style={{paddingLeft:'8px'}}>
                Manage Admin
              </h2>
            </Link>
            <Link href={"/owner/manage-kendaraan"}>
              <h2 style={CurrentPageStyle}>
                  Manage Kendaraan
              </h2>
            </Link>
            <Link href={"/owner/manage-instruktur"}>
                <h2 style={{paddingLeft:'8px'}}>
                    Manage Instruktur
                </h2>
            </Link>
            <Link href={"/owner/manage-kelas"}>
                <h2 style={{paddingLeft:'8px'}}>
                    Manage Kelas
                </h2>
            </Link>
        </OpenClosedSideBar>
        <div style={{margin: '16px', flex:'1'}}>
          {/* <h2>Hello, {session?.user.name}</h2> */}
          <KendaraanList/>
          <div className='mt-2'>
            <CreateKendaraanButton></CreateKendaraanButton>
          </div>
        </div>
      </Row>
    </div>
  )
}

export default ManageAdminPage
