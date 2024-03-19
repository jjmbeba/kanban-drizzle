"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "@/types";
import CurrentStatus from "./CurrentStatus";
import SubtasksList from "./SubtasksList";
import TaskMenu from "./TaskMenu";

interface Props extends Task {}

const TaskCard = ({
  id,
  title,
  sub_tasks,
  description,
  column_id,
  createdAt,
}: Props) => {
  const doneSubtasks = sub_tasks.filter((subtask) => subtask.done).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer text-card-foreground bg-card py-[1.625rem] px-4 rounded w-[15.5rem] md:w-[19.5rem]">
          <div className="flex items-center justify-between">
            <h3 className="heading-md">{title}</h3>
          </div>
          <h5 className="mt-[0.8125rem] body-md text-muted-foreground">
            {doneSubtasks} of {sub_tasks.length} subtasks
          </h5>
        </div>
      </DialogTrigger>
      <DialogContent className="rounded-[0.375rem] md:rounded-[0.375rem] max-w-[21.4375rem] md:max-w-[30rem] border-none outline-none">
        <DialogHeader className="text-left">
          <DialogTitle className="heading-lg flex items-center justify-between w-full">
            {title}
            <TaskMenu
              id={id}
              title={title}
              sub_tasks={sub_tasks}
              description={description}
              column_id={column_id}
              createdAt={createdAt}
            />
          </DialogTitle>
          <DialogDescription>
            <p className="body-lg">{description}</p>
            <SubtasksList subTasks={sub_tasks} doneSubtasks={doneSubtasks} />
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
