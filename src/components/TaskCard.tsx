import React from "react";

type Props = {
  title: string;
  sub_tasks: {
    id: number;
    task_id: number;
    name: string;
    createdAt: Date | null;
  }[];
};

const TaskCard = ({ title, sub_tasks }: Props) => {

  return (
    <div className="text-card-foreground bg-card py-[1.625rem] px-4 rounded w-[15.5rem] md:w-[17.5rem]">
      <h3 className="heading-md">{title}</h3>
      <h5 className="mt-[0.8125rem] body-md text-muted-foreground">
        0 of {sub_tasks.length} subtasks
      </h5>
    </div>
  );
};

export default TaskCard;
