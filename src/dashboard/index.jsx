import AddResume from '@/components/AddResume'
import React from 'react'

function Dashboard() {
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='text-3xl font-bold'>My Resume</h2>
      <p>Start creating AI resume for your next Job role</p>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 lg-grid-cols-5 '>
        <AddResume />
      </div>
    </div>
  )
}

export default Dashboard