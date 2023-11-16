// AppBar.tsx

import React, { ReactNode } from 'react'
import Image from "next/image"

interface Props{
    children?: ReactNode;

}

const AppBar: React.FC<Props> = ({children }) => {
    const appBarStyle: React.CSSProperties = {
      backgroundColor: '#b9eb94',
      padding: '10px 20px',
      border: '1px solid #96d665', // Add the outline
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0px 0px 4px 0px',
      boxShadow: '0px 3px 4px rgba(10, 10, 10, 0.4)',
    };
  
    return (
      <div style={appBarStyle}>
        <Image src="/ULtD.svg" alt="Logo" width={120} height={50} />
        {children}
      </div>
    );
  }

export default AppBar