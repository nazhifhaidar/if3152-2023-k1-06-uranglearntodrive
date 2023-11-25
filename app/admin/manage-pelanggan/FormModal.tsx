//FormModal.tsx

'use client'

import React from 'react'

const FormModal:React.FC = () => {
  return (
    <div className="modalBackground">
        <div className='modalContainer'>
            <div className='title'>
                <h2>
                    Are you sure you want to continue?
                </h2>
            </div>
            <div className='body'>
                <p>
                    plerrrrrrrr
                </p>
            </div>
            <div className='footer'>
                <button>Cancel</button>
                <button>Ya</button>
            </div>
        </div>
        FormModal
    </div>
  )
}

export default FormModal