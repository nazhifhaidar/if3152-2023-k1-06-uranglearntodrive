'use client'

import React, { useEffect, useState } from 'react';
import InformationCard from '@/app/components/Cards/InformationCard';
import Button2 from '@/app/components/Buttons/Button2';
import ConfirmationPopUp from '@/app/components/pop-ups/ConfirmationPopUp';
import { useRouter } from "next/navigation";

const KelasList:React.FC = () => {
    const router = useRouter();
    const [kelas, setkelas] = useState<Record<string, any>[]>([]);
    const [selectedkelasId, setSelectedkelasId] = useState<number | null>(null);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/kelas/`,
                {
                    method: 'GET',
                    body: null,
                    headers: { "Content-Type": "application/json" }
                }
            );
            const data = await response.json();
            setkelas(data?.data)

            // Assuming data is an array of objects
          } catch (error) {
            console.log('Error fetching data:', error);
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      },[]);

      const handleDeleteClick = (kelasId: number) => {
        setSelectedkelasId(kelasId);
        setConfirmationOpen(true);
      };

      const handleEditClick = (kelas: Record<string,any>) => {
        setSelectedkelasId(kelas.id);
        router.push(`/owner/manage-kelas/${kelas.id}`);
      };
    
      const handleConfirmDelete = () => {
        if (selectedkelasId !== null) {
          // Call your delete function here
          handleDelete(selectedkelasId);
          setConfirmationOpen(false);
          setSelectedkelasId(null);
        }
      };
    
      const handleCancelDelete = () => {
        setConfirmationOpen(false);
        setSelectedkelasId(null);
      };

      const handleDelete = async (kelasId: number) => {
        try {
          const response = await fetch(`/api/kelas/${kelasId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
          });
    
          if (response.ok) {
            // If the deletion is successful, update the state to reflect the changes
            setkelas((prevkelas) => prevkelas.filter((kelas) => kelas.id !== kelasId));
          } else {
            // Handle error response
            console.error('Error deleting kelas:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting kelas:', error);
        }
      };
      
      return (
        <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight:'12px'}}>
            {kelas.map((kelas)=> (
                <div key={kelas.id}>
                    <InformationCard
                    margin='mb-4'
                    key={kelas.id}
                    data={
                        <div>
                            <p>ID: {kelas.id}</p>
                            <p>Nama Kelas: {kelas.nama}</p>
                            <p>Harga: {kelas.harga}</p>
                            <p>Total Jam: {kelas.total_jam}</p>
                            <p>Jumlah Sesi: {kelas.jumlah_sesi}</p>
                            <p>Nama Kendaraan: {kelas.kendaraan.nama}</p>
                            <p>Nama kelas: {kelas.instruktur.nama_lengkap}</p>
                        </div>
                    }
                    buttons={
                        <div style={{flexDirection : 'column' , display: 'flex'}}>
                            <Button2 text='Delete' onClick={() => handleDeleteClick(kelas.id)}></Button2>
                            <Button2 text='Edit' onClick={() => handleEditClick(kelas.id)}></Button2>
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

export default KelasList;