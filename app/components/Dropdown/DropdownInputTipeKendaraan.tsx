import React, { ChangeEvent, useState, useEffect } from 'react';

interface DropdownInputProps {
    Dropdownlabel:string;
    Dropdownname: string;
    DropdownValue: string,
    Options:Record<string,any>[]
    Loading: boolean,
    onSelect?: (event: ChangeEvent<HTMLSelectElement>) => void,
//   onSelect: (selectedValue: string) => void;
}

const DropdownInputTipeKendaraan: React.FC<DropdownInputProps> = ({Dropdownlabel, Dropdownname, DropdownValue, Options, Loading,onSelect}) => {

  return (
    <div>
      <label className='pb[8px]' style={{display: 'flex'}}>{Dropdownlabel}</label>
      <select name={Dropdownname} value={DropdownValue} onChange={onSelect} disabled={Options===null} style={{marginBottom: '4px', paddingBottom:'4px', width:'450px', paddingLeft: '4px', border: Options!== null?'2px solid #ccc': '2px solid red'}}>
        <option value="" disabled >
          {Loading ? 'Loading options...' : Options!== null? DropdownValue :'Data tidak tersedia'}
        </option>
        {(Options !== null) ?
          (Options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nama}
            </option>)
            )) : 
          <option value="" disabled></option>}
      </select>
    </div>  
  );
};

export default DropdownInputTipeKendaraan;