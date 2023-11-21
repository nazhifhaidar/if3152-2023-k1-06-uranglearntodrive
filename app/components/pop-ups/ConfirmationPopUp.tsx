// ConfirmationPopUp.tsx
import React from 'react';
import Center from '../Center';
import RoundedBoxContainer from '../Containers/RoundedBoxContainer';

interface ConfirmationPopUpProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationPopUp: React.FC<ConfirmationPopUpProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

const OverlayStyle:React.CSSProperties = {
    position: 'fixed',
    top:'0',
    left: '0',
    width:'100%',
    height:'100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display:'flex',
    zIndex:'999',
    alignItems:'center',
    justifyContent:'center'
}

return (
        <div style={OverlayStyle}>
            <RoundedBoxContainer lebar={400} tinggi={400} sudut={20} warna_latar_belakang='green' border_color='black' >
                <div className="confirmation-popup">
                    <p>Are you sure you want to delete?</p>
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </RoundedBoxContainer>
            
        </div>
    
    );
};

export default ConfirmationPopUp;
