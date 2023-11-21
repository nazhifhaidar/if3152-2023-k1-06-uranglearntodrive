'use client'

import React, { useEffect, useState } from 'react';
import InformationCard from '@/app/components/Cards/InformationCard';
import Button2 from '@/app/components/Buttons/Button2';

const AdminList:React.FC = () => {
    const [admins, setAdmins] = useState<Record<string, any>[]>([]);

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

      return (
        <div>
            <h1>Admin List</h1>
            {admins.map((admin, index)=> (
                <div key={admin.id}>
                    <InformationCard
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
                        <Button2 text='Delete'></Button2>
                    }
                    />

                </div>
                
                        
            ))}
        </div>
      );
};

export default AdminList;