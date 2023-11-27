import React from 'react'
import { ClipLoader } from 'react-spinners'

const OurLoader: React.FC<{ state: boolean }> = ({ state }) => {
    return (<>
        {state && (
            <div style={{ width: '300px', height: '300px' }}>
                <ClipLoader color="grey" loading={state} size={200} />
            </div>
        )
        }
    </>

    )
}

export default OurLoader