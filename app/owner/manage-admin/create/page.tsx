import AppBar from '@/app/components/AppBar'
import Row from '@/app/components/Row'
import OpenClosedSideBar from '@/app/components/SideBar/OpenClosedSideBar'
import CurrentPageStyle from '@/app/components/Style/current_page_style'
import LoginLogout from '@/app/utils/loginlogout'
import Link from 'next/link'
import React from 'react'
import CreateAdminForm from './CreateAdminForm'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

const CreatePage:React.FC = () => {
    const { data: session} = useSession({
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/check');
        },
        required:true
    });
    if (!session) redirect('/api/auth/signin?callbackUrl=/check');
    if (session?.user.role !== "OWNER"){
        redirect("/hello");
    }
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
                <h2 style={CurrentPageStyle}>
                    Manage Admin
                </h2>
            </Link>
            <h2 style={{paddingLeft:'8px'}}>Manage Kendaraan</h2> 
            <Link href={"/owner/manage-instruktur"}>
                <h2 style={{paddingLeft:'8px'}}>
                    Manage Instruktur
                </h2>
            </Link>
            <Link href={"/owner/manage-kelas"}>
                <h2 style={{paddingLeft:'8px'}}>Manage Kelas</h2>
            </Link>
           
        </OpenClosedSideBar>
        <div className='pl-3'>
        <CreateAdminForm/>
        </div>
        
      </Row>
    </div>
  )
}

export default CreatePage