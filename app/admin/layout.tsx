import { getServerSession } from 'next-auth'
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';

export default async function adminLayout({children,}: {children: React.ReactNode})
{
    const session = await getServerSession(options);
    if (!session) redirect('/api/auth/signin?callbackUrl=/admin');
    if (session?.user.role !== "ADMIN"){
        redirect("/");
    }
    return (
        <>{children}</>
        
    )
}