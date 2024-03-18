"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  id: Number;
  title: String;
};

const DeleteTask = ({ id, title }: Props) => {
  return (
    <DialogContent className="max-w-[21.4375rem] rounded-[0.375rem] border-none outline-none">
      <DialogHeader>
        <DialogTitle className="text-left heading-lg text-destructive">
          Delete this task?
        </DialogTitle>
        <DialogDescription className="body-lg text-[#828FA3]">
          Are you sure you want to delete the &apos;{title}&apos; task and its
          subtasks? This action cannot be reversed.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex flex-col items-center gap-4">
        <Button className="w-full" variant={"destructive"} type="submit">
          Delete
        </Button>
        <Button className="w-full" variant={"secondary"} type="button">
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteTask;
