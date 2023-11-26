'use client'

import React, { useEffect, useState } from 'react';
import InformationCard from '@/app/components/Cards/InformationCard';
import Button2 from '@/app/components/Buttons/Button2';
import DateTimePicker from '@/app/components/DateTimePicker';
import ConfirmationPopUp from '@/app/components/pop-ups/ConfirmationPopUp';
import { useRouter } from "next/navigation";
import DeleteButton from '@/app/components/Buttons/DeleteButton';
import EditButton from '@/app/components/Buttons/EditButton';
import OurLoader from '@/app/components/Loader/OurLoader';


const PelangganList:React.FC = () => {
    const router = useRouter();
    const [pelanggans, setPelanggans] = useState<Record<string, any>[]>([]);
    const [selectedPelanggan, setSelectedPelanggan] = useState<Record<string, any>>([]);
    const [selectedPelangganId, setSelectedPelangganId] = useState<number | null>(null);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const [isLoading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await fetch(`/api/pelanggan/`,
                {
                    method: 'GET',
                    body: null,
                    headers: { "Content-Type": "application/json" }
                }
            );
            const data = await response.json();
            setPelanggans(data?.data)

            // Assuming data is an array of objects
          } catch (error) {
            console.log('Error fetching data:', error);
            console.error('Error fetching data:', error);
          }finally{
            setLoading(false);
          }
        };
    
        fetchData();
      },[]);

      const handleDeleteClick = (pelangganId: number) => {
        setSelectedPelangganId(pelangganId);
        setConfirmationOpen(true);
      };

      const handleEditClick = (pelanggan: Record<string,any>) => {
        setSelectedPelanggan(pelanggan);
        setSelectedPelangganId(pelanggan.id);
        router.push(`/admin/manage-pelanggan/${pelanggan.id}`);
      };
    
      const handleConfirmDelete = () => {
        if (selectedPelangganId !== null) {
          // Call your delete function here
          handleDelete(selectedPelangganId);
          setConfirmationOpen(false);
          setSelectedPelangganId(null);
        }
      };
    
      const handleCancelDelete = () => {
        setConfirmationOpen(false);
        setSelectedPelangganId(null);
      };

      const handleDelete = async (pelangganId: number) => {
        try {
          const response = await fetch(`/api/pelanggan/${pelangganId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
          });
    
          if (response.ok) {
            // If the deletion is successful, update the state to reflect the changes
            setPelanggans((prevPelanggans) => prevPelanggans.filter((pelanggan) => pelanggan.id !== pelangganId));
          } else {
            // Handle error response
            console.error('Error deleting pelanggan:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting pelanggan:', error);
        }
      };
      
      return (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <h1>Pelanggan List</h1>
            <OurLoader state={isLoading}/>
            {pelanggans && (pelanggans.map((pelanggan)=> (
                <div key={pelanggan.id} className='mb-2'>
                    <InformationCard
                    key={pelanggan.id}
                    data={
                        <div>
                            <p>ID Pelanggan: {pelanggan.id}</p>
                            <p>Nama: {pelanggan.nama_lengkap}</p>
                            <p>ID Kelas: {pelanggan.id_kelas}</p>
                            <p>Umur: {pelanggan.umur}</p>
                            <p>Nomor Telepon: {pelanggan.no_telp}</p>
                            <p>Alamat: {pelanggan.alamat}</p>
                            <p>Status: {pelanggan.status}</p>
                   </div>
                    }
                    buttons={
                        <div style={{flexDirection : 'column' , display: 'flex'}}>
                            <EditButton onClick={() => handleEditClick(pelanggan)}></EditButton>
                        </div>
                    }
                    />

                </div>
                
                        
            )))}
            <ConfirmationPopUp
                isOpen={isConfirmationOpen}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
      );
};

export default PelangganList;