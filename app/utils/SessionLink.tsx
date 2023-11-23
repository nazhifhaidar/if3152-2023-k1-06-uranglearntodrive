import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';

const SessionLink: React.FC = async () => {
    const session = await getServerSession(options);
    if (!session) {
      return null;
    }
  
    return (
      <Link href={session.user.role === 'OWNER' ? '/owner' : '/admin'}>
        <h2 style={{ marginRight: '10rem' }}>
          {session.user.role === 'OWNER' ? 'Owner' : 'Admin'}
        </h2>
      </Link>
    );
  };
  
  export default SessionLink;