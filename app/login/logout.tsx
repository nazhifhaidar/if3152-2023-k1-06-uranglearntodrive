'use client'

import { Session } from "inspector";
import { signOut } from "next-auth/react"


export default function Logout(){
    return(
        <button className="border border-black px-4 bg-red-500 text-white hover:bg-red-600" onClick={()=>{
            signOut();
        }}>
            Log Out
        </button>
    )
}