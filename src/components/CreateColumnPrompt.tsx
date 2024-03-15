import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import EditBoardForm from "./forms/EditBoardForm";

const CreateColumnPrompt = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-10">
      <h2 className="heading-lg text-center mb-[1.875rem]">
        This board is empty. Create a new column to get started.
      </h2>
      <Dialog>
        <DialogTrigger>
          <Button>+ Add New Column</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[21.4375rem] md:max-w-[30rem] rounded md:rounded-[0.375rem] border-none">
          <DialogHeader>
            <DialogTitle className="text-left">Edit board</DialogTitle>
            <DialogDescription className="text-left pb-[1.875rem]">
              <EditBoardForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateColumnPrompt;
