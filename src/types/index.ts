export type Board = {
  id: number;
  user_id: string | null;
  name: string | null;
  createdAt: Date | null;
  board_columns: BoardColumn[];
};

export type Task =  {
    title: string;
    id: number;
    createdAt: Date | null;
    column_id: number;
    description: string;
    sub_tasks: {
        id: number;
        task_id: number;
        name: string;
        done: boolean;
        createdAt: Date | null;
    }[];
}

export type BoardColumn = {
  id: number;
  name: string | null;
  createdAt: Date | null;
  board_id: number | null;
};

export type BoardColumnsWithTasks = {
  id: number;
  name: string;
  createdAt: Date | null;
  board_id: number;
  tasks: {
    id: number;
    createdAt: Date | null;
    description: string;
    column_id: number;
    title: string;
    sub_tasks: {
      id: number;
      task_id: number;
      name:string;
      done:boolean;
      createdAt: Date | null;
    }[];
  }[];
}[];

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
