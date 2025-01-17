import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "./components/FormSection";
import ResumePreview from "./components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from  '../../../../../service/GlobalApi'

// import dummy from "@/data/dummy";

function EditResume() {
  const params = useParams();
  const [resumeInfo,setResumeInfo] = useState(); 
  useEffect(()=>{       
    GetResumeInfo();
},[])


const GetResumeInfo=()=>{
    GlobalApi.GetResumeById(params?.resumeId).then(resp=>{    
      setResumeInfo(resp.data);
    })
}
  
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
