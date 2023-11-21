import React from 'react';
import AppBar from '@/app/components/AppBar';
import LoginLogout from '@/app/utils/loginlogout';
import Link from 'next/link';
import Row from '@/app/components/Row';
import ClassList from './ClassList';

const EnrollPage: React.FC = () => {

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
        <h1> Ayo pilih kelasmu! </h1>
        <br/>
        <Row>
            <ClassList/>
        </Row>
        </>
    )
}

export default EnrollPage;