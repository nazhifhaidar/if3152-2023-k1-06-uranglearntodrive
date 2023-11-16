import React, { ReactNode } from 'react'

interface Props{
    children:ReactNode,
    justifyContent?: string,
    alignItems?: string
}

const Row:React.FC<Props> = ({ children, justifyContent, alignItems }) => {
    const rowStyle:React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: justifyContent || 'flex-start',
      alignItems: alignItems || 'stretch',
      width: '100%', // You can adjust the width based on your needs
    };
  
    return <div style={rowStyle}>{children}</div>;
  };
  
  export default Row;