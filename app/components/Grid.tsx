// Grid.tsx
import React, { ReactElement, ReactNode } from 'react';
import Row from './Row';

interface GridProps {
  rows: number;
  columns: number;
  children?: ReactNode;
}

const Grid: React.FC<GridProps> = ({ rows, columns, children }) => {
  const gridItems: React.ReactNode[][] = [];
  if (!children) {
    return null; // or handle the case where children is not provided
  }

  if (!Array.isArray(children)) {
    console.error("Grid component expects an array of React elements as children.");
    return null; // or handle the invalid children prop
  }

  // Populate the gridItems array with children
  let childIndex = 0;
  for (let row = 1; row <= rows; row++) {
    const rowItems: React.ReactNode[] = [];
    for (let col = 1; col <= columns; col++) {
        const childElement = children[childIndex] as ReactElement | undefined;
        if (childElement) {
          rowItems.push(React.cloneElement(childElement, { key: col }));
          childIndex++;
        } else {
          // Handle the case when there are not enough children
          break
        }
      }
    gridItems.push(rowItems);
  }

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      {gridItems.map((row, rowIndex) => (
        <div key={rowIndex} style={{display: "flex"}}>
          {row}
        </div>
      ))}
    </div>
  );
};

export default Grid;
