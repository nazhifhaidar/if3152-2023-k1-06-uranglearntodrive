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
import OpenClosedSideBar from '@/app/components/SideBar/OpenClosedSideBar'
import InstrukturList from './InstrukturList'
import LinkButton from '@/app/components/Buttons/LinkButton'

const ManageInstrukturPage: React.FC = async () => {
    const session = await getServerSession(options);
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
        <div style={{margin: '16px', flex:'1'}}>
          <h1>Instruktur List</h1>
          {/* <h2>Hello, {session?.user.name}</h2> */}
          <InstrukturList/>
          <LinkButton route="/owner/manage-instruktur/create-instruktur" text="Buat Data Baru"/>
          {/* <Link href={"/owner/manage-instruktur/create-instruktur"}>
              <Button1 id="create-button" text="Create New Data" textColor="black" bgColor="yellow" type='button' />
          </Link> */}
        </div>
        {/* <div style={{margin: '8px'}}>
          <h2>Hello, {session?.user.name}</h2>
          <TableContent/>
            <Link href={"/owner/manage-instruktur/create-instruktur"}>
              <Button1 id="create-button" text="Create New Data" textColor="black" bgColor="yellow" type='button' />
            </Link>
        </div> */}
      </Row>
    </div>
  )
}

export default ManageInstrukturPage