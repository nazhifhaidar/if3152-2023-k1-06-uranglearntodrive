'use client'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import TextField2 from '../components/TextField/TextField2';
import Button1 from '../components/Buttons/Button1';

const CreateEnrollForm:React.FC = () => {
    const param = useSearchParams();
    const router = useRouter();
    const id = param?.get('id');
    const [nama, setNama] = useState<string>('');
    const [umur, setUmur] = useState<string>('');
    const [telp, setTelp] = useState<string>('');
    const [alamat, setAlamat] = useState<string>('');
    const [tipe, setTipe] = useState<string>('');
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
            const fetchedOptionsTipe = await fetch(`/api/kendaraan/${id}`,
              {
                  method: 'GET',
                  body: null,
                  headers: { "Content-Type": "application/json" }
              });
              const dataTipe = await fetchedOptionsTipe.json();
              setTipe(dataTipe.data);
            } catch (error) {
                console.error('Error fetching options:', error);
                setLoading(false);
            }
        };
        fetchOptions();
      }, []);

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
        const nama = formData.get("nama");
        const umur = formData.get("umur");
        const telp = formData.get("telp");
        const alamat = formData.get("alamat");

        const response = await fetch(`/api/dashboard`, {
            method: 'POST',
            body: JSON.stringify({
                nama_lengkap:nama,
                id_kelas:parseInt(id as string, 10),
                umur:parseInt(umur as string, 10),
                no_telp:telp,
                alamat:alamat,
                tipe_kendaraan:tipe
            }),
            headers: { "Content-Type": "application/json" }
        });
        const data= await response.json();
        if (response.ok) {
            console.log(data);
            router.push('/classlist');
        }
        else{
            console.error(data);
        }   
    }
    return (
        <>
          <h1 style={{textAlign:'center', fontWeight:'bolder'}}>Daftar Kelas</h1>
            <div style={{maxWidth: '100%', display: 'flex', justifyContent: 'center', flexDirection:'row'}}>
              <form onSubmit={handleEnroll} >
                <TextField2 label="Nama Lengkap" name='nama' value={nama} type="text" onChange={handleNama} loading={false} />
                <TextField2 label="Umur" name='umur' value={umur} type="text" onChange={handleUmur} loading={false} />
                <TextField2 label="No. Telpon" name='telp' value={telp} type="text" onChange={handleTelp} loading={false} />
                <TextField2 label="Alamat" name='alamat' value={alamat} type="text" onChange={handleAlamat} loading={false} />
                <TextField2 label="Tipe Kendaraan" name='tipe' value={tipe} type="text" onChange={handleTipe} loading={true} />
                <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', flexDirection:'row' }}>
                    <Button1 id="enroll" text="Enroll!" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
                    <Link href={"/classlist"}>
                        <Button1 id="cancel" text="Cancel" textColor="black" bgColor="white" type='button' style={{margin:'8px'}}/>
                    </Link>
                </div>
              </form>
            </div>
        </>
       
  )
}

export default CreateEnrollForm;