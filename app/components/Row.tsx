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
      width: 'fit-content', // You can adjust the width based on your needs
    };

    const childStyle: React.CSSProperties = {
      display: 'inline-block', // Make children inline-block
    };

    const childrenWithStyles = React.Children.map(children, (child) => (
      <div style={childStyle}>{child}</div>
    ));
  
    return <div style={rowStyle}>{childrenWithStyles}</div>;
  };
  
  export default Row;