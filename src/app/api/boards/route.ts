import { addBoardSchema } from "@/components/forms/AddBoardForm";
import db from "@/db/drizzle";
import { boards } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const { userId } = auth();

  if (!userId) throw new Error("UNAUTHORIZED");

  const data = await db.query.boards.findMany({
    where: (boards, { eq }) => eq(boards.user_id, userId),
    with: {
      board_columns: true,
    },
  });
  return Response.json(data);
}

export async function POST(request: Request) {
  const { userId } = auth();

  const req: z.infer<typeof addBoardSchema> = await request.json();
  console.log({ ...req, user_id: userId });

  try {
    await db.insert(boards).values({ ...req, user_id: userId });

    const response = NextResponse.json({
      message: "Board created successfully",
    });

    return response;
  } catch (error) {
    console.log(error)
  }
}
