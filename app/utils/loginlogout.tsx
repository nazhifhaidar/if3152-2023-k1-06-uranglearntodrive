import React, { ReactNode } from 'react';
import Logout from '../login/logout';
import Link from 'next/link';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

const LoginLogout: React.FC = async () => {
  const session = await getServerSession(options);

  return (
    <nav>
      {!!session ? (
        <Logout />
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
};

export default LoginLogout;
