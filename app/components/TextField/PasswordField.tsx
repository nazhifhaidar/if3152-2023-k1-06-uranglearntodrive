'use client'
import React, {ChangeEvent, useState, useRef} from 'react'
import Image from 'next/image'

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onToggleVisibility: () => void;
  style?: React.CSSProperties;
}

const PasswordField:React.FC<TextFieldProps> = ({ label, value, onChange, onToggleVisibility, style}) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
          onToggleVisibility();
        };


    return (
        <div >
        <label className='pb[4px]' style={{display: 'block'}}>{label}</label>
        <div>
          <input
            id="password-input" // Add an 'id' attribute 
            name='password'
            style={style}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
        />
        <button id='toggle_show_password' type='button' onClick={togglePasswordVisibility} style={{paddingLeft:'4px', alignItems: 'normal'}} >
        <Image
          src={showPassword ? '/show_password.png' : '/hide_password.png'}
          alt={showPassword ? 'Show Password' : 'Hide Password'}
          width={24}
          height={24}
        />
        </button>
        </div>
        
        </div>
);
};

export default PasswordField