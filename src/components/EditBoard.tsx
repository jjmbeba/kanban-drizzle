"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import EditBoardForm from "./forms/EditBoardForm";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const EditBoard = ({ setOpen }: Props) => {
  return (
    <DialogHeader>
      <DialogTitle className="text-left">Edit board</DialogTitle>
      <DialogDescription className="text-left py-[1.875rem]">
        <EditBoardForm />
      </DialogDescription>
    </DialogHeader>
  );
};

export default EditBoard;
