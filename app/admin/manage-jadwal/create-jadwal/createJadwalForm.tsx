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
import DropdownInputInstruktur from "@/app/components/Dropdown/DropdownInputInstruktur";
import { useMessageContext } from '@/app/components/Providers/MessageProvider';

const url = process.env.NEXTAUTH_URL;

const CreateJadwalForm:React.FC = () => {
  const router = useRouter();
  const [kendaraan, setKendaraan] = useState<Record<string, any>[]>([]);
  const [instruktur, setInstruktur] = useState<Record<string, any>[]>([]);
  const [optionKendaraan, setOptionKendaraan] = useState<Record<string, any>[]>([]);
  const [optionInstruktur, setOptionInstruktur] = useState<Record<string, any>[]>([]);
  const [id_kelas, setIdKelas] = useState<string>('');
  const [id_kendaraan, setIdKendaraan] = useState<string>('');
  const [id_instruktur, setIdInstruktur] = useState<string>('');
  const [nama_kelas, setNamaKelas] = useState<string>('');
  const [optionsPelanggan, setOptionsPelanggan] = useState<Record<string, any>[]>([]);
  const [id_pelanggan, setIdPelanggan] = useState<string>('');
  const [nama_pelanggan, setNamaPelanggan] = useState<string>('');
  const [tanggal, setTanggal] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date|null>();
  const [end_sesi, setEndSesi] = useState<string>('');
  const optionsStartSesi = [8 ,10, 13, 15]; 
  const [selectedStartSesi, setSelectedStartSesi] = useState<string>('');
  const [loading,setLoading] = useState(true);
  const [loadingTanggal, setLoadingTanggal] = useState(true);
  const [loadingJamSesi, setLoadingJamSesi] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [tipe_kendaraan, setTipeKendaraan] = useState('');
  const [jadwal, setJadwal] = useState<Record<string, any>[]>([]);
  const {showMessage} = useMessageContext();

  useEffect(() => {
    const fetchOptions = async () => {
        try {
          const fetchedOptionsKelas = await fetch(`/api/pelanggan`,
          {
              method: 'GET',
              body: null,
              headers: { "Content-Type": "application/json" }
          });
          const dataPelanggan = await fetchedOptionsKelas.json();
          // setDataIdNama(data?.data);
          setOptionsPelanggan(dataPelanggan?.data);
          
          const fetchedKendaraan = await fetch(`/api/kendaraan`,
          {
              method: 'GET',
              body: null,
              headers: { "Content-Type": "application/json" }
          });
          const dataKendaraan = await fetchedKendaraan.json();
          // setDataIdNama(data?.data);
          setKendaraan(dataKendaraan?.data);

          const fetchedInstruktur = await fetch(`/api/instruktur`,
          {
              method: 'GET',
              body: null,
              headers: { "Content-Type": "application/json" }
          });
          const dataInstruktur = await fetchedInstruktur.json();
          setInstruktur(dataInstruktur?.data);          
          
          const response = await fetch(`/api/jadwal`,
                {
                    method: 'GET',
                    body: null,
                    headers: { "Content-Type": "application/json" }
                }
            );
            const data = await response.json();
            setJadwal(data?.data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching options:', error);
            showMessage(`Error fetching data: ${error}`, "error");
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

  const handleKelasChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNamaKelas(event.target.value);
  };

  const handleSelectStartSesi = (event: ChangeEvent<HTMLSelectElement>) =>{
    setLoading2(true);
    const newValue = event.target.value;
    setSelectedStartSesi(newValue);
    setIdInstruktur('');
    setIdKendaraan('');
    const end_sesi = parseInt(newValue,10) + 2;
    setEndSesi(end_sesi.toString());
    const areTimesEqual = (timeA:Date, timeB:string) => {
      return (
        (timeA.getHours() - 7).toString() === timeB
      );
    };
    if(jadwal){
      const reserved = jadwal.filter((item) => new Date(`${item.tanggal}`).getTime() === new Date(`${tanggal}`).getTime() && areTimesEqual(new Date(`${item.start_sesi}`), newValue))
      console.log(reserved);
      if (reserved.length !== 0){
        const checkIdPelanggan = reserved.find((item) => item.pelanggan.id.toString() === id_pelanggan);
        console.log(`Check Kelas ${checkIdPelanggan}`)
        if(!checkIdPelanggan){
          const filteredOptionInstruktur = instruktur.filter(item => reserved.some(reserved => !item.nama_lengkap.includes(reserved.instruktur.nama_lengkap)));
          const filteredOptionKendaraan = kendaraan.filter(item => reserved.some(reserved => !item.nama.includes(reserved.kendaraan.nama)) && item.tipe_kendaraan === tipe_kendaraan);
          setOptionInstruktur(filteredOptionInstruktur);
          setOptionKendaraan(filteredOptionKendaraan);
          if(filteredOptionInstruktur.length === 0 && filteredOptionKendaraan.length ===0){
            showMessage(`Tidak ada Kendaraan dan Instruktur yang tersedia:`, "error");
          }
          else{
            if(filteredOptionInstruktur.length === 0){
              showMessage(`Tidak ada Instruktur yang tersedia:`, "error");
            }
            else if(filteredOptionKendaraan.length === 0){
              showMessage(`Tidak ada Kendaraan yang tersedia:`, "error");
            }
          }
        }
        else{
          showMessage(`Pelanggan sudah memiliki jadwal pada tanggal dan jam tersebut:`, "error");
          setOptionKendaraan([])
          setOptionInstruktur([])
        }
      }
      else{
        const filteredOptionKendaraan = kendaraan.filter(item => item.tipe_kendaraan === tipe_kendaraan);
        setOptionInstruktur(instruktur);
        setOptionKendaraan(filteredOptionKendaraan);
        if(instruktur.length === 0 && filteredOptionKendaraan.length === 0){
          showMessage(`Tidak ada Kendaraan dan Instruktur yang tersedia:`, "error");
        }
        else{
          if(instruktur.length === 0){
            showMessage(`Tidak ada Instruktur yang tersedia:`, "error");
          }
          else if(filteredOptionKendaraan.length === 0){
            showMessage(`Tidak ada Kendaraan yang tersedia:`, "error");
          }
        }
      }
      // const ins = instruktur.filter(item => reserved.some(reserved => !item.nama_lengkap.includes(reserved.instruktur.nama_lengkap)))
      // const ken = kendaraan.filter(item => reserved.some(reserved => !item.nama.includes(reserved.kendaraan.nama)))
      
      // setOptionKendaraan(kendaraan.filter(item => reserved.some(reserved => !item.name.includes(reserved))));
      // setOptionInstruktur(instruktur.filter((item) => !reserved.includes(item.id_instruktur)));
      // setOptionKendaraan(kendaraan.filter((item) => !reserved.includes(item.id_kendaraan)));
      // console.log(reserved);
      // console.log(newValue);
      // console.log(`instruktur: ${ins}`);
      // console.log(`kendaraan: ${ken}`);
    }
    else{
      const filteredOptionKendaraan = kendaraan.filter(item => item.tipe_kendaraan === tipe_kendaraan);
      setOptionInstruktur(instruktur);
      setOptionKendaraan(filteredOptionKendaraan);
      if(instruktur.length === 0 && filteredOptionKendaraan.length === 0){
        showMessage(`Tidak ada Kendaraan dan Instruktur yang tersedia:`, "error");
      }
      else{
        if(instruktur.length === 0){
          showMessage(`Tidak ada Instruktur yang tersedia:`, "error");
        }
        else if(filteredOptionKendaraan.length === 0){
          showMessage(`Tidak ada Kendaraan yang tersedia:`, "error");
        }
      }
    }
    setLoading2(false);
    // const selectedPelanggan = optionsPelanggan.find((item) => item.id == newValue);
  }

  const handleSelectKelas = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    setIdKelas(newValue);
    setNamaKelas(newValue);
  }

  const handleSelectPelanggan = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    setIdPelanggan(newValue);
    setNamaPelanggan(newValue);
    setLoadingTanggal(false);
    setLoading2(true);
    setLoadingJamSesi(true);
    setSelectedDate(null);
    setTanggal('');
    setSelectedStartSesi('')
    setEndSesi('')
    setIdInstruktur('')
    setIdKendaraan('')
    const selectedPelanggan = optionsPelanggan.find((item) => item.id == newValue);
    if(selectedPelanggan){
      setTipeKendaraan(selectedPelanggan.pilihan_kelas.tipe_kendaraan);
      setIdKelas(selectedPelanggan.id_kelas);
      setNamaKelas(selectedPelanggan.pilihan_kelas.nama);
    }

    
    // setNamaKelas((pelanggan.find((item:any) => item.id === newValue).pilihan_kelas.nama));
    // setIdKelas((pelanggan.find((item:any) => item.id === newValue).pilihan_kelas.id));
    // setTipeKendaraan((pelanggan.find((item:any) => item.id === newValue)));
  //   console.log(newValue);
  //   const response = await fetch(`/api/pelanggan/${parseInt(newValue as string,10)}`, {
  //       method: 'GET',
  //       body: null,
  //       headers: { "Content-Type": "application/json" }
  // })
  //   const data = await response.json();
  //   // setPelanggan(data?.data)
    // setIdKelas(data?.id_kelas)
    // setNamaKelas(data?.pilihan_kelas.nama)
    // setTipeKendaraan(data?.tipe_kendaraan)
    // console.log(data);
  }

  const handleSelectKendaraan = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    setIdKendaraan(newValue);
  }

  const handleSelectInstruktur = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    setIdInstruktur(newValue);
  }

  const handleDateChange = (date: Date|null) =>{
    setSelectedDate(date)
    setSelectedStartSesi('');
    setEndSesi('');
    setIdInstruktur('');
    setIdKendaraan('');
    setLoading2(true);
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
          setLoadingJamSesi(false)
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
    const id_pelanggan = formData.get("id_pelanggan")
    const id_instruktur = formData.get("id_instruktur")
    const id_kendaraan = formData.get("id_kendaraan") 
    console.log(id_kelas);
    console.log(new Date(`${tanggal}T$00:00:00`));
    console.log(new Date(`1970-01-01T${start_sesi}:00:00`));
    console.log(new Date(`1970-01-01T${end_sesi}:00:00`));
    const response = await fetch('/api/jadwal', {
      method:'POST',
      body: JSON.stringify({
          tanggal:tanggal,
          start_sesi:start_sesi,
          end_sesi: end_sesi,
          id_kelas: id_kelas,
          id_pelanggan: id_pelanggan,
          id_instruktur: id_instruktur,
          id_kendaraan: id_kendaraan,
      }),
      headers: { "Content-Type": "application/json" }
  })
  if (response.ok){
      const data= await response.json();
      console.log(data);
      router.push('/admin/manage-jadwal');
      showMessage("Jadwal created successfully!", "success");
  } else{
      const data= await response.json();
      console.error(data);
      showMessage(data?.message || 'An error occurred during submission.', "error");
  }
  };

  return (
      <div style={{width:'max-content'}}>
        <h1>Create Jadwal</h1>
        <form onSubmit={handleSubmit} >
            <DropdownInputInstruktur Dropdownlabel='Nama Pelanggan' Dropdownname='id_pelanggan' DropdownValue={id_pelanggan} TextLabel="" TextName="idpelanggan" TextValue={id_pelanggan} Loading = {loading} Options={optionsPelanggan} onSelect={handleSelectPelanggan}></DropdownInputInstruktur>
            <TextField2 type="text" label="Nama Kelas" name="nama_kelas" loading={true} value={nama_kelas} onChange={handleKelasChange}></TextField2>
            <TextField2 type="hidden" label="" name="id_kelas" loading={true} value={id_kelas} onChange={handleKelasChange}></TextField2>
            <TextField2 type="text" label="Tipe Kendaraan" name="tipe_kendaraan" loading={true} value={tipe_kendaraan} onChange={handleKelasChange}></TextField2>
            {/* <DropdownInputKendaraan Dropdownlabel="Nama Kelas" Dropdownname="id_kelas" DropdownValue = {nama_kelas} TextLabel="Id Kelas" TextName="idkelas" TextValue={id_kelas} Loading = {loading} Options={optionsKelas} onSelect={handleSelectKelas} ></DropdownInputKendaraan> */}
            <DatePickerInput label='Tanggal' name='tanggal_' selectedDate={selectedDate} loading = {loadingTanggal} onDateChange={handleDateChange}/>
            <TextField2 type="hidden" label="" name="tanggal" loading={true} value={tanggal} onChange={handleTanggalChange}></TextField2>
            <Dropdown label='Start Sesi' name='start_sesi' options={optionsStartSesi} value={selectedStartSesi} loading={loadingJamSesi} onSelect={handleSelectStartSesi}></Dropdown>
            <TextField2 type="number"label="End Sesi" name="end_sesi" loading={true} value={end_sesi} onChange={handleEndSesiChange}></TextField2>
            <DropdownInputKendaraan Dropdownlabel='Nama Kendaraan' Dropdownname='id_kendaraan' DropdownValue={id_kendaraan} TextLabel="" TextName="idkendaraan" TextValue={id_kendaraan} Loading = {loading2} Options={optionKendaraan} onSelect={handleSelectKendaraan}></DropdownInputKendaraan>
            <DropdownInputInstruktur Dropdownlabel='Nama Instruktur' Dropdownname='id_instruktur' DropdownValue={id_instruktur} TextLabel="" TextName="idinstruktur" TextValue={id_instruktur} Loading = {loading2} Options={optionInstruktur} onSelect={handleSelectInstruktur}></DropdownInputInstruktur>
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