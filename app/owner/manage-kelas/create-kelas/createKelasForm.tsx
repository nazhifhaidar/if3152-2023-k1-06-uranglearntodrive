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
import Dropdown2 from "@/app/components/Dropdown/Dropdown";
import DropdownInputKendaraan from "@/app/components/Dropdown/DropdownInputKendaraan";
import DropdownInputInstruktur from "@/app/components/Dropdown/DropdownInputInstruktur";

const url = process.env.NEXTAUTH_URL;

const CreateKelasForm:React.FC = () => {
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
    const [loading,setLoading] = useState(true);

      useEffect(() => {
        const fetchOptions = async () => {
            try {
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
            } catch (error) {
                console.error('Error fetching options:', error);
                setLoading(false);
            }
        };
        fetchOptions();
      }, []);
    // const [confirmPassword, setConfirmPassword] = useState<string>('');
    // const [showPassword, setShowPassword] = useState(false);
    // const [isShowConfirmPassowrd, setShowConfirmPassword] = useState(false);

    const handleNamaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNama(event.target.value);
    };

    const handleHargaChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHarga(event.target.value);
    }; 

    const handleTotalJamChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTotalJam(event.target.value);
    }

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

        //cek apakah passwordnya sama
        const response = await fetch('/api/kelas', {
            method:'POST',
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
    return (
        <div style={{width:'max-content'}}>
            <h1>Create Kelas</h1>
            <form onSubmit={handleSubmit} >
                <TextField2 label="Nama" name='nama' value={nama} type="text" onChange={handleNamaChange} loading={loading}/>
                <TextField2 label="Harga" name='harga' value={harga} type="text" onChange={handleHargaChange} loading={loading}/>
                <TextField2 label="Total Jam" name='total_jam' value={total_jam} type="text" onChange={handleTotalJamChange} loading={loading}/>
                <TextField2 label="Jumlah Sesi" name='jumlah_sesi' value={jumlah_sesi} type="text" onChange={handleJumlahSesiChange} loading={loading}/>
                {/* <Dropdown2 apiLink="/api/getIdKendaraan/" label="Id Kendaraan" name='id_kendaraan'></Dropdown2> */}
                <DropdownInputKendaraan Dropdownlabel="Nama Kendaraan" Dropdownname="id_kendaraan" DropdownValue = {nama_kendaraan} TextLabel="Id Kendaraan" TextName="idkendaraan" TextValue={id_kendaraan} Loading = {loading} Options={optionsKendaraan} onSelect={handleSelectKendaraan} ></DropdownInputKendaraan>
                <DropdownInputInstruktur Dropdownlabel="Nama Instruktur" Dropdownname="id_instruktur" DropdownValue={nama_instruktur} TextLabel="Id Instruktur" TextName="idinstruktur" TextValue={id_instruktur} Loading = {loading} Options={optionsInstruktur} onSelect={handleSelectInstruktur}></DropdownInputInstruktur>
                {/* <Dropdown2 apiLink="/api/getIdInstruktur/" label="Id Instruktur" name='id_instruktur'></Dropdown2> */}
                <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', flexDirection:'row' }}>
                    <Button1 id="submit-button" text="Create Kelas" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
                    <Link href={"/owner/manage-kelas"}>
                        <Button1 id="cancel_button" text="Cancel" textColor="black" bgColor="white" type='button' style={{margin:'8px'}}/>
                    </Link>
                </div>
            </form>
        </div>
       
  )
}

export default CreateKelasForm