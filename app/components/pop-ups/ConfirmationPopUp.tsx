// ConfirmationPopUp.tsx
import React from 'react';
import Center from '../Center';
import RoundedBoxContainer from '../Containers/RoundedBoxContainer';
import BoxContainer from '../Containers/BoxContainer';

interface ConfirmationPopUpProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationPopUp: React.FC<ConfirmationPopUpProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  const OverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    zIndex: '999',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <div style={OverlayStyle}>
      <BoxContainer>
        <div className="confirmation-popup">
          <h1 className='mb-32 mt-4' style={{fontWeight:'bolder'}}>Confirm Delete</h1>
          <p style={{ fontWeight: 'bolder' }} className='mb-2'>Apakah kamu yakin untuk menghapus data ini?</p>
          <div>
            <button onClick={onConfirm} className='m-2 border-black border rounded-lg w-28 bg-yellow-300'>Yes</button>
            <button onClick={onCancel} className='m-2 border-black border rounded-lg w-28 bg-yellow-50'>Cancel</button>
          </div>
          <div className='mb-8'></div>
        </div>

      </BoxContainer>

    </div>

  );
};

export default ConfirmationPopUp;
