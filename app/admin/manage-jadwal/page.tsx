// import { options } from '@/app/api/auth/[...nextauth]/options'
// import AppBar from '@/app/components/AppBar'
// import Row from '@/app/components/Row'
// import SideBar from '@/app/components/SideBar/SideBar'
// import CurrentPageStyle from '@/app/components/Style/current_page_style'
// import LoginLogout from '@/app/utils/loginlogout'
// import { getServerSession } from 'next-auth'
// import Link from 'next/link'
// import React from 'react'
// import TableContent from './table-content'
// import Button1 from '@/app/components/Buttons/Button1'
// import OpenClosedSideBar from '@/app/components/SideBar/OpenClosedSideBar'
// import KelasList from './KelasList'
// import LinkButton from '@/app/components/Buttons/LinkButton'

// const ManageKelasPage: React.FC = async () => {
//     const session = await getServerSession(options);
//   return (
//     <div className='owner-content'>
//       <AppBar > <LoginLogout></LoginLogout></AppBar> 
//       <Row>
//       <OpenClosedSideBar width='240px' background_color='rgba(113, 251, 111, 0.1)' border_color='black' margin='0px 0px 0px 0px'>
//             <Link href={"/owner"} >
//                 <h2 style={{paddingLeft:'8px'}}>
//                     Homepage
//                 </h2>
//             </Link>
//             <Link href={"/owner/manage-admin"}>
//                 <h2 style={{paddingLeft:'8px'}}>
//                     Manage Admin
//                 </h2>
//             </Link>
//             <h2 style={{paddingLeft:'8px'}}>Manage Kendaraan</h2>
//             <Link href={"/owner/manage-instruktur"}>
//                 <h2 style={{paddingLeft:'8px'}}>
//                     Manage Instruktur
//                 </h2>
//             </Link>
//             <Link href={"/owner/manage-kelas"}>
//                 <h2 style={CurrentPageStyle}>
//                     Manage Kelas
//                 </h2>
//             </Link>
//         </OpenClosedSideBar>
//         <div style={{margin: '16px', flex:'1'}}>
//           <h1>Kelas List</h1>
//           {/* <h2>Hello, {session?.user.name}</h2> */}
//           <KelasList/>
//           <LinkButton route="/owner/manage-kelas/create-kelas" text="Buat Data Baru"/>
//         </div>
//         {/* <div style={{margin: '8px'}}>
//           <h2>Hello, {session?.user.name}</h2>
//           <TableContent/>
//             <Link href={"/owner/manage-kelas/create-kelas"}>
//               <Button1 id="create-button" text="Create New Data" textColor="black" bgColor="yellow" type='button' />
//             </Link>
//         </div> */}
//       </Row>
//     </div>
//   )
// }

// export default ManageKelasPage

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
import JadwalList from './JadwalList'
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
          <h1 style={{paddingBottom:'8px'}}>Jadwal List</h1>
          <JadwalList/>
          <div className='mt-2'>
            <LinkButton route="/admin/manage-jadwal/create-jadwal" text="Buat Data Baru"/>
          </div>
        </div>
      </Row>
    </div>
  )
}

export default ManageJadwalPage

// const Home = () => {

//   return (
//     <div>
//       <h1>Next.js Date Input Example</h1>
//       <DatePickerInput name='tanggal'/>
//     </div>
//   );
// };

// export default Home;