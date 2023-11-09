'use client'
import React, {ChangeEvent} from 'react'

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const TextField1:React.FC<TextFieldProps> = ({ label, value, onChange , type}) => {

  return (
    <div style={{paddingBottom:'4px'}}>
      <label className='pb[8px]' style={{display: 'block'}}>{label}</label>
      <input style={{paddingLeft:'4px'}}
        type={type? type:'text'}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField1