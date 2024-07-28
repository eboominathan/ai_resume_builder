import AddResume from '@/components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../service/GlobalApi';
import React, { useEffect, useState } from 'react'
import ResumeCardItem from '@/components/ResumeCardItem';

function Dashboard() {

  const  {user} = useUser();
  const [resumeList,setResumeList] = useState([]);
  useEffect(() => {
      user && GetResumesList() 
  },[user]);  

  /* 
  * Get Resume List
   */
  const GetResumesList =() =>{
   GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(resp=>{ 
     setResumeList(resp.data.data); 
  }); 
}
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='text-3xl font-bold'>My Resume</h2>
      <p>Start creating AI resume for your next Job role</p>
      <div className='grid grid-cols-2 gap-5 mt-10 transition-all md:grid-cols-3 lg-grid-cols-5 '>
        <AddResume />
        {
         resumeList?.length > 0 &&  resumeList.map((resume,index)=>(
          <ResumeCardItem key={index} resume={resume} />
            ))
        }
      </div>
    </div>
  )
}

export default Dashboard