import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext,  useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../../service/GlobalApi";
import { toast } from "sonner";
 

function PersonalDetail({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setResumeInfo({ ...resumeInfo, [name]: value });
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
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
      <h2 className="text-lg font-bold">Personal Detail</h2>
      <p>Get Started with the Basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div>
            <label className="text-sm font-bold">First Name</label>
            <Input
              name="firstName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.firstName}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Last Name</label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-bold">Job Title</label>
            <Input
              name="jobTitle"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm font-bold">Address</label>
            <Input
              name="address"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.address}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Phone</label>
            <Input
              name="phone"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.phone}
            />
          </div>
          <div>
            <label className="text-sm font-bold">Email</label>
            <Input
              name="email"
              required
              onChange={handleInputChange}
              defaultValue={resumeInfo.email}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
