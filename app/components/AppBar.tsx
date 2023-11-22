// AppBar.tsx

import React, { ReactNode } from 'react'
import Image from "next/image"

interface Props{
    children?: ReactNode;

}

const AppBar: React.FC<Props> = ({children }) => {
    const appBarStyle: React.CSSProperties = {
      padding: '10px 20px',
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0px 0px 4px 0px',
      boxShadow: '0px 3px 4px rgba(10, 10, 10, 0.4)',
    };
  
    return (
      <div style={appBarStyle} className='bg-blue-300 border border-blue-400'>
        <Image src="/ULtD.svg" alt="Logo" width={120} height={50} />
        {children}
      </div>
    );
  }

export default AppBar