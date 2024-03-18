"use client";
import { useSidebarStore } from "@/store/sidebarStore";
import { BoardColumnsWithTasks } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ColumnDisplay from "./ColumnDisplay";
import TaskCardSkeleton from "./TaskCardSkeleton";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { useEffect } from "react";
import { useColumnsStore } from "@/store/columnsStore";

const TaskDisplaySkeleton = () => {
  return (
    <div>
      <ScrollArea className="w-96 whitespace-nowrap">
        <div className="flex w-max space-x-[1.4375rem] mx-4 my-6">
          {new Array(3).fill(0).map((_, index) => (
            <div key={index}>
              <div>
                <div className="flex items-center gap-[0.625rem]">
                  <Skeleton className="w-[0.9375rem] h-[0.9375rem] rounded-full" />
                  <Skeleton className="w-[4.599375rem] h-[0.9375rem]" />
                </div>
                <div className="mt-[1.6875rem] flex flex-col items-start gap-[1.3125rem]">
                  <TaskCardSkeleton />
                  <TaskCardSkeleton />
                  <TaskCardSkeleton />
                  <TaskCardSkeleton />
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

const TaskDisplay = () => {
  const [activeBoard] = useSidebarStore((state) => [state.activeBoard]);
  const [setAvailableColumns] = useColumnsStore((state) => [
    state.setAvailableColumns,
  ]);

  const { data: boardColumns, isLoading } = useQuery({
    queryKey: ["board_columns"],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/columns/${activeBoard?.id}`);
        const data: BoardColumnsWithTasks = res.data.boardColumns;
        return data;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    initialData: [],
  });

  if (isLoading) {
    return <TaskDisplaySkeleton />;
  } else if (!boardColumns) {
    return <div className="">Add new board</div>;
  }

  useEffect(() => {
    const availableColumns = boardColumns.map(({ id, name }) => {
      return {
        id,
        name,
      };
    });
    setAvailableColumns(availableColumns);
  }, [setAvailableColumns, boardColumns]);

  return (
    <ScrollArea className="w-80 md:w-full whitespace-nowrap">
      <div className="flex w-max space-x-[1.4375rem] px-4 my-6">
        {boardColumns.map(({ name, id, tasks }) => {
          return (
            <ColumnDisplay
              key={id}
              name={name}
              tasks={tasks}
            />
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default TaskDisplay;
