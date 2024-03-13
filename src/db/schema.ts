import { relations } from "drizzle-orm";
import {
  serial,
  text,
  pgTable,
  integer,
  pgSchema,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const boards = pgTable(
  "boards",
  {
    id: serial("id").primaryKey(),
    user_id: text("user_id"),
    name: text("name"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      userIdx: index("user_idx").on(table.user_id),
    };
  }
);

export const boardRelations = relations(boards, ({ many }) => ({
  board_columns: many(board_columns),
}));

export const board_columns = pgTable(
  "board_columns",
  {
    id: serial("id").primaryKey(),
    board_id: integer("board_id").references(() => boards.id),
    name: text("name"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      projectIdx: index("project_idx").on(table.board_id),
    };
  }
);

export const boardColumnsRelations = relations(board_columns, ({ one }) => ({
  board: one(boards, {
    fields: [board_columns.board_id],
    references: [boards.id],
  }),
}));

export const tasks = pgTable(
  "tasks",
  {
    id: serial("id").primaryKey(),
    column_id: integer("column_id").references(() => board_columns.id),
    title: text("title"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      columnIdx: index("column_idx").on(table.column_id),
    };
  }
);

export const sub_tasks = pgTable(
  "sub_tasks",
  {
    id: serial("id").primaryKey(),
    task_id: integer("task_id").references(() => tasks.id),
    name: text("name"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      taskIdx: index("task_idx").on(table.task_id),
    };
  }
);
