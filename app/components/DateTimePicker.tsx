// components/DateTimePicker.tsx

import React, { useState } from 'react';

interface DateTimePickerProps {
  initialDateTime: string;
  onDateTimeChange: (newDateTime: string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ initialDateTime, onDateTimeChange }) => {
  const [tanggal_servis, setTanggalServis] = useState(initialDateTime);

  // Fungsi converter untuk mengubah format datetime menjadi tanggal
  const convertToDateString = (datetime: string): string => {
    const dateObject = new Date(datetime);
    const dateString = dateObject.toISOString().split('T')[0];
    return dateString;
  };

  // Handler perubahan tanggal
  const handleTanggalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDateTime = event.target.value;
    setTanggalServis(newDateTime);
    onDateTimeChange(newDateTime);
  };

  return (
    <div>
      <p>Tanggal Servis Terakhir: {convertToDateString(tanggal_servis)}</p>
    </div>
  );
};

export default DateTimePicker;
