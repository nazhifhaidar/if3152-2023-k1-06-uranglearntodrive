import React, { ChangeEvent, useState, useEffect } from 'react';

interface DropdownProps {
    apiLink:string;
    label:string;
    name: string;
//   onSelect: (selectedValue: string) => void;
}

const Dropdown2: React.FC<DropdownProps> = ({apiLink,label, name}) => {
  const [options, setOptions] = useState<Record<string, any>[]>([]);;
  const [loading, setLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState<string>('');
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await fetch(apiLink,
        {
            method: 'GET',
            body: null,
            headers: { "Content-Type": "application/json" }
        });
        const data = await fetchedOptions.json();
        setOptions(data?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching options:', error);
        setLoading(false);
      }
    };

    fetchOptions();
  }, [apiLink]);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    // onSelect(newValue);
  };

  return (
    <div style={{paddingBottom:'4px'}}>
      <label className='pb[8px]' style={{display: 'flex'}}>{label}</label>
      <select name={name} value={selectedValue} onChange={handleSelect} disabled={loading} style={{paddingBottom:'4px', width:'450px', paddingLeft: '4px', border: '2px solid #ccc'}}>
        <option value="" disabled>
          {loading ? 'Loading options...' : 'Select an option'}
        </option>
        {!loading && 
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.id}
            </option>
          ))}
      </select>
    </div>  
  );
};

export default Dropdown2;