"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  id: Number;
  title: String;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteTask = ({ id, title, setOpen }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending: deletePending } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: async () => {
      return await axios
        .delete(`/api/tasks/${id}`)
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => console.log(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board_columns"],
      });
    },
  });

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
        <Button
          className="w-full"
          variant={"destructive"}
          type="submit"
          disabled={deletePending}
          onClick={() => deleteTask()}
        >
          {deletePending && <Loader2 className="mr-2 h-4 animate-spin" />}
          Delete
        </Button>
        <Button
          onClick={() => setOpen(false)}
          className="w-full"
          variant={"secondary"}
          type="button"
        >
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteTask;
