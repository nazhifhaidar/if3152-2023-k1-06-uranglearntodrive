
'use client'

import React,{useState, useEffect} from 'react'
import Table from '@/app/components/Table/Table'

interface TableContentProps{}

const TableContent:React.FC<TableContentProps> = () => {
    const [tableData, setTableData] = useState<Record<string, any>[]>([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
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

      const handleDeleteClick = (itemId: string) => {
        console.log('Deleting item with ID:', selectedItemId);
        setShowConfirmationModal(true);
        setSelectedItemId(itemId);
      };

      const handleConfirmDelete = () => {
        // Perform the delete operation here using the selectedItemId
        console.log('Deleting item with ID:', selectedItemId);
    
        // After deletion, close the confirmation modal
        setShowConfirmationModal(false);
        setSelectedItemId(null);
      };
    
      const handleCancelDelete = () => {
        // Cancel the deletion, close the confirmation modal
        setShowConfirmationModal(false);
        setSelectedItemId(null);
      };


      const columns = ['id', 'nama', 'tipe_kendaraan', 'status_kendaraan','tanggal_servis'];

      return (
        <div className='table-content'>
            <h2>Vehicle Table</h2>
            <Table columns={columns} data={tableData} />
        </div>
      )
}
export default TableContent;