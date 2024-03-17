import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Info, X } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { useZodForm } from "./AddBoardForm";
import { useSidebarStore } from "@/store/sidebarStore";

const addTaskSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters",
  }),
  column_id: z.coerce
    .string({
      required_error: "Status is required",
    })
    .min(1, {
      message: "Status is required",
    }),
  subtasks: z
    .object({
      title: z.string().min(1, {
        message: "Title is required",
      }),
    })
    .array(),
});

const AddTaskForm = () => {
  const [activeBoard] = useSidebarStore((state) => [state.activeBoard]);

  const form = useZodForm({
    schema: addTaskSchema,
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      column_id: "",
      subtasks: [],
    },
  });

  const { errors } = form.formState;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subtasks",
  });

  async function onSubmit(values: z.infer<typeof addTaskSchema>) {
    console.log(values);
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
            const errorForField = errors?.subtasks?.[index]?.title;

            return (
              <FormItem className="h-auto" key={field.id}>
                <FormControl>
                  <div className="flex items-center gap-3">
                    <Input
                      className="input-border"
                      placeholder="e.g. Make coffee"
                      {...form.register(`subtasks.${index}.title`)}
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
              title: "",
            });
          }}
          type="button"
          variant={"secondary"}
        >
          + Add New Subtask
        </Button>
        {!activeBoard?.board_columns || activeBoard.board_columns.length < 1 ? (
          <div className="flex items-center text-primary">
            <Info className="mr-2 h-4 w-4" />
            No board columns found. Add columns to board to continue.
          </div>
        ) : (
          <FormField
            control={form.control}
            name="column_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-[0.25rem]">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-[0.25rem] border-muted">
                    {activeBoard?.board_columns.map(({ id, name }) => (
                      <SelectItem
                        key={id}
                        className="rounded-[0.25rem]"
                        value={id.toString()}
                      >
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button className="w-full" type="submit">
          {/* {addBoardPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />} */}
          Create Task
        </Button>
      </form>
    </Form>
  );
};

export default AddTaskForm;
