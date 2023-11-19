'use client'

import React, { ReactNode, useState} from 'react'

interface Props{
    children?: ReactNode,
    background_color: string,
    border_color: string,
    width: string,
    margin?: string,
    marginElement?:string
}

const SideBar: React.FC<Props> = ({children, background_color, border_color, width, margin, marginElement}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };

    const style : React.CSSProperties = {
        width: width,
        height: '100vh',
        backgroundColor: `${background_color}`,
        borderRight: `1px solid ${border_color}`,
        justifyContent: 'flex-start',
        paddingLeft: '8px',
        margin: margin
    }

    const childStyle: React.CSSProperties = {
        margin: marginElement || '12px 8px 12px 0px', // Default margin if not provided
      };
  return (
    // the children will be the elements of the side bar that contains Link to some pages
    <div style={style} >
        {React.Children.map(children, (child) => (
        <div style={childStyle}>{child}</div>
      ))}      
    </div>
  )
}

export default SideBar