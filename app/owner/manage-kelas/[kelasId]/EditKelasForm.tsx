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
import DropdownInputInstruktur from "@/app/components/Dropdown/DropdownInputInstruktur";
import DropdownInputKendaraan from "@/app/components/Dropdown/DropdownInputKendaraan";

const url = process.env.NEXTAUTH_URL;

interface EditKelasFormProps {
    // Define your parameter types here
    id: string;
  }

const EditKelasForm:React.FC<EditKelasFormProps> = (params) => {
    const router = useRouter();
    const [nama, setNama] = useState<string>('');
    const [harga, setHarga] = useState<string>('');
    const [total_jam, setTotalJam] = useState<string>('');
    const [jumlah_sesi, setJumlahSesi] = useState<string>('');
    const [optionsInstruktur, setOptionsInstruktur] = useState<Record<string, any>[]>([]);
    const [optionsKendaraan, setOptionsKendaraan] = useState<Record<string, any>[]>([]);
    const [id_kendaraan, setIdKendaraan] = useState<string>('');
    const [nama_kendaraan, setNamaKendaraan] = useState<string>('');
    const [nama_instruktur, setNamaInstruktur] = useState<string>('');
    const [id_instruktur, setIdInstruktur] = useState<string>('');
    const [kelas, setKelas] = useState<Record<string, any>>([]);
    const [loading,setLoading] = useState(true);
    const [disable,setDisable] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/kelas/${params.id}`,
            {
                method: 'GET',
                body: null,
                headers: { "Content-Type": "application/json" }
            }
        );
        const data = await response.json();
        setKelas(data?.data);
        setNama(kelas.nama);
        setHarga(kelas.harga);
        setTotalJam(kelas.total_jam);
        setJumlahSesi(kelas.jumlah_sesi);
        setIdKendaraan(kelas.id_kendaraan);
        setIdInstruktur(kelas.id_instruktur);
        // setNamaKendaraan(kelas.kendaraan.nama);
        // setNamaInstruktur(kelas.instruktur.nama_lengkap);
        const fetchedOptionsInstruktur = await fetch(`/api/getIdInstruktur/`,
            {
                method: 'GET',
                body: null,
                headers: { "Content-Type": "application/json" }
            });
            const dataInstruktur = await fetchedOptionsInstruktur.json();
            // setDataIdNama(data?.data);
            setOptionsInstruktur(dataInstruktur?.data);

        const fetchedOptionsKendaraan = await fetch(`/api/getIdKendaraan/`,
            {
                  method: 'GET',
                  body: null,
                  headers: { "Content-Type": "application/json" }
            });
            const dataKendaraan = await fetchedOptionsKendaraan.json();
            // setDataIdNama(data?.data);
            setOptionsKendaraan(dataKendaraan?.data);
            setLoading(false);
        // Assuming data is an array of objects
      } catch (error) {
        console.log('Error fetching data:', error);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  },[kelas.nama, kelas.harga, kelas.id_instruktur, kelas.id_kendaraan, kelas.jumlah_sesi, kelas.total_jam, params.id]);

  const handleNamaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNama(event.target.value);
  };

  const handleHargaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHarga(event.target.value);
  }; 

  const handleTotalJamChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTotalJam(event.target.value);
  };

  const handleJumlahSesiChange = (event: ChangeEvent<HTMLInputElement>) => {
    setJumlahSesi(event.target.value);
  };

  const handleIdKendaraanChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdKendaraan(event.target.value);
  };

  const handleIdInstrukturChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdInstruktur(event.target.value);
  };

  const handleSelectInstruktur = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    setIdInstruktur(newValue);
    setNamaInstruktur(newValue);
}

const handleSelectKendaraan = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    setIdKendaraan(newValue);
    setNamaKendaraan(newValue);
}

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a data object to send in the POST request
    const formData = new FormData(event.currentTarget);
    const nama = formData.get("nama");
    const harga = formData.get("harga");
    const total_jam = formData.get("total_jam");
    const jumlah_sesi = formData.get("jumlah_sesi");
    const id_kendaraan = formData.get("id_kendaraan");
    const id_instruktur = formData.get("id_instruktur"); 
    const response = await fetch(`/api/kelas/${params.id}`, {
      method:'PUT',
      body: JSON.stringify({
        nama:nama,
        harga:harga,
        total_jam: total_jam,
        jumlah_sesi:jumlah_sesi,
        id_kendaraan:id_kendaraan,
        id_instruktur:id_instruktur
      }),
      headers: { "Content-Type": "application/json" }
  })
  if (response.ok){
      const data= await response.json();
      console.log(data);
      router.push('/owner/manage-kelas');
  } else{
      const data= await response.json();
      console.error(data);
  }
  };

  // const [nama_lengkap, setNamaLengkap] = useState<string>(`${instrukturs.nama_lengkap}`);
  // const [nik, setNIK] = useState<string>(`${instrukturs.nik}`);
  // const [alamat, setAlamat] = useState<string>(`${instrukturs.alamat}`);
  // const [no_telp, setNoTelp] = useState<string>(`${instrukturs.no_telp}`);
  
  return (
      <div style={{width:'max-content'}}>
        <h1>Edit Kelas</h1>
        <form onSubmit={handleSubmit} >
        <TextField2 label="Nama" name='nama' value={nama} type="text" onChange={handleNamaChange} loading={loading}/>
                <TextField2 label="Harga" name='harga' value={harga} type="text" onChange={handleHargaChange} loading={loading}/>
                <TextField2 label="Total Jam" name='total_jam' value={total_jam} type="text" onChange={handleTotalJamChange} loading={loading}/>
                <TextField2 label="Jumlah Sesi" name='jumlah_sesi' value={jumlah_sesi} type="text" onChange={handleJumlahSesiChange} loading={loading}/>
                {/* <Dropdown2 apiLink="/api/getIdKendaraan/" label="Id Kendaraan" name='id_kendaraan'></Dropdown2> */}
                <DropdownInputKendaraan Dropdownlabel="Nama Kendaraan" Dropdownname="id_kendaraan" DropdownValue = {id_kendaraan} TextLabel="" TextName="idkendaraan" TextValue={id_kendaraan} Loading = {loading} Options={optionsKendaraan} onSelect={handleSelectKendaraan} ></DropdownInputKendaraan>
                <DropdownInputInstruktur Dropdownlabel="Nama Instruktur" Dropdownname="id_instruktur" DropdownValue={id_instruktur} TextLabel="" TextName="idinstruktur" TextValue={id_instruktur} Loading = {loading} Options={optionsInstruktur} onSelect={handleSelectInstruktur}></DropdownInputInstruktur>
            <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', flexDirection:'row' }}>
              <Button1 id="submit-button" text="Save Kelas" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
              <Link href={"/owner/manage-kelas"}>
                <Button1 id="cancel_button" text="Cancel" textColor="black" bgColor="white" type='button' style={{margin:'8px'}}/>
              </Link>
            </div>
        </form>
      </div>
  )
}

export default EditKelasForm