import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../../service/GlobalApi";
import AIChatSession from "../../../../../../../service/AIModal";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summary for 4 experience level, Senior, Mid Level and Fresher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format";
function Summary({ enableNext  }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState();
  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    const result = await AIChatSession.sendMessage(PROMPT);
    setAiGenerateSummaryList(JSON.parse(result.response.text()));
    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {      
        summary: summary,      
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast("Details updated");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div>
      <div className="p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary">
        <h2 className="text-lg font-bold">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex items-end justify-between">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={() => GenerateSummaryFromAI()}
              type="button"
              size="sm"
              className="flex gap-2 border-primary text-primary"
            >
              <Brain className="w-4 h-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summary}
            defaultValue={summary ? summary : resumeInfo?.summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && (
        <div className="my-5">
          <h2 className="text-lg font-bold">Suggestions</h2>
          {aiGeneratedSummaryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item?.summary)}
              className="p-5 my-4 rounded-lg shadow-lg cursor-pointer"
            >
              <h2 className="my-1 font-bold text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
