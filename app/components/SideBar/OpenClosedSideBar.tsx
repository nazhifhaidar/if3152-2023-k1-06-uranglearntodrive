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

/**
 * Komponen `OpenClosedSideBar` digunakan untuk membuat sidebar yang dapat dibuka dan ditutup.
 * @component
 *
 * @param {Object} props - Properti komponen `OpenClosedSideBar`.
 * @param {ReactNode} [props.children] - Anak-anak dari komponen `OpenClosedSideBar`.
 * @param {string} props.background_color - Warna latar belakang sidebar.
 * @param {string} props.border_color - Warna border (garis tepi) sidebar.
 * @param {string} props.width - Lebar sidebar.
 * @param {string} [props.margin] - Margin untuk seluruh komponen `OpenClosedSideBar`.
 * @param {string} [props.marginElement] - Margin untuk setiap elemen anak di dalam sidebar.
 *
 * @example
 * // Penggunaan Komponen `OpenClosedSideBar` dengan anak-anak di dalamnya.
 * <OpenClosedSideBar background_color="#EDEDED" border_color="#333" width="250px" margin="10px">
 *   <Link href="/lorem-ipsum"> 
 *      <h1>Lorem Ipsum <h1/>
 *   <Link />
 *   <Link href="/dolor-sit-amet"> 
 *      <h1>Dolor Sit Amet <h1/>
 *   <Link />
 * </OpenClosedSideBar>
 */
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