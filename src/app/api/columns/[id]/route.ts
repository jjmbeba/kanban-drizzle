import db from "@/db/drizzle";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const boardID = params.id;

  if (!boardID) throw new Error("NOT FOUND");

  try {
    const boardColumns = await db.query.board_columns.findMany({
      where: (board_columns, { eq }) =>
        eq(board_columns.board_id, parseInt(boardID)),
      with: {
        tasks: {
          with: {
            sub_tasks: true,
          },
        },
      },
    });

    //Fetch tasks and subtasks

    if (!boardColumns) {
      return NextResponse.json(
        {
          message: "Board columns not found",
        },
        {
          status: 404,
        }
      );
    }

    console.log(boardColumns[0].tasks[0].sub_tasks);

    return NextResponse.json({
      boardColumns,
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
