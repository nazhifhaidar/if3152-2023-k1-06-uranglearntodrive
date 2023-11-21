import React from 'react'
import Row from '../Row';

interface InformationCardProperties{
    data?:React.ReactNode;
    buttons?: React.ReactNode;
}

const InformationCard:React.FC<InformationCardProperties> = ({data, buttons}) => {
  return (
    <div className='information-card p-2 border-2 border-blue-500 inline-block rounded-xl mb-2 w-full'>
        <Row justifyContent='space-between' width={'100%'}>
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