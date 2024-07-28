import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <div>
        <p className='text-sm'>
            {resumeInfo?.summary}
        </p>
    </div>
  )
}

export default SummaryPreview