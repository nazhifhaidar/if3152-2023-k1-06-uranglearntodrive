'use client'

import React, { useEffect, useState } from 'react';
import InformationCard from '@/app/components/Cards/InformationCard';
import Button2 from '@/app/components/Buttons/Button2';
import Link from 'next/link';
import Grid from '../components/Grid';

const ClassList: React.FC = () => {
    const [kelas, setKelas] = useState<Record<string, any>[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/dashboard/`,
                {
                    method: 'GET',
                    body: null,
                    headers: { "Content-Type": "application/json" }
                }
            );
            const data = await response.json();
            setKelas(data?.data)

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
            <Grid rows={4} columns={3}>
            {kelas.map((kelas)=> (
                <div key={kelas.id} style={{margin: "2rem"}}>
                    <InformationCard
                        key={kelas.id}
                        data={
                        <div>
                            <p>Nama:        {kelas.nama}</p>
                            <p>Harga:       {kelas.harga}</p>
                            <p>Total Jam:   {kelas.total_jam}</p>
                            <p>Jumlah Sesi: {kelas.jumlah_sesi}</p>
                        </div>
                        }
                        buttons={
                        <Link href={`/enroll/?id=${kelas.id}`}><Button2 text='Daftar'></Button2></Link>
                        }
                    />
                </div>
            ))}
            </Grid>
        </div>
    );
};

export default ClassList;