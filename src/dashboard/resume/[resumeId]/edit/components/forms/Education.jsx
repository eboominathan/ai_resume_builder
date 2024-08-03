import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from "../../../../../../../service/GlobalApi";
import { toast } from 'sonner'

function Education() {

  const [loading,setLoading]=useState(false);
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const params=useParams();
  const [educationalList,setEducationalList]=useState([])

  useEffect(()=>{
    resumeInfo && setEducationalList(resumeInfo?.educations)
  },[])
  const handleChange=(event,index)=>{
    const newEntries=educationalList?.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setEducationalList(newEntries);
  }

  const AddNewEducation=()=>{

    if(educationalList?.length>0){
      setEducationalList([...educationalList,
        {
          university_name:'',
          degree:'',
          major:'',
          start_date:'',
          end_date:'',
          description:''
        }
      ])
    }else{
      setEducationalList([
        {
          university_name:'',
          degree:'',
          major:'',
          start_date:'',
          end_date:'',
          description:''
        }
      ])
    } 
    
  }
  const RemoveEducation=()=>{
    setEducationalList(educationalList=>educationalList?.slice(0,-1))

  }
  const onSave=()=>{
    setLoading(true)
    const data={     
        educations:educationalList?.map(({ id, ...rest }) => rest)    
    }

    GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
    
      setLoading(false)
      toast('Details updated !')
    },(error)=>{
      setLoading(false);
      toast('Server Error, Please try again!')
    })

  }

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationalList
    })
  },[])
  return (
    <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
    <h2 className='text-lg font-bold'>Education</h2>
    <p>Add Your educational details</p>

    <div>
      {educationalList?.map((item,index)=>(
        <div key={index}>
          <div className='grid grid-cols-2 gap-3 p-3 my-5 border rounded-lg'>
            <div className='col-span-2'>
              <label>University Name</label>
              <Input name="university_name" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.university_name}
              />
            </div>
            <div>
              <label>Degree</label>
              <Input name="degree" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.degree} />
            </div>
            <div>
              <label>Major</label>
              <Input name="major" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.major} />
            </div>
            <div>
              <label>Start Date</label>
              <Input type="date" name="start_date" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.start_date} />
            </div>
            <div>
              <label>End Date</label>
              <Input type="date" name="end_date" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.end_date} />
            </div>
            <div className='col-span-2'>
              <label>Description</label>
              <Textarea name="description" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.description} />
            </div>

          </div>
       
        </div>
      ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
            <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}

export default Education