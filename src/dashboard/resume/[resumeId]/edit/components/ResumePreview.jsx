import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";

function ResumePreview() {
  const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
  return (
    <div className="h-full shadow-lg p-14 border-t-[20px] "
    style={
      {borderColor:resumeInfo?.themeColor}
    }>
      {/* Personal Details  */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      {/* Summary  */}
      <SummaryPreview resumeInfo={resumeInfo} />
      {/* Professional Experience   */}
      <ExperiencePreview resumeInfo={resumeInfo} />
      {/* Education   */}

      <EducationalPreview resumeInfo={resumeInfo} />
      {/* Skills   */}
      <SkillsPreview  resumeInfo={resumeInfo} />
    </div>
  );
}

export default ResumePreview;
