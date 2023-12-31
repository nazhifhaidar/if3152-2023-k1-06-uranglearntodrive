
import React from 'react'

interface Button2Props {
    text?:string;
    type?: 'button'|'submit'|'reset' | undefined;
    onClick?: () => any;
}

const Button2:React.FC<Button2Props> = ({text, onClick, type}) => {
  return (
    <button className='bg-blue-300 p-1 text-black  my-2 mx-2 w-fit px-6 rounded-lg border-black border' onClick={onClick} type={type??'button'}>{text}</button>
  )
}

export default Button2
