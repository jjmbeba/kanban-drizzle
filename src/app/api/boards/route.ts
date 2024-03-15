import { addBoardSchema } from "@/components/forms/AddBoardForm";
import db from "@/db/drizzle";
import { board_columns, boards } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: Request) {
  const { userId } = auth();

  if (!userId) throw new Error("UNAUTHORIZED");

  const data = await db.query.boards.findMany({
    where: (boards, { eq }) => eq(boards.user_id, userId),
    with: {
      board_columns:true,
    },
  });
  return Response.json(data);
}

export async function POST(request: NextRequest) {
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

  const req: z.infer<typeof addBoardSchema> = await request.json();
  try {
    await db.transaction(async (tx) => {
      const result = await tx
        .insert(boards)
        .values({ ...req, user_id: userId })
        .returning();

      if (req.columns.length > 0) {
        const new_columns = req.columns.map((column) => {
          return {
            name: column.name,
            board_id: result[0].id,
          };
        });

        await tx.insert(board_columns).values(new_columns);
      }
    });

    const response = NextResponse.json({
      message: "Board created successfully",
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
