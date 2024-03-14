"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import AddTaskButton from "./AddTaskButton";

const OptionsMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AddTaskButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="outline-none border-none w-[12rem] dark:bg-[#20212C]">
        <DropdownMenuLabel>My actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Add task</DropdownMenuItem>
        <DropdownMenuItem>Edit Board</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          Delete Board
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsMenu;
