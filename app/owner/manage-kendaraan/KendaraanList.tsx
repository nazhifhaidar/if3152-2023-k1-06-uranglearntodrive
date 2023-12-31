'use client'

import React, { useEffect, useState } from 'react';
import InformationCard from '@/app/components/Cards/InformationCard';
import Button2 from '@/app/components/Buttons/Button2';
import DateTimePicker from '@/app/components/DateTimePicker';
import ConfirmationPopUp from '@/app/components/pop-ups/ConfirmationPopUp';
import { useRouter } from "next/navigation";
import { useMessageContext } from '@/app/components/Providers/MessageProvider';
import EditButton from '@/app/components/Buttons/EditButton';
import DeleteButton from '@/app/components/Buttons/DeleteButton';
import OurLoader from '@/app/components/Loader/OurLoader';


const KendaraanList: React.FC = () => {
  const router = useRouter();
  const [kendaraans, setKendaraans] = useState<Record<string, any>[]>([]);
  const [selectedKendaraan, setSelectedKendaraan] = useState<Record<string, any>>([]);
  const [selectedKendaraanId, setSelectedKendaraanId] = useState<number | null>(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { showMessage } = useMessageContext();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        showMessage(`Error fetching data: ${error as string}`, "error");
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (kendaraanId: number) => {
    setSelectedKendaraanId(kendaraanId);
    setConfirmationOpen(true);
  };

  const handleEditClick = (kendaraan: Record<string, any>) => {
    setSelectedKendaraan(kendaraan);
    setSelectedKendaraanId(kendaraan.id);
    router.push(`/owner/manage-kendaraan/${kendaraan.id}`);
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

      const result = await response.json();

      if (response.ok) {
        // If the deletion is successful, update the state to reflect the changes
        setKendaraans((prevKendaraans) => prevKendaraans.filter((kendaraan) => kendaraan.id !== kendaraanId));
        showMessage(result.message as string, "success");
      } else {
        // Handle error response
        console.error('Error deleting kendaraan:', result.message);
        showMessage(result.message as string, "error");
      }
    } catch (error) {
      showMessage(error as string, "error");
      console.error('Error deleting kendaraan:', error);
    }
  };

  return (
    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <h1>Kendaraan List</h1>
      <OurLoader state={isLoading} />
      {kendaraans && (kendaraans.map((kendaraan) => (
        <div key={kendaraan.id} className='mb-3'>
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
              <div style={{ flexDirection: 'column', display: 'flex' }}>
                <DeleteButton onClick={() => handleDeleteClick(kendaraan.id)}></DeleteButton>
                <EditButton onClick={() => handleEditClick(kendaraan)}></EditButton>
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

export default KendaraanList;