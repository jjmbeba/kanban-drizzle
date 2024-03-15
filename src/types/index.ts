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
  message: string;
  error: string | null;
};

export type UpdatedBoard = {
  board_columns: {
    id: number;
    name: string;
    createdAt: Date | null;
    board_id: number;
  }[];
  id: number;
  name: string;
  user_id: string;
  createdAt: Date | null;
};
