'use client'

import React, { useEffect, useState } from 'react';
import InformationCard from '@/app/components/Cards/InformationCard';
import Button2 from '@/app/components/Buttons/Button2';
import DateTimePicker from '@/app/components/DateTimePicker';
import ConfirmationPopUp from '@/app/components/pop-ups/ConfirmationPopUp';
import { useRouter } from "next/navigation";


const KendaraanList:React.FC = () => {
    const router = useRouter();
    const [kendaraans, setKendaraans] = useState<Record<string, any>[]>([]);
    const [selectedKendaraan, setSelectedKendaraan] = useState<Record<string, any>>([]);
    const [selectedKendaraanId, setSelectedKendaraanId] = useState<number | null>(null);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/kendaraan/`,
                {
                    method: 'GET',
                    body: null,
                    headers: { "Content-Type": "application/json" }
                }
            );
            const data = await response.json();
            setKendaraans(data?.data)

            // Assuming data is an array of objects
          } catch (error) {
            console.log('Error fetching data:', error);
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      },[]);

      const handleDeleteClick = (kendaraanId: number) => {
        setSelectedKendaraanId(kendaraanId);
        setConfirmationOpen(true);
      };

      const handleEditClick = (kendaraan: Record<string,any>) => {
        setSelectedKendaraan(kendaraan);
        setSelectedKendaraanId(kendaraan.id);
        router.push(`/admin/manage-status/${kendaraan.id}`);
      };
    
      const handleConfirmDelete = () => {
        if (selectedKendaraanId !== null) {
          // Call your delete function here
          handleDelete(selectedKendaraanId);
          setConfirmationOpen(false);
          setSelectedKendaraanId(null);
        }
      };
    
      const handleCancelDelete = () => {
        setConfirmationOpen(false);
        setSelectedKendaraanId(null);
      };

      const handleDelete = async (kendaraanId: number) => {
        try {
          const response = await fetch(`/api/kendaraan/${kendaraanId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
          });
    
          if (response.ok) {
            // If the deletion is successful, update the state to reflect the changes
            setKendaraans((prevKendaraans) => prevKendaraans.filter((kendaraan) => kendaraan.id !== kendaraanId));
          } else {
            // Handle error response
            console.error('Error deleting kendaraan:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting kendaraan:', error);
        }
      };
      
      return (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <h1>Kendaraan List</h1>
            {kendaraans.map((kendaraan)=> (
                <div key={kendaraan.id}>
                    <InformationCard
                    key={kendaraan.id}
                    data={
                        <div>
                            <p>ID Kendaraan: {kendaraan.id}</p>
                            <p>Nama: {kendaraan.nama}</p>
                            <p>Status: {kendaraan.status_kendaraan}</p>
                            <p>Tipe: {kendaraan.tipe_kendaraan}</p>
                            <DateTimePicker
                              initialDateTime={kendaraan.tanggal_servis}
                              onDateTimeChange={(newDateTime) => {
                              console.log(newDateTime);
                        }}
                     />
                   </div>
                    }
                    buttons={
                        <div style={{flexDirection : 'column' , display: 'flex'}}>
                            <Button2 text='Delete' onClick={() => handleDeleteClick(kendaraan.id)}></Button2>
                            <Button2 text='Edit' onClick={() => handleEditClick(kendaraan)}></Button2>
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

export default KendaraanList;