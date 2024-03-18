import { SubTask } from "@/types";
import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckedState } from "@radix-ui/react-checkbox";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";

type Props = {
  subTasks: SubTask[];
  doneSubtasks: Number;
};

const SubtasksList = ({ subTasks, doneSubtasks }: Props) => {
  const queryClient = useQueryClient();
  const [completion, setCompletion] = useState<CheckedState>(false);

  const { mutate: changeDoneStatus, isPending: statusPending } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: async ([state, id]: [CheckedState, Number]) => {
      return await axios
        .patch(`/api/sub-tasks/${id}`, {
          done: state,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board_columns"],
      });
    },
  });

  const onChange = (checked: CheckedState, id: Number) => {
    changeDoneStatus([checked, id]);
    setCompletion(checked);
  };

  return (
    <div className="mt-[2.125rem]">
      <h3 className="body-md">
        Subtasks({doneSubtasks.toString()} of {subTasks.length})
      </h3>
      <div className="mt-[1.1875rem]">
        {subTasks.map(({ id, name, done }) => {
          return (
            <div
              key={id}
              className="flex items-center gap-[0.875rem] bg-background pl-[0.8125rem] py-[1.1875rem] rounded-[0.25rem]"
            >
              <AnimatePresence>
                {statusPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Checkbox
                    onCheckedChange={(checked) => {
                      onChange(checked, id);
                      setCompletion(checked);
                    }}
                    defaultChecked={completion}
                    className="rounded-[0.125rem]"
                    disabled={statusPending}
                  />
                )}
              </AnimatePresence>
              <p className={`body-lg ${completion && "line-through"}`}>
                {name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubtasksList;
