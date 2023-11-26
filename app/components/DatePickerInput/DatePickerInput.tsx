'use client'

import React, { useState, ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  name:string;
  selectedDate?:Date | null;
  onDateChange: (date: Date | null, event: React.SyntheticEvent<any,Event>|undefined) => void;
  label:string;
  loading:boolean
}

const DatePickerInput:React.FC<DatePickerProps> = ({name, selectedDate, onDateChange, label, loading}) => {
  // const [selectedDate, setSelectedDate] = useState<Date|null>();
  return (
    <div>
    <label className='pb[8px]' style={{display: 'flex'}}>{label}</label>
    <DatePicker      
      showIcon
      name={name}
      selected={selectedDate}
      onChange= {onDateChange}
      // {(date) => setSelectedDate(date)}
      dateFormat="yyyy-MM-dd"
      customInput = {<input type="text" readOnly style={{width:'450px',border: '2px solid #ccc', height:'30px'}}/>}
      minDate={new Date()}
      readOnly={loading}
    />
    </div>
  );
};

export default DatePickerInput;