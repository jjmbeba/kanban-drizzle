"use client";

import { useSidebarStore } from "@/store/sidebarStore";
import CreateColumnPrompt from "./CreateColumnPrompt";
import TaskDisplay from "./TaskDisplay";
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

const BoardOverview = () => {
  const [activeBoard] = useSidebarStore((state) => [state.activeBoard]);

  return (
    <div className="flex-1 h-full">
      {!activeBoard?.board_columns[0] ? (
        <CreateColumnPrompt />
      ) : (
        <div className="flex space-x-[1.4375rem]">
          <TaskDisplay />
          <Dialog>
            <DialogTrigger className="heading-xl w-[11.5rem] my-6 md:w-[15.5rem] h-[70dvh] bg-[#edf2fb] text-[#828fa3] dark:bg-[#22232e] cursor-pointer hidden md:inline-block">
              + New Column
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
      )}
    </div>
  );
};

export default BoardOverview;
