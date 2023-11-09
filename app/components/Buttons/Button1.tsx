import React, { FormEvent, FormEventHandler } from 'react'

interface Button1Props {
    id?: string;
    text: string;
    textColor: string;
    bgColor: string;
}

const Button1:React.FC<Button1Props> = ({text, textColor, bgColor,id}) => {
    const buttonStyle:React.CSSProperties = {
        color: textColor,
        border: `2px solod ${textColor}`,
        backgroundColor: bgColor,
        padding: '8px 16px',
        margin: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
    }

    return (
        <button id={id} style={buttonStyle} >
            {text}
        </button>
    );
}

export default Button1