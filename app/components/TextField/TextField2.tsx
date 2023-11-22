'use client'
import React, {ChangeEvent} from 'react'

interface TextFieldProps {
  label: string;
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  loading:boolean;
}

const TextField2:React.FC<TextFieldProps> = ({ label, name, value, onChange , type, loading}) => {

  return (
    <div style={{paddingBottom:'4px'}}>
      <label className='pb[8px]' style={{display: 'flex'}}>{label}</label>
      <input style={{width:'450px', paddingLeft: '4px', border: '2px solid #ccc'}}
        type={type? type:'text'}
        name={name}
        value={value}
        onChange={onChange}
        disabled={loading}
      />
    </div>
  );
};

export default TextField2