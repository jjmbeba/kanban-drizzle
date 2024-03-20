import React from "react";
import TaskCard from "./TaskCard";

type Props = {
  name: string;
  color: string;
  tasks: {
    title: string;
    id: number;
    createdAt: Date | null;
    column_id: number;
    description: string;
    sub_tasks: {
      id: number;
      task_id: number;
      name: string;
      done: boolean;
      createdAt: Date | null;
    }[];
  }[];
};

const ColumnDisplay = ({ name, tasks, color }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-[0.625rem]">
        <div
          style={{ backgroundColor: color }}
          className="w-[0.9375rem] h-[0.9375rem] rounded-full"
        />
        <p className="heading-sm text-muted-foreground">
          {name.toUpperCase()} ({tasks.length})
        </p>
      </div>
      <div className="mt-[1.6875rem] flex flex-col items-start gap-[1.3125rem]">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default ColumnDisplay;
