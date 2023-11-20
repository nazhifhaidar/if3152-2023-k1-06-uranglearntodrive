'use client'

import React from 'react'
import { redirect } from 'next/navigation'
import Button2 from '@/app/components/Buttons/Button2'
import Link from 'next/link'

const CreateAdminButton:React.FC = () => {

  return (
    <Link href="/owner/manage-admin/create">
        <Button2 text='Buat Akun Baru'></Button2>  
    </Link>
   
  )
}

export default CreateAdminButton