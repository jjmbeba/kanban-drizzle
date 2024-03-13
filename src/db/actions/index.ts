import { type User } from "@clerk/nextjs/server";
import db from "../drizzle";
import { boards } from "../schema";

export const getBoards = async (user) => {
  const data =  await db.query.boards.findMany({
      where: (boards, { eq }) => eq(boards.user_id, user.id),
      with: {
        board_columns:true
      },
    });;
  return data;
};
