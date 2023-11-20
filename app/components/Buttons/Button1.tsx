'use client'

import React, { FormEvent, FormEventHandler } from 'react'

interface Button1Props {
    id?: string;
    text: string;
    textColor: string;
    bgColor: string;
    type: "button" | "reset" | "submit" | undefined;
    style?:React.CSSProperties;
    margin?:string;
}

const Button1:React.FC<Button1Props> = ({text, textColor, bgColor,id, type,margin}) => {
    const buttonStyle:React.CSSProperties = {
        color: textColor,
        border: `2px solod ${textColor}`,
        backgroundColor: bgColor,
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: margin??'8px'
    }

    return (
        <button id={id} style={buttonStyle} type={type} >
            {text}
        </button>
    );
}

export default Button1