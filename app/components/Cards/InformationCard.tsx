import React from 'react'
import Row from '../Row';

interface InformationCardProperties{
    data?:React.ReactNode;
    buttons?: React.ReactNode;
    margin?:string;
}

const InformationCard:React.FC<InformationCardProperties> = ({data, buttons, margin}) => {
  return (
    <div className={`information-card p-2 border-2 shadow-lg border-gray-200 inline-block rounded-xl bg-blue-50 ${margin} w-full`}>
        <Row justifyContent='space-between' width='100%'>
            <div className='all-data mr-2 pr-2'>
                {data}
            </div>
            <div className='card-buttons ml-2'>
                {buttons}
            </div>
        </Row>        
    </div>
  )
}

export default InformationCard