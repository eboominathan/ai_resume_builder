import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
  return (
    <div>
        <h2 className='text-xl font-bold text-center'
        style={{
            color:resumeInfo?.theme_color
        }}
        >
            {resumeInfo?.first_name} {resumeInfo?.last_name}</h2>
        <h2 className='text-sm font-medium text-center'
       >{resumeInfo?.title}</h2>
       <h2 className='text-xs font-normal text-center'
        style={{
            color:resumeInfo?.theme_color
        }}>{resumeInfo?.address}</h2>

        <div className='flex justify-between'>
            <h2 className='text-xs font-normal'
             style={{
                color:resumeInfo?.theme_color
            }}>{resumeInfo?.phone}</h2>
            <h2 className='text-xs font-normal'
             style={{
                color:resumeInfo?.theme_color
            }}>{resumeInfo?.email}</h2>

        </div>
        <hr className='border-[1.5px] my-2'
        style={{
            borderColor:resumeInfo?.theme_color
        }}
        />
    </div>
  )
}

export default PersonalDetailPreview