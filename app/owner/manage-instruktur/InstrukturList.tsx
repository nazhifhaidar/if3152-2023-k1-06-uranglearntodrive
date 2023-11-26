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

const InstrukturList: React.FC = () => {
  const router = useRouter();
  const { showMessage } = useMessageContext();
  const [instrukturs, setInstrukturs] = useState<Record<string, any>[]>([]);
  const [selectedInstruktur, setSelectedInstruktur] = useState<Record<string, any>>([]);
  const [selectedInstrukturId, setSelectedInstrukturId] = useState<number | null>(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/instruktur/`,
          {
            method: 'GET',
            body: null,
            headers: { "Content-Type": "application/json" }
          }
        );
        const data = await response.json();
        setInstrukturs(data?.data)

        // Assuming data is an array of objects
      } catch (error) {
        showMessage(`Error fetching data: ${error}`, "error");
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (instrukturId: number) => {
    setSelectedInstrukturId(instrukturId);
    setConfirmationOpen(true);
  };

  const handleEditClick = (instruktur: Record<string, any>) => {
    setSelectedInstruktur(instruktur);
    setSelectedInstrukturId(instruktur.id);
    router.push(`/owner/manage-instruktur/${instruktur.id}`);
  };

  const handleConfirmDelete = () => {
    if (selectedInstrukturId !== null) {
      // Call your delete function here
      handleDelete(selectedInstrukturId);
      setConfirmationOpen(false);
      setSelectedInstrukturId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmationOpen(false);
    setSelectedInstrukturId(null);
  };

  const handleDelete = async (instrukturId: number) => {
    try {
      const response = await fetch(`/api/instruktur/${instrukturId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
      });

      const res = await response.json();

      if (response.ok) {
        // If the deletion is successful, update the state to reflect the changes
        const { data } = res;
        setInstrukturs((prevInstruktur) => prevInstruktur.filter((instruktur) => instruktur.id !== instrukturId));
        showMessage(`Instruktur ${data.nama_lengkap} berhasil dihapus`, "success");
      } else {
        // Handle error response
        const { message } = res;
        console.error('Error deleting instruktur:', message);
        showMessage(`Error deleting instruktur: ${message}`, "error");
      }
    } catch (error) {
      console.error('Error deleting instruktur:', error);
      showMessage(`Error deleting instruktur: ${error}`, "error");
    }
  };

  return (
    <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '12px' }}>
      {loading && (
        <div style={{ width: '300px', height: '300px' }}>
          <ClipLoader color="grey" loading={loading} size={200} />
        </div>
      )}
      {instrukturs.map((instruktur) => (
        <div key={instruktur.id}>
          <InformationCard
            margin='mb-4'
            key={instruktur.id}
            data={
              <div>
                <p>ID: {instruktur.id}</p>
                <p>Nama Lengkap: {instruktur.nama_lengkap}</p>
                <p>NIK: {instruktur.nik}</p>
                <p>Alamat: {instruktur.alamat}</p>
                <p>Nomor Telepon: {instruktur.no_telp}</p>
              </div>
            }
            buttons={
              <div style={{ flexDirection: 'column', display: 'flex' }}>
                <DeleteButton onClick={() => handleDeleteClick(instruktur.id)}></DeleteButton>
                <EditButton onClick={() => handleEditClick(instruktur)}></EditButton>
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

export default InstrukturList;