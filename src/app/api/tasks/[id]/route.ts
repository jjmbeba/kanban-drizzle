import { editTaskSchema } from "@/components/forms/EditTaskForm";
import db from "@/db/drizzle";
import { sub_tasks, tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskId = params.id;

  const req: z.infer<typeof editTaskSchema> = await request.json();

  try {
    const res = await db.transaction(async (tx) => {
      const updatedTask = await db
        .update(tasks)
        .set({
          column_id: parseInt(req.column_id),
          title: req.title,
          description: req.description,
        })
        .where(eq(tasks.id, parseInt(taskId)))
        .returning();

      // Fetch existing columns for the board
      const existingSubtasks = await tx
        .select()
        .from(sub_tasks)
        .where(eq(sub_tasks.task_id, updatedTask[0].id));

      const deletePromises = existingSubtasks
        .filter(
          (subtask) =>
            !req.subtasks.find((reqSubtask) => reqSubtask.id === subtask.id)
        )
        .map(async (subtask) => {
          await tx.delete(sub_tasks).where(eq(sub_tasks.id, subtask.id));
        });

      await Promise.all(deletePromises);

      const subtasks = await Promise.all(
        req.subtasks?.map(async ({ id, name }) => {
          if (id) {
            const updatedSubtask = await tx
              .update(sub_tasks)
              .set({
                name,
              })
              .where(eq(sub_tasks.id, id))
              .returning();

            return updatedSubtask[0];
          } else {
            const new_subtask = await tx
              .insert(sub_tasks)
              .values({
                name: name,
                task_id: parseInt(taskId),
              })
              .returning();
            return new_subtask[0];
          }
        })
      );

      // If req.subtasks is undefined or empty, return updatedTask without modifying subtasks
      return { ...updatedTask[0], sub_tasks: subtasks };
    });

    return NextResponse.json({
      message: `${res?.title} updated successfully`,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskID = params.id;

  try {
    const res = await db
      .delete(tasks)
      .where(eq(tasks.id, parseInt(taskID)))
      .returning();

    return NextResponse.json({
      message: `${res[0].title} task deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
