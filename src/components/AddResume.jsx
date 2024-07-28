import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import GlobalApi from "../../service/GlobalApi";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        resumeId: uuid,
        title: resumeTitle,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    GlobalApi.CreateNewResume(data).then(
      (resp) => {
        if(resp){
            setLoading(false);
            navigation(`dashboard/resume/${resp.data.data.documentId}/edit`);
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="">
      <div
        className="flex items-center justify-center py-24 border rounded-lg p-14 bg-secondary h-[280px] 
            hover:scale-105 transition-all
            hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for resume</p>
              <Input
                className="mt-2"
                placeholder="Ex.Full Stack resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
