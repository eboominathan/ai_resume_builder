import { PlusSquare } from "lucide-react";
import React, { useState } from "react";
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

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();

  const onCreate=() =>{
    const uuid = uuidv4();
    console.log(resumeTitle,uuid);
  } 

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
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button 
              disabled={!resumeTitle}
              onClick={()=>onCreate()}
              >Create</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
