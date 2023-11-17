'use client'

import { Session } from "inspector";
import { signOut } from "next-auth/react"


export default function Logout(){
    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.persist();
        event.currentTarget.style.backgroundColor = "rgba(175, 201, 154, 0.6)";
      };
    
    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.persist();
        event.currentTarget.style.backgroundColor = "";
      };
    return(
        <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={()=>{
            signOut();
        }}>
            Log Out
        </button>
    )
}