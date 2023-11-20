//RoundedBoxContainers.tsx
/*
Komponen ini bertujuan untuk membuat sebuah kontainer 
dengan border melengkung yang dapat diisi dengan child
 berupa komponen react yang lain
*/

import React, { ReactNode } from 'react'

interface BoxContainerProps{
    lebar:number,           //dalam pixel
    tinggi:number,          //dalam pixel
    titik_pusat?: number     //dalam pixel
    sudut: number,          // dalam pixel, menentukan kelengkungan sudut
    children: ReactNode
    warna_latar_belakang: string,
    border_color: string,
}

const BoxContainer: React.FC<BoxContainerProps> = ({
    lebar,
    tinggi,
    titik_pusat,
    sudut,
    warna_latar_belakang,
    children,
    border_color
  }) => {
    const containerStyle: React.CSSProperties = {
      width: `${lebar}px`,
      height: `${tinggi}px`,
      borderRadius: `${sudut}px`, // Menentukan kelengkungan sudut
      border: `2px solid ${border_color}`, 
      textAlign: 'center', 
      padding: '10px', 
      backgroundColor: `${warna_latar_belakang}`,
      alignItems: 'flex-start',
      display: 'flex',
      justifyContent: 'flex-start',
    };
  
    return (
      <div style={containerStyle}>
        {children}
      </div>
    );
  };

export default BoxContainer