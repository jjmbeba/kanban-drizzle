import React from "react";
import TaskCard from "./TaskCard";

type Props = {
  name: string;
  tasks: {
    title: string;
    id: number;
    createdAt: Date | null;
    column_id: number;
    sub_tasks: {
      id: number;
      task_id: number;
      name: string;
      createdAt: Date | null;
    }[];
  }[];
};

const ColumnDisplay = ({ name, tasks }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-[0.625rem]">
        <div className="w-[0.9375rem] h-[0.9375rem] rounded-full bg-[#49C4E5]" />
        <p className="heading-sm text-muted-foreground">
          {name.toUpperCase()} ({tasks.length})
        </p>
      </div>
      <div className="mt-[1.6875rem] flex flex-col items-start gap-[1.3125rem]">
        {tasks.map(({id, title, sub_tasks}) => <TaskCard key={id} title={title} sub_tasks={sub_tasks}/>)}
      </div>
    </div>
  );
};

export default ColumnDisplay;
