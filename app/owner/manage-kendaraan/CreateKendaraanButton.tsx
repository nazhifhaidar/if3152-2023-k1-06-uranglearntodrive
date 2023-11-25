'use client'

import React from 'react'
import { redirect } from 'next/navigation'
import Button2 from '@/app/components/Buttons/Button2'
import Link from 'next/link'

const CreateKendaraanButton:React.FC = () => {

  return (
    <Link href="/owner/manage-kendaraan/create-kendaraan">
        <Button2 text='Buat Kendaraan Baru'></Button2>  
    </Link>
   
  )
}

export default CreateKendaraanButton