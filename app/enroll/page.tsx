import AppBar from '@/app/components/AppBar'
import Row from '@/app/components/Row'
import LoginLogout from '@/app/utils/loginlogout'
import Link from 'next/link'
import React from 'react'
import CreateEnrollForm from './CreateEnrollForm'

const Enroll:React.FC = () => {
  return (
    <>
      <AppBar>
        <Row>
          <Link href={"/"} >
            <h2 style={{marginRight:'10rem'}}>
              Dashboard
            </h2>
          </Link>
          <Link href={"/classlist"} >
            <h2 style={{marginRight:'10rem'}}>
              Daftar Kelas
            </h2>
          </Link>
          <Link href={"/about"} >
            <h2 style={{marginRight:'10rem'}}>
              Tentang Perusahaan
            </h2>
          </Link>
          <LoginLogout></LoginLogout>
        </Row>
      </AppBar>
      <br/>
      <br/>
      <div className='pl-3'>
        <CreateEnrollForm/>
      </div>
    </>
  )
}

export default Enroll;