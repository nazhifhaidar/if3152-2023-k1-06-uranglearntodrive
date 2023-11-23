'use client'

import React, { useState, useEffect, useContext } from 'react';
import { useMessageContext } from '../Providers/MessageProvider';

interface ToastProps {

}

const Toast: React.FC = () => {
  const { getMessage, hideMessage, messageStatus } = useMessageContext();
  const message = getMessage();

  const onClose = () => {
    hideMessage();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      
    }, 3000); // Adjust the timeout duration as needed

    return () => clearTimeout(timer);
  });

  return message ? (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px',
        borderRadius: '5px',
        color: 'white',
        backgroundColor: messageStatus() === 'success' ? 'green' : 'red',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        width: 'fit-content',
        height: 'fit-content',
        display: 'flex',
        justifyContent: 'space-between', // Align close button to the right
        alignItems: 'center', // Center vertically
      }}
    >
      <span style={{margin:'8px'}}>{message}</span>
      <button
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          margin:'8px'
        }}
        onClick={onClose}
      >
       X
      </button>
    </div>
  ) : null;
};

export default Toast;
