'use client'

import React, { ReactNode, useState } from 'react'
import Row from '../Row';
import SideBar from './SideBar';

interface OpenClosedSideBarProps{
    children?: ReactNode,
    background_color: string,
    border_color: string,
    width: string,
    margin?: string,
    marginElement?:string
}


const OpenClosedSideBar:React.FC<OpenClosedSideBarProps> = ({children, background_color, border_color, width,margin, marginElement}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
      };


      const childStyle: React.CSSProperties = {
        margin: marginElement || '12px 8px 12px 0px', // Default margin if not provided
      };
    
    return (
        <Row alignItems='stretch' justifyContent='flex-start'>
            {isSidebarOpen &&(
                <SideBar 
                    background_color={background_color} 
                    border_color={border_color} 
                    width={width} 
                    margin={margin}
                    marginElement={marginElement}
                >
                {React.Children.map(children, (child) => (
                    <div style={childStyle}>{child}</div>
                ))}   
                </SideBar>
            )}
            <button onClick={toggleSidebar} style={{marginLeft:'8px', marginTop:'4px', marginRight:'4px', fontSize:'24px', 
            backgroundColor:'rgba(96, 165, 250, 1)',
            borderColor:'black',
            paddingLeft:'10px',
            paddingRight:'10px',
            paddingBottom:'4px',
             borderRadius:'5px'}} >☰</button>
        </Row>
    )
}

export default OpenClosedSideBar