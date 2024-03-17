"use client";

import { useSidebarStore } from "@/store/sidebarStore";
import { motion } from "framer-motion";
import CreateColumnPrompt from "./CreateColumnPrompt";
import TaskDisplay from "./TaskDisplay";

const BoardOverview = () => {
  const [activeBoard] = useSidebarStore((state) => [
    state.activeBoard,
  ]);

  return (
    <div className="flex-1 h-full">
      {!activeBoard?.board_columns[0] ? (
        <CreateColumnPrompt />
      ) : (
        <TaskDisplay />
      )}
    </div>
  );
};

export default BoardOverview;
