import React from "react";

type Props = {
  title: string;
};

const TaskCard = ({ title }: Props) => {
  return (
    <div className="bg-[#2b2c37] py-[1.625rem] px-4 rounded w-[17.5rem]">
      <h3 className="heading-md">{title}</h3>
      <h5 className="mt-[0.8125rem] body-md text-muted-foreground">
        0 of 3 subtasks
      </h5>
    </div>
  );
};

export default TaskCard;
