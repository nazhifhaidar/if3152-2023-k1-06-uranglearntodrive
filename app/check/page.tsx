'use client'

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const MyPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/api/auth/signin?callbackUrl=/check');
    },
  });

  if (session?.user.role === "OWNER"){
    redirect('/owner')
  }else{
    redirect('/hello')
  }

  return <div>Checking session...</div>;
};

export default MyPage;
