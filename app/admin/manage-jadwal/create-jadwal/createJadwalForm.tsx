'use client'

// "app/owner/manage-admin/create"

import Button1 from "@/app/components/Buttons/Button1";
import PasswordField from "@/app/components/TextField/PasswordField";
import TextField1 from "@/app/components/TextField/TextField1";
import TextField2 from "@/app/components/TextField/TextField2";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect } from "react";
import Dropdown from "@/app/components/Dropdown/Dropdown";
import DropdownInputKendaraan from "@/app/components/Dropdown/DropdownInputKendaraan";
import DatePickerInput from "@/app/components/DatePickerInput/DatePickerInput";

const url = process.env.NEXTAUTH_URL;

const CreateJadwalForm:React.FC = () => {
  const router = useRouter();
  const [optionsKelas, setOptionsKelas] = useState<Record<string, any>[]>([]);
  const [id_kelas, setIdKelas] = useState<string>('');
  const [nama_kelas, setNamaKelas] = useState<string>('');
  const [tanggal, setTanggal] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date|null>();
  const [end_sesi, setEndSesi] = useState<string>('');
  const optionsStartSesi = [10, 13, 15]; 
  const [selectedStartSesi, setSelectedStartSesi] = useState<string>('');
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
        try {
        const fetchedOptionsKelas = await fetch(`/api/getIdKelas/`,
        {
            method: 'GET',
            body: null,
            headers: { "Content-Type": "application/json" }
        });
        const dataKelas = await fetchedOptionsKelas.json();
        // setDataIdNama(data?.data);
        setOptionsKelas(dataKelas?.data);
        setLoading(false);
        } catch (error) {
            console.error('Error fetching options:', error);
            setLoading(false);
        }
    };
    fetchOptions();
  }, []);

//   const [nama_lengkap, setNamaLengkap] = useState<string>('');
//   const [nik, setNIK] = useState<string>('');
//   const [alamat, setAlamat] = useState<string>('');
//   const [no_telp, setNoTelp] = useState<string>('');
//   const [loading,setLoading] = useState(false)

  const handleEndSesiChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndSesi(event.target.value);
  };

  const handleTanggalChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTanggal(event.target.value);
  };

  const handleSelectStartSesi = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    const end_sesi = parseInt(newValue,10) + 2;
    setSelectedStartSesi(newValue);
    setEndSesi(end_sesi.toString());
  }

  const handleSelectKelas = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    setIdKelas(newValue);
    setNamaKelas(newValue);
  }

  const handleDateChange = (date: Date|null) =>{
    setSelectedDate(date)
    if (date!== null){
        // const formattedDate = date.toLocaleDateString('default', {
        //     year: 'numeric',
        //     month: '2-digit',
        //     day: '2-digit',
        //   });
          const getYear = date.toLocaleDateString('default', {
            year: 'numeric'});
          const getMonth = date.toLocaleDateString('default', {
            month: '2-digit'});
          const getDate = date.toLocaleDateString('default', {
            day: '2-digit'});
          const formattedDate = getYear + '-' + getMonth + '-' + getDate;
          setTanggal(formattedDate)
    }
  }

//   const handleNIKChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setNIK(event.target.value);
//   };

//   const handleAlamatChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setAlamat(event.target.value);
//   };

//   const handleNoTelpChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setNoTelp(event.target.value);
//   };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a data object to send in the POST request
    const formData = new FormData(event.currentTarget);
    const tanggal = formData.get("tanggal")
    const start_sesi = formData.get("start_sesi")
    const end_sesi = formData.get("end_sesi")
    const id_kelas = formData.get("id_kelas")
    console.log(id_kelas);
    console.log(new Date(`${tanggal}T$00:00:00`));
    console.log(new Date(`2000-01-01T${start_sesi}:00:00`));
    console.log(new Date(`2000-01-01T${end_sesi}:00:00`));
    setLoading(true)
    const response = await fetch('/api/jadwal', {
      method:'POST',
      body: JSON.stringify({
          tanggal:tanggal,
          start_sesi:start_sesi,
          end_sesi: end_sesi,
          id_kelas: id_kelas
      }),
      headers: { "Content-Type": "application/json" }
  })
  if (response.ok){
      const data= await response.json();
      console.log(data);
      router.push('/admin/manage-jadwal');
  } else{
      const data= await response.json();
      console.error(data);
  }
  };

  return (
      <div style={{width:'max-content'}}>
        <h1>Create Jadwal</h1>
        <form onSubmit={handleSubmit} >
            <DropdownInputKendaraan Dropdownlabel="Nama Kelas" Dropdownname="id_kelas" DropdownValue = {nama_kelas} TextLabel="Id Kelas" TextName="idkelas" TextValue={id_kelas} Loading = {loading} Options={optionsKelas} onSelect={handleSelectKelas} ></DropdownInputKendaraan>
            <DatePickerInput label='Tanggal' name='tanggal_' selectedDate={selectedDate} onDateChange={handleDateChange}/>
            <TextField2 type="hidden" label="" name="tanggal" loading={true} value={tanggal} onChange={handleTanggalChange}></TextField2>
            <Dropdown label='Start Sesi' name='start_sesi' options={optionsStartSesi} value={selectedStartSesi} onSelect={handleSelectStartSesi}></Dropdown>
            <TextField2 type="number"label="End Sesi" name="end_sesi" loading={true} value={end_sesi} onChange={handleEndSesiChange}></TextField2>
            <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', flexDirection:'row' }}>
              <Button1 id="submit-button" text="Create Jadwal" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
              <Link href={"/admin/manage-jadwal"}>
                <Button1 id="cancel_button" text="Cancel" textColor="black" bgColor="white" type='button' style={{margin:'8px'}}/>
              </Link>
            </div>
        </form>
      </div>
  )
}

export default CreateJadwalForm