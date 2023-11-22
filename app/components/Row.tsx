import React, { ReactNode } from 'react'


interface Props{
    children:ReactNode,
    justifyContent?: string,
    alignItems?: string,
    width?:string | number,
    display?:string;
}

/**
 * Komponen `Row` digunakan untuk mengatur tata letak dalam satu baris
 * dengan menggunakan properti-properti tertentu.
 * @component
 *
 * @param {Object} props - Properti komponen `Row`.
 * @param {ReactNode} props.children - Anak-anak dari komponen `Row`.
 * @param {string} [props.justifyContent] - Properti CSS `justify-content` untuk mengatur penyebaran
 * dari anak-anak secara horizontal.
 * @param {string} [props.alignItems] - Properti CSS `align-items` untuk mengatur penyebaran
 * dari anak-anak secara vertikal.
 * @param {string | number} [props.width] - Lebar dari komponen `Row`. Bisa dalam bentuk string
 * (contoh: '100%') atau angka (contoh: 300).
 * @param {string} [props.display] - Properti CSS `display` untuk mengatur jenis tampilan
 * dari komponen `Row`.
 *
 * @example
 * // Penggunaan Komponen `Row` dengan properti-properti khusus.
 * <Row justifyContent="space-between" alignItems="center" width="100%" display="flex">
 *   <ChildComponent1 />
 *   <ChildComponent2 />
 * </Row>
 */
const Row:React.FC<Props> = ({ children, justifyContent, alignItems, width, display }) => {
    const rowStyle:React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: justifyContent || 'flex-start',
      alignItems: alignItems || 'stretch',
      width:  width || 'fit-content', // You can adjust the width based on your needs
    };

    const childStyle: React.CSSProperties = {
      display: display || 'inline-block', // Make children inline-block
    };

    const childrenWithStyles = React.Children.map(children, (child) => (
      <div style={childStyle}>{child}</div>
    ));
  
    return <div style={rowStyle}>{childrenWithStyles}</div>;
  };
  
  export default Row;