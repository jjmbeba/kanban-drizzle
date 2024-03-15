"use client";

import { useSidebarStore } from "@/store/sidebarStore";
import { motion } from "framer-motion";
import CreateColumnPrompt from "./CreateColumnPrompt";

const BoardOverview = () => {
  const [showSidebar, activeBoard] = useSidebarStore((state) => [
    state.showSidebar,
    state.activeBoard,
  ]);

  const variants = {
    showSidebar: {
      x: "16.25rem",
    },
    hideSidebar: {
      x: 0,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial={{ x: 0 }}
      animate={showSidebar ? "showSidebar" : "hideSidebar"}
      className="h-full"
    >
      {!activeBoard?.board_columns[0] && <CreateColumnPrompt />}
    </motion.div>
  );
};

export default BoardOverview;
