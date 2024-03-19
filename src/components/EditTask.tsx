"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import EditTaskForm from "./forms/EditTaskForm";

interface Props extends Task {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTask = ({
  id,
  title,
  sub_tasks,
  description,
  column_id,
  createdAt,
  setOpen,
}: Props) => {
  const queryClient = useQueryClient();

  //   const { mutate: deleteTask, isPending: deletePending } = useMutation({
  //     mutationKey: ["tasks"],
  //     mutationFn: async () => {
  //       return await axios
  //         .delete(`/api/tasks/${id}`)
  //         .then((res) => {
  //           toast.success(res.data.message);
  //         })
  //         .catch((err) => console.log(err));
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ["board_columns"],
  //       });
  //     },
  //   });

  return (
    <DialogContent className="max-w-[21.4375rem] md:max-w-[30rem] rounded-[0.375rem] md:rounded-[0.375rem] border-none outline-none">
      <DialogHeader>
        <DialogTitle className="text-left heading-lg">Edit Task</DialogTitle>
        <DialogDescription className="body-lg text-[#828FA3]">
          <EditTaskForm
            id={id}
            title={title}
            sub_tasks={sub_tasks}
            description={description}
            column_id={column_id}
            createdAt={createdAt}
          />
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default EditTask;
