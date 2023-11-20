'use client'
import React, {ChangeEvent, useState, useRef} from 'react'
import Image from 'next/image'
import Row from '../Row';
import { Montserrat } from 'next/font/google';

interface TextFieldProps {
  name?:string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onToggleVisibility: () => void;
  style?: React.CSSProperties;
}

const montserrat = Montserrat({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font montserrat'
})

const PasswordField:React.FC<TextFieldProps> = ({ label, value, onChange, onToggleVisibility, style,name}) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
          onToggleVisibility();
        };


    return (
        <div >
        <label className='pb[4px]' style={{display: 'block'}}>{label}</label>
        <Row>
          <input className={montserrat.className}
            id={name??'password'} // Add an 'id' attribute 
            name={name??'password'}
            style={style}
            type={showPassword ? 'text' : 'password'}
            value={value}
            onChange={onChange}
        />
        <button  type='button' onClick={togglePasswordVisibility} style={{paddingLeft:'4px', alignItems: 'normal'}} >
        <Image
          src={showPassword ? '/show_password.png' : '/hide_password.png'}
          alt={showPassword ? 'Show Password' : 'Hide Password'}
          width={24}
          height={24}
        />
        </button>
        </Row>
        
        </div>
);
};

export default PasswordField