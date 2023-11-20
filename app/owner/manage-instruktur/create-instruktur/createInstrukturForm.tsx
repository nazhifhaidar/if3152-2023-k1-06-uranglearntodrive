'use client'
import { ChangeEvent } from 'react';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import TextField2 from '@/app/components/TextField/TextField2';
import PasswordField from '@/app/components/TextField/PasswordField';
import Button1 from '@/app/components/Buttons/Button1';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';

const CreateInstrukturForm:React.FC = () => {
  const [nama_lengkap, setNamaLengkap] = useState<string>('');
  const [nik, setNIK] = useState<string>('');
  const [alamat, setAlamat] = useState<string>('');
  const [no_telp, setNoTelp] = useState<string>('');

  const handleNamaLengkapChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNamaLengkap(event.target.value);
  };

  const handleNIKChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNIK(event.target.value);
  };

  const handleAlamatChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAlamat(event.target.value);
  };

  const handleNoTelpChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNoTelp(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a data object to send in the POST request
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("nama_lengkap"))
    console.log(formData.get("nik"))
    console.log(formData.get("alamat"))
    console.log(formData.get("no_telp"))
    // console.log(formData.get("password"))
    // const response = await signIn('credentials', {
    //   username: formData.get("username"),
    //   password: formData.get("password"),
    //   redirect: true,
    //   callbackUrl: "/check"
    // });
  };

//   const handlePasswordVisibilityToggle = () => {
//     setShowPassword(!showPassword);
//   };
  return (
    <form onSubmit={handleSubmit} >
        <TextField2 label="NamaLengkap" name='Nama Lengkap' value={nama_lengkap} type="text" onChange={handleNamaLengkapChange} />
        <TextField2 label="NIK" name='NIK' value={nik} type="text" onChange={handleNIKChange} />
        <TextField2 label="Alamat" name='Alamat' value={alamat} type="text" onChange={handleAlamatChange} />
        <TextField2 label="NomorTelp" name='Nomor Telepon' value={no_telp} type="text" onChange={handleNoTelpChange} />
        <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button1 id="submit-button" text="Create" textColor="black" bgColor="yellow" type='submit'/>
            <Link href={"/owner/manage-instruktur"}>
              <Button1 id="submit-button" text="Cancel" textColor="black" bgColor="yellow" type='reset'/>
            </Link>
            
        </div>
    </form>
  )
}

export default CreateInstrukturForm