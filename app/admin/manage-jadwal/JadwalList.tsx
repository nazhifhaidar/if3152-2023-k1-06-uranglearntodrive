'use client'

import React, { useEffect, useState } from 'react';
import InformationCard from '@/app/components/Cards/InformationCard';
import Button2 from '@/app/components/Buttons/Button2';
import ConfirmationPopUp from '@/app/components/pop-ups/ConfirmationPopUp';
import { useRouter } from "next/navigation";

const JadwalList:React.FC = () => {
    const router = useRouter();
    const [jadwal, setjadwal] = useState<Record<string, any>[]>([]);
    const [selectedjadwalId, setSelectedjadwalId] = useState<number | null>(null);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/jadwal`,
                {
                    method: 'GET',
                    body: null,
                    headers: { "Content-Type": "application/json" }
                }
            );
            const data = await response.json();
            setjadwal(data?.data)

            // Assuming data is an array of objects
          } catch (error) {
            console.log('Error fetching data:', error);
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      },[]);

      const handleDeleteClick = (jadwalId: number) => {
        setSelectedjadwalId(jadwalId);
        setConfirmationOpen(true);
      };

      const handleEditClick = (jadwalId: number) => {
        setSelectedjadwalId(jadwalId);
        router.push(`/admin/manage-jadwal/${jadwalId}`);
      };
    
      const handleConfirmDelete = () => {
        if (selectedjadwalId !== null) {
          // Call your delete function here
          handleDelete(selectedjadwalId);
          setConfirmationOpen(false);
          setSelectedjadwalId(null);
        }
      };
    
      const handleCancelDelete = () => {
        setConfirmationOpen(false);
        setSelectedjadwalId(null);
      };

      const handleDelete = async (jadwalId: number) => {
        try {
          const response = await fetch(`/api/jadwal/${jadwalId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
          });
    
          if (response.ok) {
            // If the deletion is successful, update the state to reflect the changes
            setjadwal((prevjadwal) => prevjadwal.filter((jadwal) => jadwal.id !== jadwalId));
          } else {
            // Handle error response
            console.error('Error deleting jadwal:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting jadwal:', error);
        }
      };
      
      return (
        <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight:'12px'}}>
            {jadwal && jadwal.map((jadwal)=> (
                <div key={jadwal.id}>
                    <InformationCard
                    margin='mb-4'
                    key={jadwal.id}
                    data={
                        <div>
                            <p>ID: {jadwal.id}</p>
                            <p>Nama Kelas: {jadwal.kelas.nama}</p>
                            <p>Nama Pelanggan: {jadwal.pelanggan.nama_lengkap}</p>
                            <p>Nama Kendaraan: {jadwal.kendaraan.nama}</p>
                            <p>Nama Instruktur: {jadwal.instruktur.nama_lengkap}</p>
                            <p>Tanggal: {new Date(jadwal.tanggal).toISOString().split("T")[0]}</p>
                            <p>Start Sesi: {new Date(jadwal.start_sesi).toISOString().split("T")[1].split(".")[0]}</p>
                            <p>End Sesi: {new Date(jadwal.end_sesi).toISOString().split("T")[1].split(".")[0]}</p>
                        </div>
                    }
                    buttons={
                        <div style={{flexDirection : 'column' , display: 'flex'}}>
                            <Button2 text='Delete' onClick={() => handleDeleteClick(jadwal.id)}></Button2>
                            <Button2 text='Edit' onClick={() => handleEditClick(jadwal.id)}></Button2>
                        </div>
                    }
                    />
                </div>       
            ))}
            <ConfirmationPopUp
                isOpen={isConfirmationOpen}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
      );
};

export default JadwalList;