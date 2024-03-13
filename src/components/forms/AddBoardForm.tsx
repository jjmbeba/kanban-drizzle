"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { ResponseMessageOnly } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useSidebarStore } from "@/store/sidebarStore";

export const addBoardSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  columns: z
    .object({
      name: z.string().min(1, {
        message: "Column name is required",
      }),
    })
    .array(),
});

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      raw: true,
    }),
  });

  return form;
}

const AddBoardForm = () => {
  const queryClient = useQueryClient();

  const [openNavbarMenu, setOpenNavbarMenu] = useSidebarStore((state) => [
    state.openNavbarMenu,
    state.setOpenNavbarMenu,
  ]);

  const form = useZodForm({
    schema: addBoardSchema,
    mode: "onChange",
    defaultValues: {
      name: "",
      columns: [],
    },
  });

  const { errors } = form.formState;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  const { mutate: addBoard, isPending: addBoardPending } = useMutation({
    mutationKey: ["boards"],
    mutationFn: async (values: z.infer<typeof addBoardSchema>) => {
      return await fetch("/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((res) => {
          toast.success(res.message);
          form.reset();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
      setOpenNavbarMenu(false);
    },
  });

  function onSubmit(values: z.infer<typeof addBoardSchema>) {
    addBoard(values);
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
        <Button className="w-full" type="submit" disabled={addBoardPending}>
          {addBoardPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddBoardForm;
