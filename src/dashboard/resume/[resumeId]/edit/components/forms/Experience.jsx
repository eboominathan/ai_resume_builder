import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from "../../../../../../../service/GlobalApi";
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

const formField={
    title:'',
    company_name:'',
    city:'',
    state:'',
    start_date:'',
    end_date:'',
    work_summary:'',

}
function experience() {
    const [experienceList,setExperienceList]=useState([]);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const params=useParams();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        resumeInfo?.experiences?.length>0 && setExperienceList(resumeInfo?.experiences)
        
    },[])

    const handleChange=(index,event)=>{
        const newEntries=experienceList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        // console.log(newEntries)
        setExperienceList(newEntries);
    }

    const AddNewexperience=()=>{


    
        setExperienceList([...experienceList,{
            title:'',
            company_name:'',
            city:'',
            state:'',
            start_date:'',
            end_date:'',
            work_summary:'',
        }])
    }

    const Removeexperience=()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }

    const handleRichTextEditor=(e,name,index)=>{
        const newEntries=experienceList.slice();
        newEntries[index][name]=e.target.value;
       
        setExperienceList(newEntries);
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            experience:experienceList
        });
     
    },[experienceList]);


    const onSave=()=>{
        setLoading(true)
        const data={
          
                experiences:experienceList?.map(({ id, ...rest }) => rest)
           
        }
 
        console.log(data)
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(res=>{       
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
        })

    }
  return (
    <div>
        <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
        <h2 className='text-lg font-bold'>Professional experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
            {experienceList?.map((item,index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 p-3 my-5 border rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name="title" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.title} required
                            />
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name="company_name" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.company_name} required/>
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input name="city" 
                            onChange={(event)=>handleChange(index,event)} 
                            defaultValue={item?.city} required/>
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input name="state" 
                            onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.state} required
                             />
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date"  
                            name="start_date" 
                            onChange={(event)=>handleChange(index,event)} 
                            defaultValue={item?.start_date} required/>
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="end_date" 
                            onChange={(event)=>handleChange(index,event)} 
                            defaultValue={item?.end_date} required
                            />
                        </div>
                        <div className='col-span-2'>
                           {/* Work Summery  */}
                           <RichTextEditor
                           index={index}
                           defaultValue={item?.work_summary}
                           onRichTextEditorChange={(event)=>handleRichTextEditor(event,'work_summary',index)}  />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewexperience} className="text-primary"> + Add More experience</Button>
            <Button variant="outline" onClick={Removeexperience} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
        </div>
    </div>
  )
}

export default experience