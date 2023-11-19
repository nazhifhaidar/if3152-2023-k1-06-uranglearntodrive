import React, { ReactNode } from 'react';

interface CenterProps {
  children: ReactNode;
  alignItems?: string;
  justifyContent?:string;
  minHeight?: string;
}

const Center: React.FC<CenterProps> = ({ children, alignItems='center', justifyContent='center', minHeight='0px'}) => {
  const centerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: justifyContent,
    alignItems: alignItems,
    minHeight: minHeight,
  };

  return (
    <div style={centerStyle} >
      {children}
    </div>
  );
};

export default Center;
