import React, { CSSProperties } from 'react'
import Image from 'next/image';

interface DeleteButtonProps {
    onClick?: () => any;
    style?: CSSProperties;
}

const DeleteButton:React.FC<DeleteButtonProps> = ({onClick, style}) => {
  return (
    <button type="button" onClick={onClick} style={style}>
        <Image src='/delete_icon.svg' alt='Delete Icon' width={32} height={32} style={{borderRadius:'8px'}} >

        </Image>
    </button>
    
  )
}

export default DeleteButton;