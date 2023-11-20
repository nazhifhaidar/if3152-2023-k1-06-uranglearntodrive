
'use client'

import React,{useState, useEffect} from 'react'
import Table from '@/app/components/Table/Table'

interface TableContentProps{}

const TableContent:React.FC<TableContentProps> = () => {
    const [tableData, setTableData] = useState<Record<string, any>[]>([]);
    const url = process.env.NEXTAUTH_URL;
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
            setTableData(data?.data); // Assuming data is an array of objects
          } catch (error) {
            console.log('Error fetching data:', error);
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      },[]); 

      const columns = ['id', 'nama', 'tipe_kendaraan', 'status_kendaraan','tanggal_servis'];

      return (
        <div className='table-content'>
            <h2>Vehicle Table</h2>
            <Table columns={columns} data={tableData} />
        </div>
      )
}
export default TableContent;