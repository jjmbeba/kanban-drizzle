"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ActionsButtons from "./ActionsButtons";
import DeleteBoard from "./DeleteBoard";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import EditBoard from "./EditBoard";
import AddTask from "./AddTask";

const OptionsMenu = () => {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ActionsButtons />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="outline-none border-none w-[12rem] dark:bg-[#20212C]">
          <DropdownMenuLabel>My actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setAction("addTask")}>
              Add task
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setAction("editBoard")}>
              Edit Board
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => setAction("deleteBoard")}
              className="text-destructive"
            >
              Delete Board
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-w-[21.4375rem] md:max-w-[30rem] rounded md:rounded-[0.375rem] border-none">
        {action === "addTask" ? (
          <AddTask setOpen={setOpen} />
        ) : action === "editBoard" ? (
          <EditBoard setOpen={setOpen} />
        ) : action === "deleteBoard" ? (
          <DeleteBoard setOpen={setOpen} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default OptionsMenu;
