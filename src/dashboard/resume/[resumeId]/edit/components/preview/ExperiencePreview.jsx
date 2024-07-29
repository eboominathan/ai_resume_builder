import React from 'react'

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='mb-2 text-sm font-bold text-center'
        style={{
            color:resumeInfo?.themeColor
        }}
        >Professional Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.themeColor
        }} />

        {resumeInfo?.experience?.map((experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'
                 style={{
                    color:resumeInfo?.themeColor
                }}>{experience?.title}</h2>
                <h2 className='flex justify-between text-xs'>{experience?.companyName}, 
                {experience?.city}, 
                {experience?.state}
                <span>{experience?.startDate} To {experience?.currentlyWorking?'Present':experience.endDate} </span>
                </h2>
                {/* <p className='my-2 text-xs'>
                    {experience.workSummery}
                </p> */}
                <div className='my-2 text-xs' dangerouslySetInnerHTML={{__html:experience?.workSummary}} />
            </div>
        ))}
    </div>
  )
}

export default ExperiencePreview