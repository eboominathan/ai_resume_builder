import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'

function FormSection() {
  const [activeFormIndex,setActiveFormIndex]  = useState(1);
  const [enableNext,setEnableNext]  = useState(false);
  
  return (
    <div>
      <div className='flex items-center justify-between'>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid/> Theme</Button>
        <div className='flex gap-2'>
          {activeFormIndex> 1 && 
          <Button size="sm"
          disabled={!enableNext}
           className
            onClick={() => setActiveFormIndex(activeFormIndex-1)}
          ><ArrowLeft /> </Button>}
          <Button 
          className="flex gap-2" size="sm"
           onClick={() => setActiveFormIndex(activeFormIndex+1)}
           >Next <ArrowRight /></Button>
        </div>
      </div>
      {/* Personal Details  */}
      {activeFormIndex == 1 ?<PersonalDetail enableNext={(v) => setEnableNext(v)} />:null}
      

      {/* Summary Details  */}

      {/* Experience Details  */}

      {/* Education Details  */}

      {/* Skill Details  */}
    </div>
  )
}

export default FormSection