//RoundedBoxContainers.tsx
/*
Komponen ini bertujuan untuk membuat sebuah kontainer 
dengan border melengkung yang dapat diisi dengan child
 berupa komponen react yang lain
*/

import React, { ReactNode } from 'react'

interface SectionContainerProps{  
    w: number,
    bg_col: string,
    bdr_col: string,
    children: ReactNode
}

const SectionContainer: React.FC<SectionContainerProps> = ({
    w,
    bg_col,
    bdr_col,
    children,
  }) => {
    const containerStyle: React.CSSProperties = {
      width: `${w}%`,
      height: `fit-content`,
      borderRadius: `20px`, // Menentukan kelengkungan sudut
      border: `2px solid ${bdr_col}`, 
      textAlign: 'center', 
      padding: '2rem', 
      backgroundColor: `${bg_col}`,
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

export default SectionContainer