"use client";

// "app/owner/manage-admin/create"

import Button1 from "@/app/components/Buttons/Button1";
import Dropdown2 from "@/app/components/Dropdown/Dropdown";
import PasswordField from "@/app/components/TextField/PasswordField";
import TextField1 from "@/app/components/TextField/TextField1";
import TextField2 from "@/app/components/TextField/TextField2";
// import TextField3 from "@/app/components/TextField/TextField3";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import React, { useEffect } from "react";
import Dropdown from "@/app/components/Dropdown/Dropdown";
import { useMessageContext } from '@/app/components/Providers/MessageProvider';
// import DropdownIDKelas from "@/app/components/Dropdown/DropdownIDKelas";

const url = process.env.NEXTAUTH_URL;

interface EditPelangganFormProps {
  // Define your parameter types here
  id: string;
}

const EditPelangganForm: React.FC<EditPelangganFormProps> = (params) => {
  const router = useRouter();
  // const [nama, setNama] = useState<string>('');
  // const [tipe_kendaraan, setTipe] = useState<string>('');
  // const [tanggal_servis, setTanggal] = useState<string>('');
  // const [status_kendaraan, setStatus] = useState<string>('');

  const statusOptions = ["Calon", "Lulus", "Siswa"];
  const {showMessage} = useMessageContext();
  const [nama_lengkap, setNama] = useState<string>("");
  const [pilihanKelas, setPilihanKelas] = useState<string>("");
  const [id_kelas, setIDKelas] = useState<string>("");
  const [umur, setUmur] = useState<string>("");
  const [no_telp, setNomor] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [nama_kelas, setNamaKelas] = useState<string>("");
  const [pelanggans, setPelanggans] = useState<Record<string, any>>([]);
  const [optionsKelas, setOptionsKelas] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/pelanggan/${params.id}`, {
          method: "GET",
          body: null,
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if(data){
          setPelanggans(data?.data);
          setNama(data?.data.nama_lengkap);
          setIDKelas(data?.data.id_kelas);
          setPilihanKelas(data?.data.pilihan_kelas.nama);
          setAlamat(data?.data.alamat);
          setUmur(data?.data.umur);
          setNomor(data?.data.no_telp);
          setStatus(data?.data.status);
          setLoading(false);
        }
        

        // const fetchedOptionsKelas = await fetch(`/api/getIdKelas/`, {
        //   method: "GET",
        //   body: null,
        //   headers: { "Content-Type": "application/json" },
        // });
        // const dataKelas = await fetchedOptionsKelas.json();
        // setDataIdNama(data?.data);
        // setOptionsKelas(dataKelas?.data);

        // Assuming data is an array of objects
      } catch (error) {
        console.log("Error fetching data:", error);
        console.error("Error fetching data:", error);
        setLoading(false);
        //console.log("Error params:", params.id);
      }
    };
    fetchData();
    // setNama(pelanggans.nama_lengkap);
    // setIDKelas(pelanggans.id_kelas);
    // setAlamat(pelanggans.alamat);
    // setUmur(pelanggans.umur);
    // setNomor(pelanggans.no_telp);
    // setStatus(pelanggans.status);
  }, [
    params.id,
  ]);

  const handleIDKelasChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setIDKelas(newValue);
    setNamaKelas(newValue);
  };

  const handleNomorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNomor(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
    console.log(event.target.value);
  };
  const handleNamaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNomor(event.target.value);
  };
  const handleUsiaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNomor(event.target.value);
  };
  // const handleAlamatChange= (event: ChangeEvent<HTMLInputElement>) => {
  //     setNomor(event.target.value);

  // const handleTanggalChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     setTanggal(event.target.value);
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a data object to send in the POST request
    // const formData = new FormData(event.currentTarget);
    // const nama_lengkap = formData.get("nama_lengkap")
    // const nik = formData.get("nik")
    // const alamat = formData.get("alamat")
    // const no_telp = formData.get("no_telp")

    const response = await fetch(`/api/pelanggan/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        nama_lengkap: nama_lengkap,
        id_kelas: id_kelas,
        umur: umur,
        no_telp: no_telp,
        alamat: alamat,
        status: status,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      router.push("/admin/manage-pelanggan");
      showMessage("Status Kendaraan updated successfully!", "success");
    } else {
      const data = await response.json();
      console.error(data);
      showMessage(data?.message || 'An error occurred during submission.', "error");
    }
  };

  return (
    <div style={{ width: "max-content" }}>
      <h1>Edit Pelanggan</h1>
      <form onSubmit={handleSubmit}>
        <TextField2
          label="Nama Pelanggan"
          name="nama"
          value={loading ? "Loading..." : nama_lengkap}
          type="text"
          onChange={handleNamaChange}
          loading={disable}
        />
        <TextField2
          label="Usia"
          name="umur"
          value={loading ? "Loading..." : umur}
          type="text"
          onChange={() => {}}
          loading={disable}
        />
        <TextField2
          label="Alamat"
          name="alamat"
          value={loading ? "Loading...." : alamat}
          type="text"
          onChange={() => {}}
          loading={disable}
        />
        <TextField2
          label="Nomor Telepon"
          name="nomor"
          value={loading ? "Loading..." : no_telp}
          type="text"
          onChange={handleNomorChange}
          loading={loading}
        />

        <TextField2
          label="Pilihan Kelas"
          name="nama_kelas"
          value={loading ? "Loading..." : pilihanKelas}
          type="text"
          onChange={() => {}}
          loading={disable}
        />

        <TextField2
          label=""
          name="kelas"
          value={loading ? "Loading..." : id_kelas}
          type="hidden"
          onChange={() => {}}
          loading={disable}
        />

        <div>
          <label htmlFor="status">Status</label>
          <div
            className="select-container"
            style={{
              width: "450px",
              paddingLeft: "4px",
              position: "relative",
              border: "2px solid #ccc",
            }}
          >
            <select
              id="status"
              value={status}
              onChange={handleStatusChange}
              style={{
                width: "100%",
                border: "none",
                backgroundPosition: "calc(100% - 20px) center",
              }}
            >
              <option value="" disabled>
                Select Status
              </option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            ></div>
          </div>
        </div>

        <div
          style={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Button1
            id="submit-button"
            text="Update Pelanggan"
            textColor="black"
            bgColor="yellow"
            type="submit"
            style={{ margin: "8px" }}
          />
          <Link href={"/admin/manage-pelanggan"}>
            <Button1
              id="cancel_button"
              text="Cancel"
              textColor="black"
              bgColor="white"
              type="button"
              style={{ margin: "8px" }}
            />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditPelangganForm;
