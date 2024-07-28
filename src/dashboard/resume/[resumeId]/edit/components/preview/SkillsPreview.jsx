import React from "react";

function SkillsPreview({resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="mb-2 text-sm font-bold text-center"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      <div>
        {resumeInfo?.skills.map((skill,index)=>(
            <div key={index} >
                <h2 className="text-xs">{skill?.name}</h2>
                <div className="h-2 bg-gray-200 w-[120px]">
                    <div className="h-2 "
                    style={
                        {
                            backgroundColor: resumeInfo?.themeColor,
                            width:skill?.rating+'%'
                        }
                    }>

                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
