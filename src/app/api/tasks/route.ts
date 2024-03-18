import { addTaskSchema } from "@/components/forms/AddTaskForm";
import db from "@/db/drizzle";
import { sub_tasks, tasks } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const req: z.infer<typeof addTaskSchema> = await request.json();

  try {
    await db.transaction(async (tx) => {
      const result = await tx
        .insert(tasks)
        .values({
          ...req,
          column_id: parseInt(req.column_id),
        })
        .returning();

      if (req.subtasks.length > 0) {
        const new_columns = req.subtasks.map(({ name }) => {
          return {
            name,
            task_id: result[0].id,
          };
        });

        await tx.insert(sub_tasks).values(new_columns);
      }
    });

    return NextResponse.json({
      message: "Task added successfully",
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
