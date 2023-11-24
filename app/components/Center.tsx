import React, { ReactNode } from 'react';

interface CenterProps {
  children: ReactNode;
  alignItems?: string;
  justifyContent?:string;
  minHeight?: string;
  margin?: string;
}

const Center: React.FC<CenterProps> = ({ children, alignItems='center', justifyContent='center', minHeight='0px', margin}) => {
  const centerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: justifyContent,
    alignItems: alignItems,
    minHeight: minHeight,
    margin: margin
  };

  return (
    <div style={centerStyle} >
      {children}
    </div>
  );
};

export default Center;
