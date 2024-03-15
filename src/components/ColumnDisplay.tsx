import React from "react";
import TaskCard from "./TaskCard";

type Props = {
  name: string;
  tasks: {
    title: string;
    id: number;
    createdAt: Date | null;
    column_id: number;
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
        {tasks.map(({id, title}) => <TaskCard key={id} title={title}/>)}
      </div>
    </div>
  );
};

export default ColumnDisplay;