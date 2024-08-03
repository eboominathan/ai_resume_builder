import React from 'react'

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='mb-2 text-sm font-bold text-center'
        style={{
            color:resumeInfo?.theme_color
        }}
        >Professional Experience</h2>
        <hr style={{
            borderColor:resumeInfo?.theme_color
        }} />

        {resumeInfo?.experiences?.length>0 && resumeInfo?.experiences?.map((experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'
                 style={{
                    color:resumeInfo?.theme_color
                }}>{experience?.title}</h2>
                <h2 className='flex justify-between text-xs'>{experience?.company_name}, 
                {experience?.city}, 
                {experience?.state}
                <span>{experience?.start_date} To {experience?.currentlyWorking?'Present':experience.end_date} </span>
                </h2>
                {/* <p className='my-2 text-xs'>
                    {experience.workSummery}
                </p> */}
                <div className='my-2 text-xs' dangerouslySetInnerHTML={{__html:experience?.work_summary}} />
            </div>
        ))}
    </div>
  )
}

export default ExperiencePreview