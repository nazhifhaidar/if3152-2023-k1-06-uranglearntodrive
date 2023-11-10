import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import AppBar from '../components/AppBar';
import LoginLogout from '../utils/loginlogout';
import RootLayout from '../layout';
import Provider from '../Provider';

const page = async () => {
    const session = await getServerSession(options);
    return (
        <Provider>
            <AppBar > <LoginLogout></LoginLogout></AppBar> 
            {session ? (
                    <div> Hello World!! </div>
                ) : (
                    <div> Hello Nigg..</div>
                )
            }
        </Provider>
    )
}

export default page