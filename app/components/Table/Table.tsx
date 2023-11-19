import React from 'react'

interface TableProps {
    columns: string[];
    data: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({columns, data}) => {
  return (
    <table>
        <thead>
            <tr>
                {columns.map((column)=>(
                    <th key={column}>{column}</th>
                ))}
            </tr>
        </thead>
        <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>{row[column] ?? ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table