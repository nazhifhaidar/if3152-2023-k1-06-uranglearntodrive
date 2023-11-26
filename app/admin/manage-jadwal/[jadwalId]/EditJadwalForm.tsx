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

interface EditJadwalFormProps {
    // Define your parameter types here
    id: string;
  }

const EditJadwalForm:React.FC<EditJadwalFormProps> = (params) => {
  const router = useRouter();
  // const [optionsKelas, setOptionsKelas] = useState<Record<string, any>[]>([]);
  // const [id_kelas, setIdKelas] = useState<string>('');
  // const [nama_kelas, setNamaKelas] = useState<string>('');
  // const [tanggal, setTanggal] = useState<string>('');
  // const [selectedDate, setSelectedDate] = useState<Date|null>();
  // const [end_sesi, setEndSesi] = useState<string>('');
  // const optionsStartSesi = [10, 13, 15]; 
  // const [selectedStartSesi, setSelectedStartSesi] = useState<string>('');
  // const [loading,setLoading] = useState(true);
  // const [jadwal, setJadwal] = useState<Record<string, any>>([]);
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
  const [loading2, setLoading2] = useState(true);
  const [tipe_kendaraan, setTipeKendaraan] = useState<string>('');
  const [listJadwal, setListJadwal] = useState<Record<string, any>[]>([]); 
  const [jadwal, setJadwal] = useState<Record<string, any>>([]);
  const [loadingJamSesi, setLoadingJamSesi] = useState(true);
  const [loadingTanggal, setLoadingTanggal] = useState(true);
  const {showMessage} = useMessageContext();
  
  useEffect(() => {
    const fetchOptions = async () => {
        try {

          const fetchedJadwal = await fetch(`/api/jadwal`,
                {
                    method: 'GET',
                    body: null,
                    headers: { "Content-Type": "application/json" }
                }
            );
            const dataJadwal = await fetchedJadwal.json();
            setListJadwal(dataJadwal?.data)
            

            const response = await fetch(`/api/jadwal/${params.id}`,
            {
                method: 'GET',
                body: null,
                headers: { "Content-Type": "application/json" }
            }
            );
            const data = await response.json();
            if(data){
              setJadwal(data.data);
              setIdKelas(data.data.id_kelas);
              setNamaKelas(data.data.kelas.nama);
              setTipeKendaraan(data.data.kendaraan.tipe_kendaraan);
              setIdPelanggan(data.data.id_pelanggan);
              setNamaPelanggan(data.data.pelanggan.nama_lengkap);
              setIdKendaraan(data.data.id_kendaraan);
              setIdInstruktur(data.data.id_instruktur);
              const tanggal = data.data.tanggal.toString().split("T")[0];
              setTanggal(tanggal);
              setSelectedDate(new Date(`${tanggal}T07:00:00`));
              console.log(data.data.pelanggan);
              setOptionsPelanggan((data.data.pelanggan));
              // setOptionInstruktur((data.data.instruktur));
              // setOptionKendaraan((data.data.kendaraan));
              setSelectedStartSesi(data.data.start_sesi.toString().split("T")[1].split(".")[0].split(":")[0]);
              setEndSesi(data.data.end_sesi.toString().split("T")[1].split(".")[0].split(":")[0]);
            }
          
          const fetchedKendaraan = await fetch(`/api/kendaraan`,
          {
              method: 'GET',
              body: null,
              headers: { "Content-Type": "application/json" }
          });
          const dataKendaraan = await fetchedKendaraan.json();
          setKendaraan(dataKendaraan?.data);

          // setOptionKendaraan(kendaraan.filter((item) => item.id === jadwal.id_kendaraan));

          const fetchedInstruktur = await fetch(`/api/instruktur`,
          {
              method: 'GET',
              body: null,
              headers: { "Content-Type": "application/json" }
          });
          const dataInstruktur = await fetchedInstruktur.json();  
          setInstruktur(dataInstruktur?.data);
          if(dataJadwal){
            const areTimesEqual = (timeA:Date, timeB:string) => {
              return (
                (timeA.getHours() - 7).toString() === timeB
              );
            };
            const reserved = dataJadwal.data.filter((item:Record<string,any>) => new Date(`${item.tanggal}`).getTime() === new Date(`${data.data.tanggal}`).getTime() && areTimesEqual(new Date(`${item.start_sesi}`), data.data.start_sesi) && item.id !== data.data.id);
            if (reserved.length !== 0){
              const checkedIdPelanggan = reserved.find((item:Record<string,any>) => item.pelanggan.id.toString() === data.data.id_pelanggan.toString());
              // console.log(`Check Kelas ${checkIdKelas}`)
              // console.log(reserved);
              if(!checkedIdPelanggan){
                setOptionInstruktur(dataInstruktur.data.filter((item:Record<string,any>) => reserved.some((reserved:Record<string,any>) => !item.nama_lengkap.includes(reserved.instruktur.nama_lengkap))));
                setOptionKendaraan(dataKendaraan.data.filter((item:Record<string,any>) => reserved.some((reserved:Record<string,any>) => !item.nama.includes(reserved.kendaraan.nama)) && item.tipe_kendaraan === data.data.kendaraan.tipe_kendaraan));
              }
              else{
                setOptionKendaraan([])
                setOptionInstruktur([])
              }
            }
            else{
              setOptionInstruktur(dataInstruktur.data);
              setOptionKendaraan(dataKendaraan.data.filter((item:Record<string,any>) => item.tipe_kendaraan.toString() === data.data.kendaraan.tipe_kendaraan.toString()));
            }
          }
          // setOptionInstruktur(instruktur.filter((item) => item.id === jadwal.id_instruktur));
            setLoading(false);
            setLoading2(false);
            setLoadingJamSesi(false);
            setLoadingTanggal(false);
            } catch (error) {
                console.error('Error fetching options:', error);
                showMessage(`Error fetching data: ${error}`, "error");
                setLoading(false);
                setLoading2(false);
                setLoadingJamSesi(false);
                setLoadingTanggal(false);
            }
        };
        fetchOptions();
    },[params.id]);

//   const [nama_lengkap, setNamaLengkap] = useState<string>('');
//   const [nik, setNIK] = useState<string>('');
//   const [alamat, setAlamat] = useState<string>('');
//   const [no_telp, setNoTelp] = useState<string>('');
//   const [loading,setLoading] = useState(false)

  // const handleEndSesiChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setEndSesi(event.target.value);
  // };

  // const handleTanggalChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTanggal(event.target.value);
  // };

  // const handleSelectStartSesi = (event: ChangeEvent<HTMLSelectElement>) =>{
  //   const newValue = event.target.value;
  //   const end_sesi = parseInt(newValue,10) + 2;
  //   setSelectedStartSesi(newValue);
  //   setEndSesi(end_sesi.toString());
  // }

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
    setNamaKelas(jadwal.kelas.nama);
    setIdInstruktur('');
    setIdKendaraan('');
    const endsesi = parseInt(newValue,10) + 2;
    setEndSesi(endsesi.toString());
    const areTimesEqual = (timeA:Date, timeB:string) => {
      return (
        (timeA.getHours() - 7).toString() === timeB
      );
    };
    if(listJadwal){
      const reserved = listJadwal.filter((item) => new Date(`${item.tanggal}`).getTime() === new Date(`${tanggal}`).getTime() && areTimesEqual(new Date(`${item.start_sesi}`), newValue) && item.id.toString() !== jadwal.id.toString())
      console.log(reserved);
      if (reserved.length !== 0){
        const checkIdPelanggan = reserved.find((item) => item.pelanggan.id.toString() === id_pelanggan.toString());
        console.log(`Check Pelanggan ${checkIdPelanggan}`)
        console.log(id_pelanggan)
        // console.log(reserved);
        if(!checkIdPelanggan){
          const filteredOptionInstruktur = instruktur.filter(item => reserved.some(reserved => !item.nama_lengkap.includes(reserved.instruktur.nama_lengkap)));
          const filteredOptionKendaraan = kendaraan.filter(item => reserved.some(reserved => !item.nama.includes(reserved.kendaraan.nama)) && item.tipe_kendaraan === tipe_kendaraan);
          setOptionInstruktur(filteredOptionInstruktur);
          setOptionKendaraan(filteredOptionKendaraan);
          if(filteredOptionInstruktur.length === 0 && filteredOptionKendaraan.length === 0){
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
        const filteredOptionKendaraan = kendaraan.filter(item => item.tipe_kendaraan === tipe_kendaraan) 
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
    }
    setLoading2(false);
    // const selectedPelanggan = optionsPelanggan.find((item) => item.id == newValue);
  }

  const handleSelectKelas = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    setIdKelas(newValue);
    setNamaKelas(newValue);
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
          setLoadingJamSesi(false);
    }
  }

  const handleSelectPelanggan = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    setIdPelanggan(newValue);
    setNamaPelanggan(newValue);
    setLoadingTanggal(false);
    // setSelectedDate(null);
    // setTanggal('');
    // setSelectedStartSesi('')
    // setEndSesi('')
    // setIdInstruktur('')
    // setIdKendaraan('')
    const selectedPelanggan = optionsPelanggan.find((item) => item.id == newValue);
    if(selectedPelanggan){
      setTipeKendaraan(selectedPelanggan.tipe_kendaraan);
      setIdKelas(selectedPelanggan.id_kelas);
      setNamaKelas(selectedPelanggan.pilihan_kelas.nama);
    }
  }

  const handleSelectKendaraan = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    setIdKendaraan(newValue);
  }

  const handleSelectInstruktur = (event: ChangeEvent<HTMLSelectElement>) =>{
    const newValue = event.target.value;
    setIdInstruktur(newValue);
  }

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
    setLoading(true)
    const response = await fetch(`/api/jadwal/${params.id}`, {
      method:'PUT',
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
      showMessage("Jadwal updated successfully!", "success");
      router.push('/admin/manage-jadwal');
  } else{
      const data= await response.json();
      console.error(data);
      showMessage(data?.message || 'An error occurred during submission.', "error");
  }
  };

  return (
      <div style={{width:'max-content'}}>
        <h1>Edit Jadwal</h1>
        <form onSubmit={handleSubmit} >
            <TextField2 type="text" label="Nama Pelanggan" name="nama_pelanggan" loading={true} value={nama_pelanggan} onChange={handleKelasChange}></TextField2>
            <TextField2 type="hidden" label="" name="id_pelanggan" loading={true} value={id_pelanggan} onChange={handleKelasChange}></TextField2>
            <TextField2 type="text" label="Nama Kelas" name="nama_kelas" loading={true} value={nama_kelas} onChange={handleKelasChange}></TextField2>
            <TextField2 type="hidden" label="" name="id_kelas" loading={true} value={id_kelas} onChange={handleKelasChange}></TextField2>
            <TextField2 type="text" label="Tipe Kendaraan" name="tipe_kendaraan" loading={true} value={tipe_kendaraan} onChange={handleKelasChange}></TextField2>
            <DatePickerInput label='Tanggal' name='tanggal_' selectedDate={selectedDate} onDateChange={handleDateChange} loading = {loadingTanggal}/>
            <TextField2 type="hidden" label="" name="tanggal" loading={true} value={tanggal} onChange={handleTanggalChange}></TextField2>
            <Dropdown label='Start Sesi' name='start_sesi' options={optionsStartSesi} value={selectedStartSesi} loading={loadingJamSesi} onSelect={handleSelectStartSesi}></Dropdown>
            <TextField2 type="number"label="End Sesi" name="end_sesi" loading={true} value={end_sesi} onChange={handleEndSesiChange}></TextField2>
            <DropdownInputKendaraan Dropdownlabel='Nama Kendaraan' Dropdownname='id_kendaraan' DropdownValue={id_kendaraan} TextLabel="" TextName="idkendaraan" TextValue={id_kendaraan} Loading = {loading2} Options={optionKendaraan} onSelect={handleSelectKendaraan}></DropdownInputKendaraan>
            <DropdownInputInstruktur Dropdownlabel='Nama Instruktur' Dropdownname='id_instruktur' DropdownValue={id_instruktur} TextLabel="" TextName="idinstruktur" TextValue={id_instruktur} Loading = {loading2} Options={optionInstruktur} onSelect={handleSelectInstruktur}></DropdownInputInstruktur>
            <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', flexDirection:'row' }}>
              <Button1 id="submit-button" text="Save Jadwal" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
              <Link href={"/admin/manage-jadwal"}>
                <Button1 id="cancel_button" text="Cancel" textColor="black" bgColor="white" type='button' style={{margin:'8px'}}/>
              </Link>
            </div>
        </form>
      </div>
  )
}

export default EditJadwalForm