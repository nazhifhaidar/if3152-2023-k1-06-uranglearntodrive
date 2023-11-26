'use client'

// "app/owner/manage-admin/create"

import Button1 from "@/app/components/Buttons/Button1";
import PasswordField from "@/app/components/TextField/PasswordField";
import TextField1 from "@/app/components/TextField/TextField1";
import TextField2 from "@/app/components/TextField/TextField2";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import React, { useEffect } from 'react';
import { useMessageContext } from "@/app/components/Providers/MessageProvider";

const url = process.env.NEXTAUTH_URL;

interface EditInstrukturFormProps {
    // Define your parameter types here
    id: string;
  }

const EditInstrukturForm:React.FC<EditInstrukturFormProps> = (params) => {
  const router = useRouter();
  const {showMessage} = useMessageContext();
  const [nama_lengkap, setNamaLengkap] = useState<string>('');
  const [nik, setNIK] = useState<string>('');
  const [alamat, setAlamat] = useState<string>('');
  const [no_telp, setNoTelp] = useState<string>('');
  const [instrukturs, setInstrukturs] = useState<Record<string, any>>([]);
  const [loading,setLoading] = useState(true);
  const [disable,setDisable] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/instruktur/${params.id}`,
            {
                method: 'GET',
                body: null,
                headers: { "Content-Type": "application/json" }
            }
        );
        const data = await response.json();
        setInstrukturs(data?.data);
        setLoading(false)
        // Assuming data is an array of objects
      } catch (error) {
        console.log('Error fetching data:', error);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    setNamaLengkap(instrukturs.nama_lengkap);
    setNIK(instrukturs.nik);
    setAlamat(instrukturs.alamat);
    setNoTelp(instrukturs.no_telp);
  },[instrukturs.nama_lengkap,instrukturs.alamat,instrukturs.no_telp,instrukturs.nik,params.id]);

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
    const nama_lengkap = formData.get("nama_lengkap")
    const nik = formData.get("nik")
    const alamat = formData.get("alamat")
    const no_telp = formData.get("no_telp")
    const response = await fetch(`/api/instruktur/${params.id}`, {
      method:'PUT',
      body: JSON.stringify({
          nama_lengkap:nama_lengkap,
          nik:nik,
          alamat: alamat,
          no_telp: no_telp
      }),
      headers: { "Content-Type": "application/json" }
  })
  if (response.ok){
      const data= await response.json();
      console.log(data);
      router.push('/owner/manage-instruktur');
      showMessage("Instruktur Updated successfully", "success");
  } else{
      const data= await response.json();
      console.error(data);
      showMessage(data.message, "error");
  }
  };

  // const [nama_lengkap, setNamaLengkap] = useState<string>(`${instrukturs.nama_lengkap}`);
  // const [nik, setNIK] = useState<string>(`${instrukturs.nik}`);
  // const [alamat, setAlamat] = useState<string>(`${instrukturs.alamat}`);
  // const [no_telp, setNoTelp] = useState<string>(`${instrukturs.no_telp}`);
  
  return (
      <div style={{width:'max-content'}}>
        <h1>Edit Instruktur</h1>
        <form onSubmit={handleSubmit} >
            <TextField2 label="ID" name='id' value={params.id} type="text" onChange={handleNamaLengkapChange} loading={disable}/>
            <TextField2 label="NamaLengkap" name='nama_lengkap' value={loading?'Loading...' : nama_lengkap} type="text" onChange={handleNamaLengkapChange} loading={loading}/>
            <TextField2 label="NIK" name='nik' value={loading? 'Loading...': nik} type="text" onChange={handleNIKChange} loading={loading}/>
            <TextField2 label="Alamat" name='alamat' value={loading? 'Loading...': alamat} type="text" onChange={handleAlamatChange} loading={loading}/>
            <TextField2 label="NomorTelp" name='no_telp' value={loading? 'Loading...': no_telp} type="text" onChange={handleNoTelpChange} loading={loading}/>
            <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', flexDirection:'row' }}>
              <Button1 id="submit-button" text="Save Instruktur" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
              <Link href={"/owner/manage-instruktur"}>
                <Button1 id="cancel_button" text="Cancel" textColor="black" bgColor="white" type='button' style={{margin:'8px'}}/>
              </Link>
            </div>
        </form>
      </div>
  )
}

export default EditInstrukturForm