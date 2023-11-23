import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import AppBar from '../components/AppBar';
import LoginLogout from '../utils/loginlogout';
import InformationCard from '../components/Cards/InformationCard';
import Button2 from '../components/Buttons/Button2';
import Grid from '../components/Grid';

const page = async () => {
    const session = await getServerSession(options);
    const data = 
    (
        <>
            <h3>It&apos;s Me, Hi</h3>
            <h3>I&apos;m the problem, It&apos;s Me</h3>
            <h3>At tea time, everybody agrees</h3>
            <h3></h3>
        </>
    );

    const buttons = 
    (
        <>
            <Button2 text='Delete'></Button2>
        </>
    );

    const grid =
    (
        <>
            <Grid rows={5} columns={5}/>
        </>
    )
    return (
        <>
            <AppBar > <LoginLogout></LoginLogout></AppBar> 
            {session ? (
                    <div> Hello, {session.user.name}!! </div>
                ) : (
                    <div> Hello Nigg..</div>
                )
            }
            <InformationCard data={data} buttons={buttons} ></InformationCard>
            {grid}
        </>
    )
}

export default page