// AppBar.tsx

import React, { ReactNode } from 'react'

interface Props{
    children?: ReactNode;

}

const AppBar: React.FC<Props> = ({children }) => {
    const appBarStyle: React.CSSProperties = {
      backgroundColor: 'yellow',
      padding: '10px 20px',
      border: '1px solid #000', // Add the outline
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0px'
    };
  
    return (
      <div style={appBarStyle}>
        {children}
      </div>
    );
  }

export default AppBar