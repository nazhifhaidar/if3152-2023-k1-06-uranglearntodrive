//RoundedBoxContainers.tsx
/*
Komponen ini bertujuan untuk membuat sebuah kontainer 
dengan border melengkung yang dapat diisi dengan child
 berupa komponen react yang lain
*/

import React, { ReactNode } from 'react'

interface RoundedBoxContainerProps{
    lebar:number,           //dalam pixel
    tinggi:number,          //dalam pixel
    titik_pusat?: number     //dalam pixel
    sudut: number,          // dalam pixel, menentukan kelengkungan sudut
    child: ReactNode
    warna_latar_belakang: string;
}

const RoundedBoxContainer: React.FC<RoundedBoxContainerProps> = ({
    lebar,
    tinggi,
    titik_pusat,
    sudut,
    warna_latar_belakang,
    child,
  }) => {
    const containerStyle: React.CSSProperties = {
      width: `${lebar}px`,
      height: `${tinggi}px`,
      borderRadius: `${sudut}px`, // Menentukan kelengkungan sudut
      border: '2px solid #000', 
      textAlign: 'center', 
      padding: '10px', 
      backgroundColor: `${warna_latar_belakang}`
    };
  
    return (
      <div style={containerStyle}>
        {child}
      </div>
    );
  };

export default RoundedBoxContainer