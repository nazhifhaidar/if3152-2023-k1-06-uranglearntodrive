import React, { ReactNode } from 'react';
import Logout from '../login/logout';
import Link from 'next/link';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import LoginLogoutLink from './LoginLogoutLink';

const LoginLogout: React.FC = async () => {
  const session = await getServerSession(options);

  

  return (
    <nav>
      {!session ? (
        <LoginLogoutLink />
        
      ) : (
        <Logout />
      )}
    </nav>
  );
};

export default LoginLogout;
