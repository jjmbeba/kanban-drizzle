// "use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import AddTaskForm from "./forms/AddTaskForm";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddTask = ({ setOpen }: Props) => {
  return (
    <DialogHeader>
      <DialogTitle className="text-left">Add task</DialogTitle>
      <DialogDescription className="text-left pb-[1.875rem]">
        <AddTaskForm/>
      </DialogDescription>
    </DialogHeader>
  );
};

export default AddTask;
