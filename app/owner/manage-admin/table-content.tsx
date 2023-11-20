'use client'

import React,{useState, useEffect} from 'react'
import Table from '@/app/components/Table/Table'

interface TableContentProps{}

const TableContent:React.FC<TableContentProps> =  () => {
    const [tableData, setTableData] = useState<Record<string, any>[]>([]);
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

      const columns = ['id', 'username', 'name', 'email'];

      return (
        <div className='table-content'>
            <h1>Admin Table</h1>
            {tableData.length === 0 ? (
                <h1>There is no data. Try to add the data.</h1>
            ) : (<Table columns={columns} data={tableData} onHover={(index) => [
              <button style={{paddingLeft:'4px'}} key="delete" onClick={() => console.log('Delete clicked')}>D</button>,
            ]} />)}
        </div>
      )
    }
export default TableContent;
