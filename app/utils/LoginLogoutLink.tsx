'use client'

import Link from 'next/link';
import React from 'react'

const LoginLogoutLink:React.FC = () => {
    const handleMouseEnter = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.persist();
        event.currentTarget.style.backgroundColor = "rgba(175, 201, 154, 0.6)";
      };
    
      const handleMouseLeave = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.persist()
        event.currentTarget.style.backgroundColor = "";
      };
  return (
    <div>
        <Link href="/login" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Login</Link>
    </div>
  )
}

export default LoginLogoutLink