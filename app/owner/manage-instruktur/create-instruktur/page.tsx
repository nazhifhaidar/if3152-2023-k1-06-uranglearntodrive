import { options } from '@/app/api/auth/[...nextauth]/options'
import AppBar from '@/app/components/AppBar'
import Row from '@/app/components/Row'
import SideBar from '@/app/components/SideBar/SideBar'
import CurrentPageStyle from '@/app/components/Style/current_page_style'
import LoginLogout from '@/app/utils/loginlogout'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import Button1 from '@/app/components/Buttons/Button1'
import CreateInstrukturForm from './createInstrukturForm'
import BoxContainer from '@/app/components/Containers/BoxContainer'
import { Montserrat } from 'next/font/google'
import OpenClosedSideBar from '@/app/components/SideBar/OpenClosedSideBar'

const montserrat = Montserrat({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
    variable: '--font montserrat'
  })

const montserratBold = Montserrat({
  weight: '700',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font montserrat'
})

const ManageAdminPage: React.FC = async () => {
    const session = await getServerSession(options);
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
                <h2 style={{paddingLeft:'8px'}}>
                    Manage Admin
                </h2>
            </Link>
            <h2 style={{paddingLeft:'8px'}}>Manage Kendaraan</h2>
            <Link href={"/owner/manage-instruktur"}>
                <h2 style={CurrentPageStyle}>
                    Manage Instruktur
                </h2>
            </Link>
            <Link href={"/owner/manage-kelas"}>
                <h2 style={{paddingLeft:'8px'}}>
                    Manage Kelas
                </h2>
            </Link>
        </OpenClosedSideBar>
        <div style={{margin: '8px'}}>
          {/* <h2>Hello, {session?.user.name}</h2> */}
          <BoxContainer warna_latar_belakang='white'border_color='white' lebar={550} tinggi={360} sudut={15}>
            <div className={montserrat.className}>
              <h1 className={montserratBold.className} style={{ textAlign: 'start', fontSize: '30px' }}>CREATE INSTRUKTUR</h1>
              <CreateInstrukturForm></CreateInstrukturForm>
            </div>
          </BoxContainer>
        </div>    
      </Row>
    </div>
  )
}

export default ManageAdminPage