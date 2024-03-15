import { editBoardSchema } from "@/components/forms/EditBoardForm";
import db from "@/db/drizzle";
import { board_columns, boards } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();

  if (!userId) throw new Error("UNAUTHORIZED");

  const boardId = params.id;

  if (!boardId) throw new Error("NOT FOUND");

  const req: z.infer<typeof editBoardSchema> = await request.json();

  try {
    const updatedBoard = await db.transaction(async (tx) => {
      const updatedBoard = await tx
        .update(boards)
        .set({
          name: req.name,
        })
        .where(
          and(eq(boards.id, parseInt(boardId)), eq(boards.user_id, userId))
        )
        .returning();

      // Fetch existing columns for the board
      const existingColumns = await tx
        .select()
        .from(board_columns)
        .where(eq(board_columns.board_id,  updatedBoard[0].id ));

      // Delete columns that are not present in the request
      const deletePromises = existingColumns
        .filter(
          (column) =>
            !req.columns.find((reqColumn) => reqColumn.id === column.id)
        )
        .map(async (column) => {
          await tx.delete(board_columns).where(eq(board_columns.id , column.id ));
        });

      await Promise.all(deletePromises);

      const columns = await Promise.all(
        req.columns?.map(async ({ id, name }) => {
          if (id) {
            const updatedColumn = await tx
              .update(board_columns)
              .set({
                name,
              })
              .where(eq(board_columns.id, id))
              .returning();

            return updatedColumn[0];
          } else {
            const new_board_column = await tx
              .insert(board_columns)
              .values({
                name: name,
                board_id: updatedBoard[0].id,
              })
              .returning();
            return new_board_column[0];
          }
        })
      );

      return { ...updatedBoard[0], board_columns: columns };
    });

    return NextResponse.json({
      message:`${updatedBoard.name} updated successfully`,
      updatedBoard
    })
    
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
  const { userId } = auth();

  if (!userId) throw new Error("UNAUTHORIZED");

  const boardId = params.id;

  if (!boardId) throw new Error("NOT FOUND");

  try {
    const deletedBoardName: { deletedBoardName: string }[] = await db
      .delete(boards)
      .where(and(eq(boards.id, parseInt(boardId)), eq(boards.user_id, userId)))
      .returning({
        deletedBoardName: boards.name,
      });

    return NextResponse.json({
      message: `${deletedBoardName[0].deletedBoardName} deleted successfully`,
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
