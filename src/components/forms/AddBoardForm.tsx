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
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const addBoardSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  columns: z
    .object({
      name: z.string().min(1, {
        message: "Column name is required",
      }),
      color: z.string(),
    })
    .array(),
});

export function useZodForm<TSchema extends z.ZodType>(
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

  const [colors, setColors] = useState<string[]>();

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
      return await axios
        .post("/api/boards", values)
        .then((res) => {
          toast.success(res.data.message);
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
    const newColumns = values.columns.map((column, index) => {
      return { ...column, color: colors?.[index] || "#aabbcc" };
    });

    values.columns = newColumns;
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
                  <Popover>
                    <PopoverTrigger>
                      <div
                        className="w-[0.9375rem] h-[0.9375rem] rounded-full"
                        style={{
                          background: colors?.[index],
                        }}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <HexColorPicker
                        color={colors?.[index]}
                        onChange={(newColor) => {
                          const newColors = colors?.map((color, colorIndex) => {
                            if (colorIndex === index) {
                              return newColor;
                            } else {
                              return color;
                            }
                          });
                          setColors(newColors);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <Input
                    className="input-border"
                    placeholder="e.g. Todo"
                    {...form.register(`columns.${index}.name`)}
                  />
                  <Button
                    onClick={() => {
                      remove(index);

                      const newColors = colors?.filter(
                        (color, colorIndex) => colorIndex !== index
                      );

                      setColors(newColors);
                    }}
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
              color: "",
            });
            setColors((prev) => {
              if (prev) {
                return [...prev!, "#aabbcc"];
              } else {
                return ["#aabbcc"];
              }
            });
          }}
          type="button"
          variant={"secondary"}
        >
          + Add New Column
        </Button>
        <Button className="w-full" type="submit" disabled={addBoardPending}>
          {addBoardPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Create New Board
        </Button>
      </form>
    </Form>
  );
};

export default AddBoardForm;
