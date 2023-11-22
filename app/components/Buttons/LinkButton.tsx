'use client'

import React from 'react'
import { redirect } from 'next/navigation'
import Button2 from '@/app/components/Buttons/Button2'
import Link from 'next/link'

interface LinkButtonProps {
    route:string;
    text: string;
//   onSelect: (selectedValue: string) => void;
}

const LinkButton:React.FC<LinkButtonProps> = (params) => {

  return (
    <Link href={params.route}>
        <Button2 text={params.text}></Button2>  
    </Link>
   
  )
}

export default LinkButton