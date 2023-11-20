'use client'

import React, { ReactNode, useState } from 'react'

interface TableRowProps {
  onHover?: (index: number) => ReactNode;
  rowIndex: number;
  columns: string[];
  rowData: Record<string, any>;
}

const TableHeaderStyle:React.CSSProperties = {
  border: "1px solid #ddd",
  padding: '8px',
  textAlign: 'left',
  backgroundColor: 'rgba(206, 255, 165, 1.0)'
}

const TableDataStyle:React.CSSProperties = {
  border: "1px solid #ddd",
  padding: '8px',
  textAlign: 'left',
}

const TableRow: React.FC<TableRowProps> = ({ onHover, rowIndex, columns, rowData }) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <tr
      key={rowIndex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {columns.map((column) => (
        <td style={TableDataStyle} key={column}>{rowData[column] ?? ''}</td>
      ))}
      {/* <td>{isHovered && onHover && onHover(rowIndex)}</td> */}
      <td style={{width:'8rem'}}>
        {isHovered && onHover && onHover(rowIndex)}
      </td>
    </tr>
  );
}

interface TableProps {
    columns: string[];
    data: Record<string, any>[];
    onHover?: (index:number) => ReactNode; 
}

const Table: React.FC<TableProps> = ({columns, data, onHover}) => {
  return (
    <table style={{width: '120%',
      borderCollapse: 'collapse',
      marginTop: '20px',
      tableLayout: 'auto',}}>
        <thead >
            <tr>
                {columns.map((column)=>(
                    <th style={TableHeaderStyle} key={column}>{column}</th>
                ))}
            </tr>
        </thead>
        <tbody>
        {data.map((row, index) => (
          <TableRow 
          key={index}
          onHover={onHover}
          rowIndex={index}
          columns={columns}
          rowData={row}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table