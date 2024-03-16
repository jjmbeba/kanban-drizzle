"use client";

import { useSidebarStore } from "@/store/sidebarStore";
import { motion } from "framer-motion";
import CreateColumnPrompt from "./CreateColumnPrompt";
import TaskDisplay from "./TaskDisplay";

const BoardOverview = () => {
  const [showSidebar, activeBoard] = useSidebarStore((state) => [
    state.showSidebar,
    state.activeBoard,
  ]);

  const variants = {
    showSidebar: {
      x: "-7.25rem",
    },
    hideSidebar: {
      x: 0,
    },
  };

  return (
    <motion.div
      // variants={variants}
      // initial={{ x: "-7.25rem" }}
      // animate={showSidebar ? "showSidebar" : "hideSidebar"}
      // className="h-full w-screen"
      className="flex-1"
    >
      {!activeBoard?.board_columns[0] ? (
        <CreateColumnPrompt />
      ) : (
        <TaskDisplay />
      )}
    </motion.div>
  );
};

export default BoardOverview;
