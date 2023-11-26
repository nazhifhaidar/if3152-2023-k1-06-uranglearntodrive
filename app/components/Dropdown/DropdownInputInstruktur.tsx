'use client'

import React, { ChangeEvent, useState, useEffect } from 'react';
import TextField2 from '../TextField/TextField2';

interface DropdownInputProps {
    Dropdownlabel:string;
    Dropdownname: string;
    TextLabel: string,
    TextName: string,
    DropdownValue: string,
    TextValue: string,
    Options:Record<string,any>[]
    Loading: boolean,
    loadMessage?: string
    onSelect?: (event: ChangeEvent<HTMLSelectElement>) => void, 
//   onSelect: (selectedValue: string) => void;
}

const DropdownInputInstruktur: React.FC<DropdownInputProps> = ({Dropdownlabel, Dropdownname, DropdownValue, TextLabel, TextName, TextValue, Options, Loading, onSelect, loadMessage}) => {
  const [disable, setDisable] = useState(true);
  const [nama, setNama] = useState<string>('');

  const handleNamaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNama(event.target.value);
  };

  return (
    <div>
      <label className='pb[8px]' style={{display: 'flex'}}>{Dropdownlabel}</label>
      <select name={Dropdownname} value={DropdownValue} onChange={onSelect} disabled={Loading || Options===null} style={{marginBottom: '4px', paddingBottom:'4px', width:'450px', paddingLeft: '4px', border: Options === null? '2px solid red': Options.length!== 0?'2px solid #ccc': '2px solid red'}}>
        <option value="" disabled >
          {Loading ? 'Loading options...' :  DropdownValue}
        </option>
        {(Options !== null && Array.isArray(Options)) ?
          (Options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nama_lengkap}
            </option>)
            )) : 
          <option value="" disabled></option>}
      </select>
      <TextField2 type='hidden' label={TextLabel} name={TextName} value={TextValue} onChange={handleNamaChange} loading={disable}/>
    </div>  
  );
};

export default DropdownInputInstruktur;