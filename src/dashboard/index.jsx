import AddResume from "@/components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../service/GlobalApi";
import React, { useEffect, useState, useCallback } from "react";
import ResumeCardItem from "@/components/ResumeCardItem";
import dummy from "@/data/dummy";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState();

  const loggedUser = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.primaryEmailAddress?.emailAddress,
  };

  const RegisterUser = useCallback(() => {
    if (!localStorage.getItem("token") && user) {
      GlobalApi.RegisterUser(loggedUser).then((resp) => {
        localStorage.setItem("token", resp.data.api_token);
      });
    }
  }, [user, loggedUser]);

  useEffect(() => {
    RegisterUser();
     user && GetResumesList();
  }, [user, RegisterUser]);

  /*
   * Get Resume List
   */
  const GetResumesList = () => {
    GlobalApi.GetUserResumes().then(
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
