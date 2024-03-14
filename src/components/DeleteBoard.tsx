"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteBoard = ({setOpen}:Props) => {
  return (
    <DialogContent className="max-w-[21.4375rem] rounded">
      <DialogHeader>
        <DialogTitle className="text-left text-destructive">
          Delete this board?
        </DialogTitle>
        <DialogDescription className="text-left py-[1.875rem]">
          Are you sure you want to delete the ‘Platform Launch’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </DialogDescription>
      </DialogHeader>
      <Button variant={"destructive"}>Delete</Button>
      <Button onClick={() => setOpen(false)} variant={"secondary"}>Cancel</Button>
    </DialogContent>
  );
};

export default DeleteBoard;
