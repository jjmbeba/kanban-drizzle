"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSidebarStore } from "@/store/sidebarStore";

type Props = {
  children: React.ReactNode;
};

const BodyWrapper = ({ children }: Props) => {
  const [showSidebar] = useSidebarStore((state) => [state.showSidebar]);

  const variants = {
    showSidebar: {
      x: 0,
      width: "auto",
    },
    hideSidebar: {
      x: "-16.25rem",
      width: "133dvw",
    },
  };

  return (
    <motion.div
      variants={variants}
      initial={{ x: "-16.25rem", width: "133dvw" }}
      animate={showSidebar ? "showSidebar" : "hideSidebar"}
      className={`flex h-[calc(100%-4.4511875rem)] ${showSidebar}`}
    >
      {children}
    </motion.div>
  );
};

export default BodyWrapper;
