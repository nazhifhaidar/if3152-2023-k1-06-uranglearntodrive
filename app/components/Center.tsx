import React, { ReactNode } from 'react';

interface CenterProps {
  children: ReactNode;
  alignItems?: string;
}

const Center: React.FC<CenterProps> = ({ children, alignItems='center' }) => {
  const centerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: alignItems,
    minHeight: '100vh',
  };

  return (
    <div style={centerStyle} >
      {children}
    </div>
  );
};

export default Center;
