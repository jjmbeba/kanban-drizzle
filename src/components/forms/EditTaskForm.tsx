import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "@/types";
import { Loader2, X } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { useZodForm } from "./AddBoardForm";
import { addTaskSchema } from "./AddTaskForm";
import { useSidebarStore } from "@/store/sidebarStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface Props extends Task {}

export const editTaskSchema = z.object({
  id: z.number().min(1, {
    message: "ID is required",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters",
  }),
  column_id: z
    .string({
      required_error: "Status is required",
    })
    .min(1, {
      message: "Status is required",
    }),
  subtasks: z
    .object({
      id:z.number().optional(),
      name: z.string().min(1, {
        message: "Subtask title is required",
      }),
    })
    .array(),
});

const EditTaskForm = ({
  id,
  title,
  column_id,
  description,
  sub_tasks,
}: Props) => {
  const [activeBoard] = useSidebarStore((state) => [state.activeBoard]);
  const queryClient = useQueryClient();

  const form = useZodForm({
    schema: editTaskSchema,

    defaultValues: {
      id,
      title,
      column_id: column_id.toString(),
      description,
      subtasks: sub_tasks!,
    },
  });

  const { errors } = form.formState;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  const { mutate: editTask, isPending: editTaskPending } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: async (values: z.infer<typeof addTaskSchema>) => {
      return await axios
        .patch(`/api/tasks/${id}`, values)
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

  function onSubmit(values: z.infer<typeof addTaskSchema>) {
    editTask(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pt-[1.875rem] space-y-[1.875rem] *:text-left"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="input-border"
                  placeholder="e.g. Take coffee break"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."
                  className="resize-none rounded-[0.25rem] pb-4"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-[1.8rem]">
          {fields.length > 0 && <FormLabel>Subtasks</FormLabel>}
        </div>
        <div>
          {fields.map((field, index) => {
            const errorForField = errors?.subtasks?.[index]?.name;

            return (
              <FormItem className="h-auto" key={field.id}>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <Input
                      className="input-border"
                      placeholder="e.g. Make coffee"
                      {...form.register(`subtasks.${index}.name`)}
                    />
                    <Button
                      onClick={() => remove(index)}
                      size={"icon"}
                      variant={"ghost"}
                      type="button"
                    >
                      <X />
                    </Button>
                  </div>
                </FormControl>
                <p className="text-sm font-medium text-destructive">
                  {errorForField?.message ?? <>&nbsp;</>}
                </p>
                <FormMessage />
              </FormItem>
            );
          })}
        </div>
        <Button
          className="w-full"
          style={{
            marginTop: 0,
          }}
          onClick={() => {
            append({
              name: "",
            });
          }}
          type="button"
          variant={"secondary"}
        >
          + Add New Subtask
        </Button>
        <FormField
          control={form.control}
          name="column_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-[0.5rem]">
                    <SelectValue placeholder="Select the task status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-[0.5rem]">
                  {activeBoard?.board_columns.map(({ id, name }) => (
                    <SelectItem key={id} value={id.toString()}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={editTaskPending}>
          {editTaskPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Edit Task
        </Button>
      </form>
    </Form>
  );
};

export default EditTaskForm;
