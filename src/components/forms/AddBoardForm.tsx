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
import { X } from "lucide-react";

const addBoardSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  columns: z
    .object({
      name: z
        .string({
          required_error: "Name is required",
        })
        .min(1, {
          message: "Column name is required",
        }),
    })
    .array(),
});

type Column = z.infer<typeof addBoardSchema>["columns"][number];

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
      raw: true,
    }),
  });

  return form;
}

const AddBoardForm = () => {
  const form = useZodForm({
    schema: addBoardSchema,
    // defaultValues: { posts },
    mode: "onChange",
  });

  const { errors } = form.formState;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  function onSubmit(values: z.infer<typeof addBoardSchema>) {
    console.log(errors);
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
        {/* <FormField
          control={form.control}
          name="columns"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board Columns</FormLabel>
              <FormControl>
                <Input
                  className="input-border"
                  placeholder="e.g. Todo"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddBoardForm;
