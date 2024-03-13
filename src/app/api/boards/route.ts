import db from "@/db/drizzle";
import { boards } from "@/db/schema";
import { auth } from "@clerk/nextjs";

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
