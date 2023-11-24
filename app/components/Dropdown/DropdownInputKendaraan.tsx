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
    onSelect?: (event: ChangeEvent<HTMLSelectElement>) => void,
//   onSelect: (selectedValue: string) => void;
}

const DropdownInputKendaraan: React.FC<DropdownInputProps> = ({Dropdownlabel, Dropdownname, DropdownValue, TextLabel, TextName, TextValue, Options, Loading,onSelect}) => {
  const [disable, setDisable] = useState(true);
  const [nama, setNama] = useState<string>('');

  const handleNamaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNama(event.target.value);
};

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
      <TextField2 label={TextLabel} name={TextName} value={TextValue} type="text" onChange={handleNamaChange} loading={disable}/>
    </div>  
  );
};

export default DropdownInputKendaraan;