"use client";

import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import { Button } from "./ui/button";

interface Props extends Task {}

const TaskMenu = ({
  id,
  title,
  sub_tasks,
  description,
  column_id,
  createdAt,
}: Props) => {
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
      {action === "deleteTask" ? (
        <DeleteTask id={id} title={title} setOpen={setOpen} />
      ) : action === "editTask" ? (
        <EditTask
          id={id}
          title={title}
          sub_tasks={sub_tasks}
          description={description}
          column_id={column_id}
          createdAt={createdAt}
          setOpen={setOpen}
        />
      ) : null}
    </Dialog>
  );
};

export default TaskMenu;
