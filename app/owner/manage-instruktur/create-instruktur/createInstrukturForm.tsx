'use client'

// "app/owner/manage-admin/create"

import Button1 from "@/app/components/Buttons/Button1";
import { useMessageContext } from "@/app/components/Providers/MessageProvider";
import PasswordField from "@/app/components/TextField/PasswordField";
import TextField1 from "@/app/components/TextField/TextField1";
import TextField2 from "@/app/components/TextField/TextField2";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

const url = process.env.NEXTAUTH_URL;

const CreateInstrukturForm:React.FC = () => {
  const router = useRouter();
  const {showMessage} = useMessageContext();
  const [nama_lengkap, setNamaLengkap] = useState<string>('');
  const [nik, setNIK] = useState<string>('');
  const [alamat, setAlamat] = useState<string>('');
  const [no_telp, setNoTelp] = useState<string>('');
  const [loading,setLoading] = useState(false)

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
    setLoading(true)
    const response = await fetch('/api/instruktur', {
      method:'POST',
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
      showMessage(data.message, "success");
      router.push('/owner/manage-instruktur');
  } else{
      const data= await response.json();
      showMessage(data.message, "error");
      console.error(data);
  }
  };

  return (
      <div style={{width:'max-content'}}>
        <h1>Create Instruktur</h1>
        <form onSubmit={handleSubmit} >
            <TextField2 label="NamaLengkap" name='nama_lengkap' value={nama_lengkap} type="text" onChange={handleNamaLengkapChange} loading={loading}/>
            <TextField2 label="NIK" name='nik' value={nik} type="text" onChange={handleNIKChange} loading={loading}/>
            <TextField2 label="Alamat" name='alamat' value={alamat} type="text" onChange={handleAlamatChange} loading={loading}/>
            <TextField2 label="NomorTelp" name='no_telp' value={no_telp} type="text" onChange={handleNoTelpChange} loading={loading}/>
            <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', flexDirection:'row' }}>
              <Button1 id="submit-button" text="Create Instruktur" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
              <Link href={"/owner/manage-instruktur"}>
                <Button1 id="cancel_button" text="Cancel" textColor="black" bgColor="white" type='button' style={{margin:'8px'}}/>
              </Link>
            </div>
        </form>
      </div>
  )
}

export default CreateInstrukturForm