"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteTask from "./DeleteTask";

type Props = {
  id: Number;
  title: String;
};

const TaskMenu = ({ id, title }: Props) => {
  const [action, setAction] = useState("");

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MoreVertical className="text-[#828FA3] h-[1.25rem] w-[1.25rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-[0.25rem] border-none outline-none bg-card">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem onClick={() => setAction("editTask")}>
              Edit task
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => setAction("deleteTask")}
              className="text-destructive"
            >
              Delete task
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      {action === "deleteTask" ? <DeleteTask id={id} title={title}/> : null}
    </Dialog>
  );
};

export default TaskMenu;
