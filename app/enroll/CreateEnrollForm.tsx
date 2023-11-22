'use client'

import React, { ChangeEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import TextField2 from '../components/TextField/TextField2';
import Button1 from '../components/Buttons/Button1';

const CreateEnrollForm:React.FC = () => {
    const router = useRouter();
    const [nama, setNama] = useState<string>('');
    const [umur, setUmur] = useState<string>('');
    const [telp, setTelp] = useState<string>('');
    const [alamat, setAlamat] = useState<string>('');
    const [tipe, setTipe] = useState<string>('');

    const handleNama = (event: ChangeEvent<HTMLInputElement>) => {
        setNama(event.target.value);
    };
    const handleUmur = (event: ChangeEvent<HTMLInputElement>) => {
        setUmur(event.target.value);
    }; 
    const handleTelp = (event: ChangeEvent<HTMLInputElement>) => {
        setTelp(event.target.value);
    }; 
    const handleAlamat = (event: ChangeEvent<HTMLInputElement>) => {
        setAlamat(event.target.value);
    }; 
    const handleTipe = (event: ChangeEvent<HTMLInputElement>) => {
        setTipe(event.target.value);
    }; 

    const handleEnroll = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Create a data object to send in the POST request
        const formData = new FormData(event.currentTarget);
        // console.log(formData.get("username"))
        // console.log(formData.get("password"))
        // console.log(formData.get("username"));
        // console.log(formData.get("password"));
        // console.log(formData.get("confirm_password"));
        const nama = formData.get("nama");
        const umur = formData.get("umur");
        const telp = formData.get("telp");
        const alamat = formData.get("alamat");
        const tipe = formData.get("tipe");
        const param = useSearchParams();
        const id = param?.get("id");

        const response = await fetch(`/api/enroll`, {
            method: 'POST',
            body: JSON.stringify({
                nama:nama,
                id:parseInt(id as string, 10),
                umur:umur,
                telp:telp,
                alamat:alamat,
                tipe:tipe
            }),
            headers: { "Content-Type": "application/json" }
        });
        const data= await response.json();
        if (response.ok) {
            console.log(data);
        }
        else{
            console.error(data);
        }   
    }
    return (
        <div style={{width:'max-content'}}>
            <h1>Create Admin</h1>
            <form onSubmit={handleEnroll} >
                <TextField2 label="Nama Lengkap" name='nama' value={nama} type="text" onChange={handleNama} />
                <TextField2 label="Umur" name='umur' value={umur} type="number" onChange={handleUmur} />
                <TextField2 label="No. Telpon" name='telp' value={telp} type="text" onChange={handleTelp} />
                <TextField2 label="Alamat" name='alamat' value={alamat} type="text" onChange={handleAlamat} />
                <TextField2 label="Tipe Kendaraan" name='tipe' value={tipe} onChange={handleTipe} />
                <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', flexDirection:'row' }}>
                    <Button1 id="enroll" text="Enroll!" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
                    <Link href={"/enroll"}>
                        <Button1 id="cancel" text="Cancel" textColor="black" bgColor="white" type='button' style={{margin:'8px'}}/>
                    </Link>
                </div>
            </form>
        </div>
       
  )
}

export default CreateEnrollForm;