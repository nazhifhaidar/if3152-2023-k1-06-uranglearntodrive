// AppBar.tsx

import React, { ReactNode } from 'react'

interface Props{
    children?: ReactNode;

}

const AppBar: React.FC<Props> = ({children }) => {
    const appBarStyle: React.CSSProperties = {
      backgroundColor: '#f7f779',
      padding: '10px 20px',
      border: '1px solid #000', // Add the outline
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: '0px 0px 4px 0px',
      boxShadow: '0px 4px 6px rgba(10, 10, 10, 0.2)',
    };
  
    return (
      <div style={appBarStyle}>
        {children}
      </div>
    );
  }

export default AppBar