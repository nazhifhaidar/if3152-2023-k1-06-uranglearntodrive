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
import CreateKelasForm from './createKelasForm'
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

const CreateKelasPage:React.FC = () => {
  return (
    <div>
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
          <div className='pl-4'>
            <CreateKelasForm/>
          </div>
      </Row>
    </div>
  )
}

export default CreateKelasPage