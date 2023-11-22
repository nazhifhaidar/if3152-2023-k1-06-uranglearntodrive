'use client'

import React,{useState, useEffect} from 'react'
import Table from '@/app/components/Table/Table'

interface TableContentProps{}

const TableContent:React.FC<TableContentProps> =  () => {
    const [tableData, setTableData] = useState<Record<string, any>[]>([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const url = process.env.NEXTAUTH_URL;
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
            setTableData(data?.data)

            // Assuming data is an array of objects
          } catch (error) {
            console.log('Error fetching data:', error);
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      },[]);
    //   let data;
    //   try{
    //     const response = await fetch(`${url}/api/admin/`, {
    //         method: 'GET',
    //         body: null,
    //         headers: { 'Content-Type': 'application/json' },
    //       });
    
    //       data = await response.json();
          
    //   }catch (error) {
    //     console.log('Error fetching data:', error);
    //     console.error('Error fetching data:', error);
    //   }
    //   const tableData = data?.data; 
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

      const columns = ['id', 'username', 'name', 'email'];

      return (
        <div className='table-content'>
            <h1>Admin Table</h1>
            {tableData.length === 0 ? (
                <h1>There is no data. Try to add the data.</h1>
            ) : (<Table columns={columns} data={tableData} onHover={(index) => [
              <button style={{paddingLeft:'4px'}} key="delete" onClick={()=>handleDeleteClick(tableData[index].id)}>D</button>,
            ]} />)}
        </div>
      )
    }
export default TableContent;
