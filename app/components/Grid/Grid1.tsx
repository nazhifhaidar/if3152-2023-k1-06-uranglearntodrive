'use client'
import React from 'react';


interface GridProps {
   rows: number;
   columns: number;
   children: React.ReactNode;
}

const Grid1: React.FC<GridProps> = ({ rows, columns, children }) => {
   const gridStyle = {
       display: 'grid',
       gridTemplateRows: `repeat(${rows}, 1fr)`,
       gridTemplateColumns: `repeat(${columns}, 1fr)`,
       gap: '8px',
   };

   return (
       <div style={gridStyle}>
           {children}
       </div>
   );
};

export default Grid1;