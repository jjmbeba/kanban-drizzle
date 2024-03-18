import db from "@/db/drizzle";
import { sub_tasks, tasks } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const subtaskID = params.id;

  const req = await request.json();

  try {
    const result = await db
      .update(sub_tasks)
      .set({
        ...req,
      })
      .where(eq(sub_tasks.id, parseInt(subtaskID)))
      .returning();

    return NextResponse.json({
      message: `${result[0].name} updated successfully`,
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
