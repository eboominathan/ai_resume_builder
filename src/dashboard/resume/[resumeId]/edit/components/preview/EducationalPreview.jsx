import React from "react";

function EducationalPreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="mb-2 text-sm font-bold text-center"
        style={{ color: resumeInfo?.theme_color }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.theme_color }} />

      {resumeInfo?.educations?.map((education, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.theme_color }}
          >
            {education?.university_name}
          </h2>
          <h2 className="flex justify-between text-xs">
            {education?.degree} in {education?.major},
            <span>
              {education?.start_date} - {education?.end_date}
            </span>
          </h2>
          <p className="my-2 text-xs">{education?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
