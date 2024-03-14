"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddTaskButton from "./AddTaskButton";
import DeleteBoard from "./DeleteBoard";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

const OptionsMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <AddTaskButton />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="outline-none border-none w-[12rem] dark:bg-[#20212C]">
          <DropdownMenuLabel>My actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Add task</DropdownMenuItem>
          <DropdownMenuItem>Edit Board</DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className="text-destructive">
              Delete Board
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteBoard setOpen={setOpen} />
    </Dialog>
  );
};

export default OptionsMenu;
