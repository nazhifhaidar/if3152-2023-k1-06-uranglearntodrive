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
import { Montserrat } from 'next/font/google'
import OpenClosedSideBar from '@/app/components/SideBar/OpenClosedSideBar'
import EditPelangganForm from './EditPelangganForm'

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

export default function EditPelangganPage({
    params,
}:{params: {pelangganId: string};
}) {
  return (
    <div>
<AppBar > <LoginLogout></LoginLogout></AppBar> 
      <Row>
        <OpenClosedSideBar width='300px' background_color='rgba(113, 251, 111, 0.1)' border_color='black' margin='0px 0px 0px 0px'>
        <Link href={"/admin"}><h2 style={{paddingLeft: '8px'}} >Homepage</h2></Link>
        <Link href={"/admin/manage-status"}><h2 style={{paddingLeft:'8px'}}>Manage Status Kendaraan</h2></Link> 
        <Link href={"/admin/manage-pelanggan"}><h2 style={CurrentPageStyle}>Manage Pelanggan</h2></Link> 
        <Link href={"/admin/manage-jadwal"}><h2 style={{paddingLeft:'8px'}}>Manage Jadwal Kelas</h2></Link>
        </OpenClosedSideBar>
          <div className='pl-4'>
            <EditPelangganForm id={params.pelangganId}/>
          </div>
      </Row>
    </div>
  )
}