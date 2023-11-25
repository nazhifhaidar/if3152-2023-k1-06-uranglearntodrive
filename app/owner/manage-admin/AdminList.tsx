'use client'

import React, { useEffect, useState, useRef } from 'react';
import InformationCard from '@/app/components/Cards/InformationCard';
import ConfirmationPopUp from '@/app/components/pop-ups/ConfirmationPopUp';
import DeleteButton from '@/app/components/Buttons/DeleteButton';
import { useMessageContext } from '@/app/components/Providers/MessageProvider';

const AdminList: React.FC = () => {
  const [admins, setAdmins] = useState<Record<string, any>[]>([]);
  const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {showMessage} = useMessageContext();

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/admin/`,
        {
          method: 'GET',
          body: null,
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAdmins(data?.data)
      } else {
        showMessage(data?.message, "error");
        setAdmins([]);
      }


      // Assuming data is an array of objects
    } catch (error) {
      console.log('Error fetching data:', error);
      console.error('Error fetching data:', error);
      showMessage(`Error fetching admin: ${error}`, "error");
      setAdmins([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = (adminId: number) => {
    setSelectedAdminId(adminId);
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAdminId !== null) {
      // Call your delete function here
      handleDelete(selectedAdminId);
      setConfirmationOpen(false);
      setSelectedAdminId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmationOpen(false);
    setSelectedAdminId(null);
  };

  const handleDelete = async (adminId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/${adminId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
      });

      if (response.ok) {
        // If the deletion is successful, update the state to reflect the changes
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminId));
        showMessage(`Admin with ID: ${adminId} successfully deleted`, "success");
      } else {
        // Handle error response
        console.error('Error deleting admin:', response.statusText);
        showMessage(`Error deleting admin: ${response.statusText}`, "error");
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      showMessage(`Error deleting admin: ${error}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxHeight: '360px', overflowY: 'auto', paddingRight: '12px', width: '100%', maxWidth: '720px' }}>
      {admins && (admins.map((admin) => (
        <div key={admin.id}>
          <InformationCard
            margin='mb-4'
            key={admin.id}
            data={
              <div>
                <p>ID: {admin.id}</p>
                <p>Username: {admin.username}</p>
                <p>Name: {admin.name}</p>
                <p>Email: {admin.email}</p>
              </div>
            }
            buttons={
              <DeleteButton onClick={() => handleDeleteClick(admin.id)} style={{ width: '40px', height: '40px' }}></DeleteButton>
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

export default AdminList;