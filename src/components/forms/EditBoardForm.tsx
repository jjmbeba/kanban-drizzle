"use client";

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
import { useSidebarStore } from "@/store/sidebarStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import { UseFormProps, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { addBoardSchema, useZodForm } from "./AddBoardForm";

const EditBoardForm = () => {
  const queryClient = useQueryClient();
  const [activeBoard] = useSidebarStore((state) => [state.activeBoard]);

  const board_columns = activeBoard?.board_columns.map(({ name }) => {
   if(name){
     return {
       name,
     };
   }
  });

  const form = useZodForm({
    schema: addBoardSchema,
    mode: "onChange",
    defaultValues: {
      name: activeBoard?.name!,
      columns: board_columns!,
    },
  });

  const { errors } = form.formState;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  function onSubmit(values: z.infer<typeof addBoardSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[1.875rem] *:text-left"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board Name</FormLabel>
              <FormControl>
                <Input
                  className="input-border"
                  placeholder="e.g. Web Design"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {fields.map((field, index) => {
          const errorForField = errors?.columns?.[index]?.name;

          return (
            <FormItem key={field.id}>
              <FormLabel>Board Columns</FormLabel>
              <FormControl>
                <div className="flex items-center gap-3">
                  <Input
                    className="input-border"
                    placeholder="e.g. Todo"
                    {...form.register(`columns.${index}.name`)}
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
        <Button
          className="w-full"
          onClick={() => {
            append({
              name: "",
            });
          }}
          type="button"
          variant={"secondary"}
        >
          + Add New Column
        </Button>
        <Button className="w-full" type="submit">
          {/* {addBoardPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />} */}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditBoardForm;
