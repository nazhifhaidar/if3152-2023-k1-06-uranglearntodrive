'use client'

import React, { useEffect, useState } from 'react';
import InformationCard from '@/app/components/Cards/InformationCard';
import Button2 from '@/app/components/Buttons/Button2';
import ConfirmationPopUp from '@/app/components/pop-ups/ConfirmationPopUp';

const AdminList:React.FC = () => {
    const [admins, setAdmins] = useState<Record<string, any>[]>([]);
    const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

    useEffect(() => {
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
            setAdmins(data?.data)

            // Assuming data is an array of objects
          } catch (error) {
            console.log('Error fetching data:', error);
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      },[]);

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
        try {
          const response = await fetch(`/api/admin/${adminId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
          });
    
          if (response.ok) {
            // If the deletion is successful, update the state to reflect the changes
            setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminId));
          } else {
            // Handle error response
            console.error('Error deleting admin:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting admin:', error);
        }
      };
      
      return (
        <div style={{ maxHeight: '450px', overflowY: 'auto', paddingRight:'12px'}}>
            <h1>Admin List</h1>
            {admins.map((admin)=> (
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
                        <Button2 text='Delete' onClick={() => handleDeleteClick(admin.id)}></Button2>
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

export default AdminList;