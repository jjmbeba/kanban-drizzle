"use client";
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
import { MoreVertical } from "lucide-react";
import CurrentStatus from "./CurrentStatus";
import { Task } from "@/types";

interface Props extends Task {}

const TaskCard = ({ id, title, sub_tasks, description, column_id }: Props) => {
  const doneSubtasks = sub_tasks.filter((subtask) => subtask.done).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer text-card-foreground bg-card py-[1.625rem] px-4 rounded w-[15.5rem] md:w-[17.5rem]">
          <div className="flex items-center justify-between">
            <h3 className="heading-md">{title}</h3>
            <Button variant={"ghost"} size={"icon"}>
              <MoreVertical className="text-[#828FA3] h-[1.25rem] w-[1.25rem]" />
            </Button>
          </div>
          <h5 className="mt-[0.8125rem] body-md text-muted-foreground">
            0 of {sub_tasks.length} subtasks
          </h5>
        </div>
      </DialogTrigger>
      <DialogContent className="rounded-[0.375rem] max-w-[21.4375rem]">
        <DialogHeader className="text-left">
          <DialogTitle className="heading-lg">{title}</DialogTitle>
          <DialogDescription>
            <p className="body-lg">{description}</p>
            <div className="mt-[2.125rem]">
              <h3 className="body-md">
                Subtasks({doneSubtasks} of {sub_tasks.length})
              </h3>
            </div>
            <div className="mt-[1.75rem]">
              <h3 className="body-md">Current status</h3>
              <CurrentStatus column_id={column_id} task_id={id} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TaskCard;
