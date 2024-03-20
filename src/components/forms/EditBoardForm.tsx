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
import { UpdatedBoard } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useZodForm } from "./AddBoardForm";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";

export const editBoardSchema = z.object({
  id: z.number().min(1, {
    message: "ID is required",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  columns: z
    .object({
      id: z.number().optional(),
      name: z.string().min(1, {
        message: "Column name is required",
      }),
      color: z.string(),
    })
    .array(),
});

const EditBoardForm = () => {
  const queryClient = useQueryClient();
  const [activeBoard, setActiveBoard] = useSidebarStore((state) => [
    state.activeBoard,
    state.setActiveBoard,
  ]);

  const { mutate: editBoard, isPending: editPending } = useMutation({
    mutationKey: ["boards"],
    mutationFn: async (values: z.infer<typeof editBoardSchema>) => {
      return await axios
        .patch(`/api/boards/${activeBoard?.id}`, values)
        .then((res) => {
          toast.success(res.data.message);
          const updatedBoard: UpdatedBoard = res.data.updatedBoard;
          setActiveBoard(updatedBoard);
        })
        .catch((err) => console.log(err));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards", "board_columns"],
        refetchType: "all",
      });
    },
  });

  const board_columns = activeBoard?.board_columns?.map(
    ({ id, name, color }) => {
      if (id && name) {
        return {
          id,
          name,
          color,
        };
      } else {
        return {
          id: undefined,
          name: undefined,
          color: undefined,
        };
      }
    }
  );

  const [colors, setColors] = useState(
    activeBoard?.board_columns.map((column) => column.color)
  );

  const form = useZodForm({
    schema: editBoardSchema,
    mode: "onChange",
    defaultValues: {
      id: activeBoard?.id,
      name: activeBoard?.name!,
      columns: board_columns!,
    },
  });

  const { errors } = form.formState;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  function onSubmit(values: z.infer<typeof editBoardSchema>) {
    const newColumns = values.columns.map((column, index) => {
      return { ...column, color: colors?.[index] || "#aabbcc" };
    });

    values.columns = newColumns;
    editBoard(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[1.875rem] *:text-left"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="input-border"
                  placeholder="e.g. Web Design"
                  type="hidden"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button className="w-full" type="submit" disabled={editPending}>
          {editPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          Save changes
        </Button>
      </form>
    </Form>
  );
};

export default EditBoardForm;
