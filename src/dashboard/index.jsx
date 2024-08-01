import AddResume from "@/components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import React, { useEffect, useState } from "react";
import ResumeCardItem from "@/components/ResumeCardItem";
import dummy from "@/data/dummy";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState(dummy);

  useEffect(() => {
    setResumeList(dummy);
    RegisterUser();
    // user && GetResumesList();
  }, [user]);

  const loggedUser = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.primaryEmailAddress?.emailAddress,
  };

  const RegisterUser = () => {
    if (!localStorage.getItem("token")) {
      GlobalApi.RegisterUser(loggedUser).then((resp) => {      
        localStorage.setItem("token", resp.data.api_token);
      });
    }
  };

  /*
   * Get Resume List
   */
  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        setResumeList(resp.data.data);
      }
    );
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="text-3xl font-bold">My Resume</h2>
      <div>Start Creating AI resume to your next Job role</div>
      <div className="grid grid-cols-2 gap-5 mt-10 md:grid-cols-3 lg:grid-cols-5">
        <AddResume />
        {resumeList?.length > 0
          ? resumeList.map((resume, index) => (
              <ResumeCardItem
                resume={resume}
                key={resume.id}
                refreshData={GetResumesList}
              />
            ))
          : [1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
