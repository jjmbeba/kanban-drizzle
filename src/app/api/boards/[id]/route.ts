import db from "@/db/drizzle";
import { boards } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  if (!userId) throw new Error("UNAUTHORIZED");

  const boardId = params.id;

  if(!boardId)throw new Error("NOT FOUND");

  try {
    await db
      .delete(boards)
      .where(and(eq(boards.id, parseInt(boardId)), eq(boards.user_id, userId)));

    return NextResponse.json({
      message: "Board deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}
