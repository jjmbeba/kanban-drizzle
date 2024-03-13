export type Board = {
  id: number;
  user_id: string | null;
  name: string | null;
  createdAt: Date | null;
  board_columns: BoardColumn[];
};

export type BoardColumn = {
  id: number;
  name: string | null;
  createdAt: Date | null;
  board_id: number | null;
};

export type ResponseMessageOnly = {
  message:string;
  error:string | null;
}