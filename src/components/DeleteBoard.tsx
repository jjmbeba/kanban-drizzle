"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSidebarStore } from "@/store/sidebarStore";
import { toast } from "sonner";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteBoard = ({ setOpen }: Props) => {
  const [activeBoard] = useSidebarStore((state) => [state.activeBoard]);

  const queryClient = useQueryClient();

  const { mutate: deleteBoard, isPending: deletePending } = useMutation({
    mutationKey: ["boards"],
    mutationFn: async () => {
      if (!activeBoard) return;

      return await axios
        .delete(`/api/boards/${activeBoard.id}`)
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => console.log(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
      setOpen(false);
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-left text-destructive">
          Delete this board?
        </DialogTitle>
        <DialogDescription className="text-left py-[1.875rem]">
          Are you sure you want to delete the ‘{activeBoard?.name}’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </DialogDescription>
      </DialogHeader>
      <div className="w-full flex flex-col md:flex-row md:items-center md:*:w-1/2  gap-4">
        <Button
          variant={"destructive"}
          disabled={deletePending}
          onClick={() => deleteBoard()}
        >
          {deletePending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Delete
        </Button>
        <Button onClick={() => setOpen(false)} variant={"secondary"}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default DeleteBoard;
