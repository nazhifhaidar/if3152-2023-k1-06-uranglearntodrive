'use client'

import React, { useEffect, useState } from 'react';
import InformationCard from '@/app/components/Cards/InformationCard';
import Button2 from '@/app/components/Buttons/Button2';
import ConfirmationPopUp from '@/app/components/pop-ups/ConfirmationPopUp';
import { useRouter } from "next/navigation";
import DeleteButton from '@/app/components/Buttons/DeleteButton';
import { useMessageContext } from '@/app/components/Providers/MessageProvider';
import EditButton from '@/app/components/Buttons/EditButton';
import { ClipLoader } from 'react-spinners';
import OurLoader from '@/app/components/Loader/OurLoader';

const KelasList:React.FC = () => {
    const router = useRouter();
    const [kelas, setkelas] = useState<Record<string, any>[]>([]);
    const [selectedkelasId, setSelectedkelasId] = useState<number | null>(null);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const {showMessage} = useMessageContext();

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
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
           showMessage(`Error fetching data: ${error}`, "error");
            console.error('Error fetching data:', error);
          }finally{
            setLoading(false);
          }
        };
    
        fetchData();
      },[]);

      const handleDeleteClick = (kelasId: number) => {
        setSelectedkelasId(kelasId);
        setConfirmationOpen(true);
      };

      const handleEditClick = (kelasId: number) => {
        setSelectedkelasId(kelasId);
        router.push(`/owner/manage-kelas/${kelasId}`);
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
          
          const result = await response.json();

          if (response.ok) {
            // If the deletion is successful, update the state to reflect the changes
            showMessage(`${result.message}`, 'success')
            setkelas((prevkelas) => prevkelas.filter((kelas) => kelas.id !== kelasId));
            
          } else {
            // Handle error response
            showMessage(`Error deleting kelas: ${result.message}`, "error");
            console.error('Error deleting kelas:', result.message);
          }
        } catch (error) {
          showMessage(`Error deleting kelas: ${error}`, "error");
          console.error('Error deleting kelas:', error);
        }
      };
      
      return (
        <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight:'12px'}}>
          <OurLoader state={loading}/>
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
                            <p>Tipe Kendaraan: {kelas.tipe_kendaraan}</p>
                        </div>
                    }
                    buttons={
                        <div style={{flexDirection : 'column' , display: 'flex'}}>
                            <DeleteButton onClick={() => handleDeleteClick(kelas.id)}></DeleteButton>
                            <EditButton onClick={() => handleEditClick(kelas.id)}></EditButton>
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