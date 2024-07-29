import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Navigate, useParams } from 'react-router-dom';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(true);
  const {resumeId}=useParams();
  
  return (
    <div>
      <div className='flex items-center justify-between'>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid/> Theme</Button>
        <div className='flex gap-5'>
          {activeFormIndex> 1 && 
          <Button size="sm"
          disabled={!enableNext}
           className
            onClick={() => setActiveFormIndex(activeFormIndex-1)}
          ><ArrowLeft /> </Button>}
          <Button 
          disabled={!enableNext}
          className="flex gap-2" size="sm"
           onClick={() => setActiveFormIndex(activeFormIndex+1)}
           >Next <ArrowRight /></Button>
        </div>
      </div>
 
      {activeFormIndex==1?  
        <PersonalDetail enableNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==2?
              <Summary  enableNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==3?
          <Experience />  
          :activeFormIndex==4?
          <Education/>
          :activeFormIndex==5?
          <Skills/>
          :activeFormIndex==6?
          <Navigate to={'/my-resume/'+resumeId+"/view"}/>
              
        :null
          }
    </div>
  )
}

export default FormSection