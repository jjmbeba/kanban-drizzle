import db from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const taskId = params.id;

  const req = await request.json();

  try {
    const result = await db
      .update(tasks)
      .set({
        ...req,
      })
      .where(eq(tasks.id, parseInt(taskId)))
      .returning();

    return NextResponse.json({
      message: `${result[0].title} updated successfully`,
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