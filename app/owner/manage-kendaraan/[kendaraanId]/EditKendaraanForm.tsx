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

interface EditKendaraanFormProps {
    // Define your parameter types here
    id: string;
  }

const EditKendaraanForm:React.FC<EditKendaraanFormProps> = (params) => {
    const router = useRouter();
    const [nama, setNama] = useState<string>('');
    const [tipe_kendaraan, setTipe] = useState<string>('');
    const [tanggal_servis, setTanggal] = useState<string>('');
    const [status_kendaraan, setStatus] = useState<string>('');
    const {showMessage} = useMessageContext();

    const statusOptions = ['Dipakai', 'Diperbaiki', 'Siap'];
    const tipeOptions = ['Matic','Manual'];

  const [kendaraans, setKendaraans] = useState<Record<string, any>>([]);
  
  const [loading,setLoading] = useState(true);
  const [disable,setDisable] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/kendaraan/${params.id}`,
            {
                method: 'GET',
                body: null,
                headers: { "Content-Type": "application/json" }
            }
        );
        const data = await response.json();
        setKendaraans(data?.data);
        setLoading(false)
        // Assuming data is an array of objects
      } catch (error) {
        showMessage(error as string, "error");
        console.error('Error fetching data:', error);
        console.log('Error params:', params.id);
      }
    };
    fetchData();
    setNama(kendaraans.nama);
    setTipe(kendaraans.tipe_kendaraan);
    setTanggal(kendaraans.tanggal_servis);
    setStatus(kendaraans.status_kendaraan);
  },[kendaraans.nama,kendaraans.tipe_kendaraan,kendaraans.tanggal_servis,kendaraans.status_kendaraan,params.id]);

    const handleNamaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNama(event.target.value);
    };

    const handleTipeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setTipe(event.target.value);
    }; 

    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value); console.log(event.target.value)
    }

    const handleTanggalChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTanggal(event.target.value);
    };


const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a data object to send in the POST request
    // const formData = new FormData(event.currentTarget);
    // const nama_lengkap = formData.get("nama_lengkap")
    // const nik = formData.get("nik")
    // const alamat = formData.get("alamat")
    // const no_telp = formData.get("no_telp")

    const response = await fetch(`/api/kendaraan/${params.id}`, {
      method:'PUT',
      body: JSON.stringify({
        nama:nama,
        tipe_kendaraan: tipe_kendaraan,
        status_kendaraan: status_kendaraan,
        tanggal_servis: new Date (tanggal_servis).toISOString().substring(0,10),
      }),
      headers: { "Content-Type": "application/json" }
  })
  if (response.ok){
      const data= await response.json();
      showMessage(data.message, "success");
      router.push('/owner/manage-kendaraan');
  } else{
      const data= await response.json();
      showMessage(data.message, "error");
      console.error(data);
  }
  };

  return (
    <div style={{width:'max-content'}}>
        <h1>Edit Kendaraan</h1>
        <form onSubmit={handleSubmit} >
            
            <TextField2 label="Nama Kendaraan" name='nama' value={loading?'Loading...' : nama} type="text" onChange={handleNamaChange} loading={loading}/>
            {/* <TextField2 label="Tipe" name='tipe' value={tipe_kendaraan} type="text" onChange={handleTipeChange}/> */}
            <div>
                <label htmlFor="tipe">Tipe</label>
                <div className="select-container" style={{ width: '450px', paddingLeft: '4px', position: 'relative', border: '2px solid #ccc' }}>
                    <select id="tipe"  value={tipe_kendaraan} onChange={handleTipeChange}  style={{ width: '100%', border: 'none', backgroundPosition: 'calc(100% - 20px) center' }}>
                    <option value="" disabled>Select Tipe</option>
                    {tipeOptions.map((option) => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                    ))}
                    </select>
                    <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    </div>
                </div>
            </div>
            
            <div>
                <label htmlFor="status">Status</label>
                <div className="select-container" style={{ width: '450px', paddingLeft: '4px', position: 'relative', border: '2px solid #ccc' }}>
                    <select id="status" value={status_kendaraan} onChange={handleStatusChange} style={{ width: '100%', border: 'none', backgroundPosition: 'calc(100% - 20px) center' }}>
                    <option value="" disabled>Select Status</option>
                    {statusOptions.map((option) => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                    ))}
                    </select>
                    <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    </div>
                </div>
            </div>


            <div>
                <label htmlFor="tanggalServis">Tanggal Servis Terakhir</label>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        type="date" // Menggunakan tipe datetime-local
                        name="tanggal_servis"
                        value={tanggal_servis} // Menampilkan hanya bagian tanggal dan waktu, tanpa zona waktu
                        onChange={handleTanggalChange}
                        style={{ width: '450px', paddingLeft: '4px', border: '2px solid #ccc' }}
                    />
                </div>
            </div>


            <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', flexDirection:'row' }}>
                <Button1 id="submit-button" text="Save Kendaraan" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
                <Link href={"/owner/manage-kendaraan"}>
                    <Button1 id="cancel_button" text="Cancel" textColor="black" bgColor="white" type='button' style={{margin:'8px'}}/>
                </Link>
                
            </div>
        </form>
    </div>
   
)
}

export default EditKendaraanForm