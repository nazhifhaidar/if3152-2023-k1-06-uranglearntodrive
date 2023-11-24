import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import Toast from '../components/Toast/Toast';

export default async function ownerLayout({children,}: {children: React.ReactNode})
{
    const session = await getServerSession(options);
    if (!session) redirect('/api/auth/signin?callbackUrl=/owner');
    if (session?.user.role !== "OWNER"){
        redirect("/");
    }
    return (
        <>
        {children}
        <Toast/>
        </>
        
    )
}