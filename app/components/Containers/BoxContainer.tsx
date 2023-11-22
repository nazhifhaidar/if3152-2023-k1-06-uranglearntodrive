//RoundedBoxContainers.tsx
/*
Komponen ini bertujuan untuk membuat sebuah kontainer 
dengan border melengkung yang dapat diisi dengan child
 berupa komponen react yang lain
*/

import React, { ReactNode } from 'react'

interface BoxContainerProps{     
    children: ReactNode
}

const BoxContainer: React.FC<BoxContainerProps> = ({
    children,
  }) => {
    const containerStyle: React.CSSProperties = {
      width: `400px`,
      height: `fit-content`,
      borderRadius: `20px`, // Menentukan kelengkungan sudut
      border: `2px solid #000`, 
      textAlign: 'center', 
      padding: '2rem', 
      backgroundColor: 'rgba(147, 197, 253, 1.0)',
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'center',
    };
  
    return (
      <div style={containerStyle}>
        {children}
      </div>
    );
  };

export default BoxContainer