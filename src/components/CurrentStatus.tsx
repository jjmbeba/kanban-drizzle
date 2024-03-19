"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useColumnsStore } from "@/store/columnsStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  column_id: number;
  task_id: number;
};

const CurrentStatus = ({ column_id, task_id }: Props) => {
  const [availableColumns] = useColumnsStore((state) => [
    state.availableColumns,
  ]);

  const queryClient = useQueryClient();

  const { mutate: editStatus, isPending: editStatusPending } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: async (column_id: string) => {
      return await axios
        .patch(`/api/edit-task/${task_id}`, { column_id: parseInt(column_id) })
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

  const onChange = (value: string) => {
    editStatus(value);
  };

  return (
    <Select defaultValue={column_id.toString()} onValueChange={onChange}>
      <SelectTrigger className="mt-[0.875rem] w-full rounded-[0.25rem]">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent className="rounded-[0.25rem]">
        {availableColumns?.map(({ id, name }) => (
          <SelectItem
            key={id}
            className="rounded-[0.25rem]"
            value={id.toString()}
            disabled={editStatusPending}
          >
            <div className="flex items-center">
              {editStatusPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrentStatus;
