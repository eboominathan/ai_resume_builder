import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from "../../../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function Summary({ enableNext }) {
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  const [summary,SetSummary] = useState(resumeInfo.summary);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  
  useEffect(() => {
    summary && setResumeInfo({...resumeInfo,summary:summary});
  },[]);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summary:summary
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        toast("Details updated ");
        enableNext(true);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };
 
  return (
    <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
      <h2 className="text-lg font-bold">Summary</h2>
      <p>Add Summary for your job title </p>
      <form className='mt-7' onSubmit={onSave}>
      <div className='flex items-center justify-between'>
        <label className=''>Add Summary</label>
        <Button type="button" variant="outline" size="sm" className='flex gap-2 border-primary text-primary'>
          <Brain className='w-4 h-4'/>Generate from AI</Button>
      </div>
        <Textarea className='mt-2' placeholder='Add Summary' required
        onChange={(e) => SetSummary(e.target.value)}
          value={summary}
        />
        <div className="flex justify-end mt-3">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
        </form>
    </div>
  )
}

export default Summary
