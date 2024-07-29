import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeCardItem({resume}) {
  return (
    <Link to={'resume/'+resume.documentId+'/edit'} >
    <div className='flex items-center justify-center p-14 bg-secondary h-[280px] border border-primary rounded-lg hover:scale-105 hover-shadow-md shadow-primary'>
        <Notebook/>
    </div>
    <h2 className='my-1 text-center'>{resume.title}</h2>
    </Link>
  )
}

export default ResumeCardItem