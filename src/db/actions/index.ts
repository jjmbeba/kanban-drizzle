import { auth } from "@clerk/nextjs";
import db from "../drizzle";
import { boards } from "../schema";

export const getBoards = async () => {
  // const { userId } = auth();
  // console.log(userId);
  console.log("atuh");

  const data = await db.select().from(boards);
  return data;
};
